"use client";

import { useEffect, useRef } from "react";

/**
 * HeroLight — a soft wash of light that falls across the hero from beyond its
 * top-right corner, aims at the pointer, and catches the preview's top edge.
 *
 * Tuned by measurement, not by eye: the light field below was fitted to the
 * reference (on/off screenshots differenced on a 16px grid, three pointer
 * positions; rmse 6.5 on a 0-255 scale) and its numbers are those of the
 * fit, at a 1440px-wide hero and scaled with the hero's width:
 *   - source fixed off the top-right corner: the fit's (-513, -163) px
 *     mirrored across the hero's width, (1953, -163) at 1440px
 *   - beam  A · exp(-|θ/w|^q) / (1 + (d/L)^n),  A 70, w 0.343 rad, q 2.5,
 *           L 1107 px, n 4.77  (θ: angle off the source→pointer axis,
 *           d: distance from the source)
 *   - pool  P · exp(-(Δx/R)² - (Δy/ry)²) around the landing point,
 *           P 11, R 1277 px, ry 192 px
 *   - rays  ±1% streaks (the reference's are ~1% of its light; anything
 *           stronger reads as visible stripes)
 *   - follow eases at ~63% in 200 ms, like the reference
 * The landing point — where the source→pointer line meets the preview's top
 * edge — is written to --light-hit-x / --light-strength on the
 * [data-light-target] element (with --light-r, the highlight's radius) for
 * the edge highlight (.hero-light-border).
 *
 * Half-resolution render; pauses off-screen and in background tabs; a single
 * still frame with prefers-reduced-motion. Without WebGL only the edge
 * highlight remains.
 */

const REF_W = 1440;
// A is the fitted 70 scaled by 255/(255-15): the reference sits on pure
// black, our dark canvas is rgb(15,14,12), and normal blending adds
// (255 - bg) · alpha, so the same alpha would land ~6% dimmer here.
const FIT = { sx: -513, sy: -163, A: 74.4, w: 0.343, q: 2.515, L: 1107, n: 4.77, P: 11, R: 1277, ry: 192 };
const FOLLOW_RATE = 5; // 1/s → 63% of the way in 200 ms
const SCALE = 0.5;     // render resolution vs CSS px

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;      // canvas px
uniform float uPx;      // canvas px per CSS px
uniform float uK;       // hero width / 1440
uniform vec2 uSrc;      // CSS px, section space (y down)
uniform vec2 uAim;      // CSS px
uniform vec2 uHit;      // CSS px
uniform float uTime;
uniform float uStrength;
uniform vec3 uColor;

float hash(float n) { return fract(sin(n) * 43758.5453); }
float noise(float x) {
  float i = floor(x), f = fract(x);
  return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uPx;
  vec2 v = p - uSrc;
  float d = length(v);
  vec2 axis = normalize(uAim - uSrc);
  float th = acos(clamp(dot(v / d, axis), -1.0, 1.0));

  float beam = ${FIT.A.toFixed(1)} * exp(-pow(th / ${FIT.w}, ${FIT.q})) / (1.0 + pow(d / (${FIT.L.toFixed(1)} * uK), ${FIT.n}));
  vec2 dp = (p - uHit) / (vec2(${FIT.R.toFixed(1)}, ${FIT.ry.toFixed(1)}) * uK);
  float pool = ${FIT.P.toFixed(1)} * exp(-dot(dp, dp));

  // Barely-there rays: ±1%, drifting slowly.
  float side = sign(axis.x * v.y - axis.y * v.x);
  float rays = 1.0 + 0.04 * (noise(th * side * 90.0 + uTime * 0.25) - 0.5);

  float b = (beam * rays + pool) / 255.0 * uStrength;
  b += (hash(p.x * 12.9898 + p.y * 78.233) - 0.5) / 255.0;   // dither
  b = clamp(b, 0.0, 1.0);
  gl_FragColor = vec4(uColor * b, b);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

function readColor(el: Element): [number, number, number] {
  const raw = getComputedStyle(el).getPropertyValue("--hero-light-rgb").trim() || "255 255 255";
  const [r, g, b] = raw.split(/[\s,]+/).map(Number);
  return [r / 255, g / 255, b / 255];
}

export function HeroLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const target = section.querySelector<HTMLElement>("[data-light-target]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    let prog: WebGLProgram | null = null;
    const u: Record<string, WebGLUniformLocation | null> = {};
    if (gl) {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (vs && fs) {
        prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) prog = null;
      }
      if (prog) {
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "a");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        for (const n of ["uRes", "uPx", "uK", "uSrc", "uAim", "uHit", "uTime", "uStrength", "uColor"]) u[n] = gl.getUniformLocation(prog, n);
      }
    }
    if (prog) canvas.dataset.ready = "";

    let w = 0, h = 0, raf = 0, visible = true, last = performance.now();
    const t0 = last;
    // Aim point in section px; starts (and idles) around the centre.
    let aimX = NaN, aimY = NaN, goalX = NaN, goalY = NaN, pointerActive = false;
    let strength = reduced ? 1 : 0;
    let color = readColor(section);

    const resize = () => {
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = Math.max(1, Math.round(w * SCALE));
      canvas.height = Math.max(1, Math.round(h * SCALE));
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      goalX = e.clientX - r.left;
      goalY = e.clientY - r.top;
      pointerActive = true;
    };
    const onLeave = () => { pointerActive = false; };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    const themeObs = new MutationObserver(() => { color = readColor(section); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    const frame = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const t = (now - t0) / 1000;
      const k = w / REF_W;
      // Mirrored: the fit's source is off the top-left; here it's off the top-right.
      const sx = (REF_W - FIT.sx) * k, sy = FIT.sy * k;

      if (!pointerActive || !Number.isFinite(goalX)) {
        goalX = w * 0.5 + Math.sin(t * 0.2) * w * 0.12;
        goalY = h * 0.45;
      }
      if (!Number.isFinite(aimX)) { aimX = goalX; aimY = goalY; }
      const ease = reduced ? 1 : 1 - Math.exp(-dt * FOLLOW_RATE);
      aimX += (goalX - aimX) * ease;
      aimY += (goalY - aimY) * ease;
      strength += (1 - strength) * (1 - Math.exp(-dt * 1.4)); // fade in on load

      // Landing point: where the source→aim line meets the preview's top edge.
      const sr = section.getBoundingClientRect();
      const tr = (target ?? section).getBoundingClientRect();
      const edgeY = tr.top - sr.top;
      const dirY = Math.max(1, aimY - sy);
      const hitX = sx + (aimX - sx) * ((edgeY - sy) / dirY);

      if (target) {
        const frac = (hitX - (tr.left - sr.left)) / tr.width;
        target.style.setProperty("--light-hit-x", `${(Math.min(1, Math.max(0, frac)) * 100).toFixed(2)}%`);
        target.style.setProperty("--light-strength", strength.toFixed(3));
        target.style.setProperty("--light-r", `${Math.round(tr.width * 0.436)}px`); // reference: 576 of 1320
      }

      if (gl && prog) {
        gl.uniform2f(u.uRes, canvas.width, canvas.height);
        gl.uniform1f(u.uPx, SCALE);
        gl.uniform1f(u.uK, k);
        gl.uniform2f(u.uSrc, sx, sy);
        gl.uniform2f(u.uAim, aimX, aimY);
        gl.uniform2f(u.uHit, hitX, edgeY);
        gl.uniform1f(u.uTime, reduced ? 0 : t);
        gl.uniform1f(u.uStrength, strength);
        gl.uniform3f(u.uColor, color[0], color[1], color[2]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = visible && (!reduced || strength < 0.995) ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(section);
    const onVis = () => {
      visible = !document.hidden;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-light-canvas" />;
}
