"use client";

import { useEffect, useRef } from "react";

/**
 * HeroLight — a soft volumetric beam that falls from above the hero onto the
 * product mockup and follows the pointer.
 *
 * Two parts, kept in step by the same eased position:
 *   1. A WebGL canvas behind the hero draws the rays: a cone of light from a
 *      source above the viewport, aimed at a point on the mockup's top edge,
 *      broken into faint streaks that drift slowly.
 *   2. Where the beam lands, the mockup's own 1px border lights up
 *      (`--light-hit-x` / `--light-strength` on the [data-light-target]
 *      element, read by `.hero-light-border` in globals.css), so the light
 *      reads as touching the UI rather than floating over it.
 *
 * The landing point eases toward the pointer's x (and drifts gently when the
 * pointer is elsewhere). Rendering runs at half resolution, pauses while the
 * hero is off-screen or the tab is hidden, and draws a single still frame
 * with prefers-reduced-motion. Without WebGL only the border light remains.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;        // canvas size, px
uniform vec2 uSrc;        // light source, px (y down, above the top edge)
uniform vec2 uHit;        // where the beam lands, px
uniform float uTime;
uniform float uStrength;  // 0..1 overall intensity
uniform vec3 uColor;

float hash(float n) { return fract(sin(n) * 43758.5453); }
float noise(float x) {
  float i = floor(x), f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 v = p - uSrc;
  float d = length(v);
  vec2 axis = normalize(uHit - uSrc);
  float c = dot(v / d, axis);
  float ang = acos(clamp(c, -1.0, 1.0));            // angle off the beam axis
  float side = sign(axis.x * v.y - axis.y * v.x);   // which side of the axis

  // Soft cone: bright core, wide faint skirt.
  float cone = exp(-pow(ang / 0.12, 2.0)) * 0.8 + exp(-pow(ang / 0.30, 2.0)) * 0.25;

  // Rays: angular streaks that drift slowly, two octaves.
  float a = ang * side * 60.0;
  float rays = 0.55 + 0.30 * noise(a + uTime * 0.35) + 0.15 * noise(a * 2.7 - uTime * 0.6);

  // Falloff with distance from the source, and fade-in just below it.
  float len = length(uHit - uSrc);
  float fall = 1.0 / (1.0 + pow(d / (len * 1.15), 2.4));
  float start = smoothstep(0.0, len * 0.25, d);

  // A gentle pool of light where the beam lands.
  float pool = exp(-pow(length(p - uHit) / (uRes.x * 0.22), 2.0)) * 0.35;

  float b = (cone * rays * fall * start + pool * smoothstep(0.0, 1.0, c)) * uStrength;
  b += (hash(p.x * 12.9898 + p.y * 78.233) - 0.5) / 255.0;   // dither, no banding
  b = clamp(b, 0.0, 1.0);
  gl_FragColor = vec4(uColor * b, b);
}
`;

const SCALE = 0.5; // render resolution vs CSS px

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
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "a");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        for (const n of ["uRes", "uSrc", "uHit", "uTime", "uStrength", "uColor"]) u[n] = gl.getUniformLocation(prog, n);
      }
    }
    if (prog) canvas.dataset.ready = "";

    // Eased landing point, as a fraction of the mockup's width.
    let hit = 0.62, goal = 0.62, strength = reduced ? 1 : 0, pointerActive = false;
    let color = readColor(section);
    let w = 0, h = 0, raf = 0, visible = true, last = performance.now();
    const t0 = last;

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
      const r = (target ?? section).getBoundingClientRect();
      if (e.clientY < section.getBoundingClientRect().top || e.clientY > section.getBoundingClientRect().bottom) return;
      goal = Math.min(1.05, Math.max(-0.05, (e.clientX - r.left) / r.width));
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
      // Idle drift when the pointer isn't steering it.
      if (!pointerActive) goal = 0.62 + Math.sin(t * 0.25) * 0.12;
      hit += (goal - hit) * (1 - Math.exp(-dt * 3.2));
      strength += (1 - strength) * (1 - Math.exp(-dt * 1.4)); // fade in on load

      const sr = section.getBoundingClientRect();
      const tr = (target ?? section).getBoundingClientRect();
      const hitX = tr.left - sr.left + hit * tr.width;
      const hitY = tr.top - sr.top;
      // Source sits above the hero, up and to the right (the copy is
      // left-aligned, so the beam slants across to the mockup instead of
      // falling on the text), and follows the landing point at a third of
      // the speed -- the beam swings, it doesn't slide.
      const srcX = w * 0.82 + (hitX - w * 0.82) * 0.3;
      const srcY = -h * 0.35;

      if (target) {
        target.style.setProperty("--light-hit-x", `${(hit * 100).toFixed(2)}%`);
        target.style.setProperty("--light-strength", (strength * (0.75 + 0.25 * Math.cos((hit - 0.5) * 2.4))).toFixed(3));
      }

      if (gl && prog) {
        gl.uniform2f(u.uRes, canvas.width, canvas.height);
        gl.uniform2f(u.uSrc, srcX * SCALE, srcY * SCALE);
        gl.uniform2f(u.uHit, hitX * SCALE, hitY * SCALE);
        gl.uniform1f(u.uTime, reduced ? 0 : t);
        gl.uniform1f(u.uStrength, strength);
        gl.uniform3f(u.uColor, color[0], color[1], color[2]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reduced || strength < 0.995) raf = visible ? requestAnimationFrame(frame) : 0;
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
