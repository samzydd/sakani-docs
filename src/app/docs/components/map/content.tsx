"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Map as TileMap,
  MapMarker,
  MapPopup,
  MapClusterLayer,
  MapControls,
  MapGlobe,
  type LatLng,
} from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DocTable } from "@/components/docs/doc-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `import { Map, MapMarker, MapPopup } from '@sakaniui/react';

export const Example = () => {
  const [open, setOpen] = useState(true);
  return (
    <Map center={[51.5055, -0.091]} zoom={15} height={360}>
      <MapMarker position={[51.5055, -0.091]} label="Borough Market" selected={open} onClick={() => setOpen(true)} />
      {open && (
        <MapPopup
          position={[51.5055, -0.091]}
          title="Borough Market"
          description="8 Southwark St · Open until 5pm"
          onClose={() => setOpen(false)}
        />
      )}
    </Map>
  );
};`;

const MARKERS = `<MapMarker position={[51.5062, -0.0990]} label="Pin" />
<MapMarker position={[51.5062, -0.0950]} label="Pin, selected" selected />
<MapMarker position={[51.5062, -0.0910]} variant="dot" label="You are here" />
<MapMarker position={[51.5062, -0.0870]} variant="cluster" count={12} onClick={zoomIn} />`;

const POPUP = `<MapPopup position={place} title="Borough Market" description="Open until 5pm" onClose={close} />

// no close button, no pointer notch, an extra action inside
<MapPopup position={place} title="Borough Market" pointer={false}>
  <Button size="sm">Directions</Button>
</MapPopup>

// offset: gap between the place and the pointer tip. 48 clears a pin; use ~14 for a dot.
<MapPopup position={place} offset={14} title="You are here" />`;

const CONTROLS = `<Map controls={false} attribution={null} />   // a bare map
<Map locate onLocate={(here) => setHere(here)} onLocateError={(e) => toast.error(e.message)} />

// The same buttons for your own overlay
import { MapControls, MapControlButton } from '@sakaniui/react';
<MapControls locate onZoomIn={zoomIn} onZoomOut={zoomOut} zoomOutDisabled={zoom <= 2} />`;

const DARK = `// follows a .dark class on <html> or any ancestor (what the rest of the system does)
<Map />

// dark on a light page: tiles, markers, controls and popups all switch
<Map theme="dark" />

// a provider's own dark style instead of darkening the light tiles
<Map theme="dark" tileUrl={LIGHT} tileUrlDark={DARK_STYLE} />`;

const LIVE = `const [vehicles, setVehicles] = useState<{ id: string; position: LatLng }[]>([]);

useEffect(() => {
  const socket = new WebSocket('wss://example.com/vehicles');
  socket.onmessage = (e) => setVehicles(JSON.parse(e.data));
  return () => socket.close();
}, []);

<Map center={[51.5, -0.09]} zoom={13}>
  {vehicles.map((v) => (
    // glide: about the interval between updates, in ms
    <MapMarker key={v.id} variant="dot" position={v.position} glide={1900} label={v.id} />
  ))}
</Map>`;

const CLUSTER = `<Map center={[53, -1.8]} zoom={6} height={420}>
  <MapClusterLayer
    points={places}                                  // [{ id, position: [lat, lng] }, ...]
    renderPoint={(p) => <MapMarker key={p.id} variant="dot" position={p.position} label={p.name} />}
  />
</Map>`;

const TILES = `// Any {z}/{x}/{y} raster tile server. Pass its attribution too.
<Map
  tileUrl="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=YOUR_KEY"
  attribution={<>© MapTiler © OpenStreetMap contributors</>}
/>`;

const GLOBE = `import { MapGlobe } from '@sakaniui/react';

<MapGlobe
  markers={[{ position: [6.5, 3.4], active: true }, { position: [51.5, -0.1] }]}
  arcs={[{ from: [6.5, 3.4], to: [51.5, -0.1] }]}
/>`;

const GLOBE_VARIANTS = `<MapGlobe variant="land" />    // dots the continents (default)
<MapGlobe variant="ocean" />   // dots the sea and leaves the land dark
<MapGlobe atmosphere={false} autoRotate={false} />`;

const GLOBE_HOVER = `const [picked, setPicked] = useState<number | null>(null);

<MapGlobe
  markers={offices.map((o, i) => ({ position: o.position, label: o.name, selected: picked === i }))}
  onMarkerClick={(i) => setPicked(i)}
  onMarkerHover={(i) => console.log('over', i)}
/>`;

const GLOBE_DARK = `// the globe has no background, so theme="dark" is for one on a dark surface in a light page
<div className="bg-neutral-950 p-6">
  <MapGlobe theme="dark" />
</div>`;

const CONTEXT = `import { useMapContext } from '@sakaniui/react';

function Boundary({ corners }: { corners: LatLng[] }) {
  const { project, flyTo, fitBounds } = useMapContext();   // inside <Map>
  const points = corners.map(project);                      // container pixels, or null when far off-screen
  /* draw anything you like at those pixels */
  return <button onClick={() => fitBounds(corners)}>Fit</button>;
}`;

const MAP_PROPS = [
  { name: "center", type: "[lat, lng]", default: "[51.505, -0.09]", description: "Where the map starts. Changing it later flies the map there." },
  { name: "zoom", type: "number", default: "12", description: "Starting zoom, from 0 (the world) to maxZoom. Changing it later animates to it." },
  { name: "minZoom / maxZoom", type: "number", default: "2 / 18", description: "Zoom limits. The zoom buttons disable at the limits." },
  { name: "onViewChange", type: "(view) => void", description: "Called as the user pans or zooms, with { center, zoom }." },
  { name: "tileUrl", type: "string", default: "OpenStreetMap", description: "Tile template with {z}, {x} and {y}." },
  { name: "tileUrlDark", type: "string", description: "Tiles to use in dark mode. Without it the light tiles are darkened with --map-tile-filter." },
  { name: "attribution", type: "ReactNode | null", default: "OpenStreetMap credit", description: "The credit your tile provider requires. null hides it, only if your provider allows." },
  { name: "theme", type: "'auto' | 'dark'", default: "'auto'", description: "auto follows the surrounding .dark class. dark makes this map dark wherever it sits." },
  { name: "controls", type: "boolean", default: "true", description: "The zoom buttons (Figma: Show controls)." },
  { name: "locate", type: "boolean", default: "false", description: "The locate button, which uses the browser's geolocation." },
  { name: "onLocate / onLocateError", type: "(position) => void / (error) => void", description: "After the locate button finds the user, or fails (denied, unavailable, unsupported)." },
  { name: "height", type: "number | string", default: "400", description: "px or any CSS length. The map fills its container's width." },
  { name: "aria-label", type: "string", default: "'Map'", description: "Accessible name of the map region." },
  { name: "children", type: "ReactNode", description: "MapMarker, MapPopup, MapClusterLayer, or your own overlays." },
];

const MARKER_PROPS = [
  { name: "position", type: "[lat, lng]", description: "Where it is. Required." },
  { name: "variant", type: "'pin' | 'dot' | 'cluster'", default: "'pin'", description: "A teardrop pin anchored at its tip, a 16px dot, or a 40px count." },
  { name: "count", type: "number", description: "The number on a cluster." },
  { name: "selected", type: "boolean", description: "The larger, haloed state." },
  { name: "glide", type: "number", description: "Milliseconds to slide to a new position instead of jumping. Off by default; reduced motion turns it off." },
  { name: "label", type: "string", description: "Accessible name, e.g. the place's name." },
  { name: "onClick", type: "(event) => void", description: "Makes it a button. Without it the marker is a plain image." },
  { name: "hovered", type: "boolean", description: "Pins the hover look, for documentation and visual tests. Real hover works on its own." },
];

const POPUP_PROPS = [
  { name: "position", type: "[lat, lng]", description: "The place its pointer points at. Required." },
  { name: "title / description", type: "ReactNode", description: "The heading and the secondary line." },
  { name: "onClose", type: "() => void", description: "Shows a close button. Escape closes it too." },
  { name: "pointer", type: "boolean", default: "true", description: "The notch under the card (Figma: Show pointer)." },
  { name: "offset", type: "number", default: "48", description: "Gap between the place and the pointer tip, in px." },
  { name: "glide", type: "number", description: "Use the same value as the marker it follows." },
  { name: "children", type: "ReactNode", description: "Extra content under the description: actions, a thumbnail." },
];

const CLUSTER_PROPS = [
  { name: "points", type: "{ id, position }[]", description: "Your places. Required." },
  { name: "renderPoint", type: "(point) => ReactNode", description: "Draws one unclustered place, usually a MapMarker. Required." },
  { name: "radius", type: "number", default: "56", description: "Grid size in px. Larger groups more places together." },
  { name: "clusterMaxZoom", type: "number", default: "16", description: "From this zoom up nothing clusters." },
  { name: "onClusterClick", type: "(points) => void", description: "Called after a cluster is clicked. The map has already zoomed to its places." },
];

const GLOBE_PROPS = [
  { name: "variant", type: "'land' | 'ocean'", default: "'land'", description: "Which part gets the bright dots." },
  { name: "center", type: "[lat, lng]", default: "[15, 90]", description: "The place facing the viewer at first." },
  { name: "markers", type: "MapGlobeMarker[]", description: "{ position, label?, active?, selected?, hovered? }. active pulses; selected has the larger halo; label shows in a card while hovered or selected." },
  { name: "arcs", type: "{ from, to }[]", description: "Routes between two places, drawn over the sphere with a travelling pulse." },
  { name: "autoRotate", type: "boolean", default: "true", description: "Spins on its own. Off under reduced motion." },
  { name: "rotationSpeed", type: "number", default: "6", description: "Degrees per second." },
  { name: "draggable", type: "boolean", default: "true", description: "Drag to spin, with inertia." },
  { name: "atmosphere", type: "boolean", default: "true", description: "The soft halo past the edge (Figma: Show atmosphere)." },
  { name: "dotSpacing", type: "number", default: "1.3", description: "Degrees between dots. Smaller is denser and costs more to draw." },
  { name: "theme", type: "'auto' | 'dark'", default: "'auto'", description: "dark draws light dots, for a globe on a dark surface inside a light page." },
  { name: "onMarkerClick", type: "(index, marker) => void", description: "A marker was clicked or activated from the keyboard. Labelled markers get a hidden button, so Tab reaches them." },
  { name: "onMarkerHover", type: "(index | null) => void", description: "The pointer or keyboard focus moved onto a marker, or off all of them." },
  { name: "aria-label", type: "string", default: "'Globe'", description: "Accessible description." },
];

const CONTEXT_API = [
  ["project(position)", "[lat, lng] to { x, y } in the map's pixels, or null when it is far outside the view."],
  ["flyTo(center, zoom?)", "Eases the map to a place."],
  ["fitBounds(places, padding?)", "Eases the map so every place is in view."],
  ["zoom, maxZoom", "The current (fractional) zoom and the limit."],
];

const INTERACTION = [
  ["Drag", "Pans, with a little inertia after a quick flick."],
  ["Scroll or pinch", "Zooms at the pointer."],
  ["Double-click", "Zooms in one level at the pointer."],
  ["Arrow keys (map focused)", "Pan."],
  ["+ and - (map focused)", "Zoom in and out."],
  ["Click a marker", "Fires its onClick. Cluster markers made by MapClusterLayer zoom to their places."],
  ["Globe: hover a marker", "Its halo and name appear and the spin stops, so it can be clicked."],
];

const PLACES: { name: string; note: string; position: LatLng }[] = [
  { name: "Borough Market", note: "8 Southwark St · Open until 5pm", position: [51.5055, -0.091] },
  { name: "Tate Modern", note: "Bankside · Free entry", position: [51.5076, -0.0994] },
  { name: "Shakespeare’s Globe", note: "21 New Globe Walk", position: [51.5081, -0.0972] },
  { name: "The Shard", note: "32 London Bridge St", position: [51.5045, -0.0865] },
];

const frame = "w-full max-w-[760px]";

function Places() {
  const [selected, setSelected] = useState<number | null>(0);
  const place = selected == null ? null : PLACES[selected];
  return (
    <div className={frame}>
      <TileMap center={[51.5062, -0.093]} zoom={15} height={360} locate>
        {PLACES.map((p, i) => (
          <MapMarker key={p.name} position={p.position} label={p.name} selected={selected === i} onClick={() => setSelected(i)} />
        ))}
        {place && <MapPopup position={place.position} offset={58} title={place.name} description={place.note} onClose={() => setSelected(null)} />}
      </TileMap>
    </div>
  );
}

function MarkerShowcase() {
  return (
    <div className={frame}>
      <TileMap center={[51.5062, -0.093]} zoom={15} height={260} controls={false}>
        <MapMarker position={[51.5062, -0.0990]} label="Pin" />
        <MapMarker position={[51.5062, -0.0950]} label="Pin, selected" selected />
        <MapMarker position={[51.5062, -0.0910]} variant="dot" label="Dot" />
        <MapMarker position={[51.5062, -0.0870]} variant="cluster" count={12} label="12 places" onClick={() => {}} />
      </TileMap>
    </div>
  );
}

function PopupShowcase() {
  return (
    <div className={frame}>
      <TileMap center={[51.5062, -0.093]} zoom={15} height={300} controls={false}>
        <MapMarker position={[51.5062, -0.1010]} label="Full" />
        <MapPopup position={[51.5062, -0.1010]} offset={58} title="Borough Market" description="Open until 5pm" onClose={() => {}} />
        <MapMarker position={[51.5062, -0.0930]} label="No pointer" />
        <MapPopup position={[51.5062, -0.0930]} offset={58} pointer={false} title="No pointer" description="pointer={false}" />
        <MapMarker position={[51.5062, -0.0850]} variant="dot" label="Short" />
        <MapPopup position={[51.5062, -0.0850]} offset={14} title="Title only" />
      </TileMap>
    </div>
  );
}

function ControlsShowcase() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <div className="w-full max-w-[270px]">
        <TileMap center={[51.5062, -0.093]} zoom={15} height={220} controls={false} attribution={null} aria-label="Map without controls" />
        <p className="mt-2 text-center text-xs text-ink-muted">controls=&#123;false&#125;</p>
      </div>
      <div className="w-full max-w-[270px]">
        <TileMap center={[51.5062, -0.093]} zoom={18} maxZoom={18} height={220} locate aria-label="Map at maximum zoom" />
        <p className="mt-2 text-center text-xs text-ink-muted">locate, at maxZoom (zoom in is disabled)</p>
      </div>
      <div className="relative h-[133px] w-[58px]">
        <MapControls locate />
      </div>
    </div>
  );
}

function DarkShowcase() {
  return (
    <div className={frame}>
      <TileMap theme="dark" center={[51.5062, -0.093]} zoom={15} height={340} locate>
        {PLACES.slice(0, 3).map((p) => <MapMarker key={p.name} position={p.position} label={p.name} />)}
        <MapPopup position={PLACES[0].position} offset={58} title={PLACES[0].name} description={PLACES[0].note} onClose={() => {}} />
      </TileMap>
    </div>
  );
}

/** Where courier i is after `tick` updates: its own loop around the middle. */
function courierAt(i: number, tick: number): { id: number; name: string; position: LatLng; heading: number } {
  const radius = 0.0035 + (i % 4) * 0.0018, rate = (i % 2 ? 1 : -1) * (0.16 + (i % 3) * 0.05);
  const phase = i * 0.9 + tick * rate;
  const heading = (Math.atan2(-Math.sin(phase) * rate * 1.8 * 0.62, Math.cos(phase) * rate) * 180) / Math.PI;
  return { id: i, name: `Courier ${i + 1}`, position: [51.5062 + Math.sin(phase) * radius, -0.093 + Math.cos(phase) * radius * 1.8], heading: (heading + 360) % 360 };
}

function LiveShowcase() {
  const [tick, setTick] = useState(0);
  const [glide, setGlide] = useState(true);
  const [selected, setSelected] = useState<number | null>(2);
  // stands in for a WebSocket message every two seconds
  useEffect(() => { const t = setInterval(() => setTick((n) => n + 1), 2000); return () => clearInterval(t); }, []);
  const couriers = useMemo(() => Array.from({ length: 8 }, (_, i) => courierAt(i, tick)), [tick]);
  const picked = couriers.find((c) => c.id === selected);
  return (
    <div className={frame}>
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setGlide((g) => !g)}
          className="rounded-md border border-line-subtle bg-surface px-2.5 py-1 text-xs font-medium text-ink hover:bg-subtle"
        >
          glide: {glide ? "1900" : "off"}
        </button>
      </div>
      <TileMap center={[51.5062, -0.093]} zoom={15} height={340}>
        {couriers.map((c) => (
          <MapMarker key={c.id} variant="dot" position={c.position} glide={glide ? 1900 : 0} label={c.name} selected={selected === c.id} onClick={() => setSelected(c.id)} />
        ))}
        {picked && <MapPopup position={picked.position} glide={glide ? 1900 : 0} offset={30} title={picked.name} description={`Heading ${Math.round(picked.heading)}°`} onClose={() => setSelected(null)} />}
      </TileMap>
    </div>
  );
}

function scatter(n: number) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const hubs: LatLng[] = [[51.5, -0.12], [53.48, -2.24], [52.49, -1.89], [55.95, -3.19], [51.45, -2.59], [53.8, -1.55]];
  return Array.from({ length: n }, (_, id) => {
    const h = hubs[Math.floor(rnd() * hubs.length)], spread = 0.05 + rnd() * 0.4;
    return { id, position: [h[0] + (rnd() - 0.5) * spread, h[1] + (rnd() - 0.5) * spread * 1.6] as LatLng };
  });
}

function ClusterShowcase() {
  const points = useMemo(() => scatter(2000), []);
  return (
    <div className={frame}>
      <TileMap center={[53.2, -1.8]} zoom={6} height={400}>
        <MapClusterLayer
          points={points}
          renderPoint={(p) => <MapMarker key={p.id} variant="dot" position={p.position} label={`Place ${p.id + 1}`} onClick={() => {}} />}
        />
      </TileMap>
    </div>
  );
}

const CITY: Record<string, LatLng> = {
  Lagos: [6.5, 3.4], London: [51.5, -0.1], Singapore: [1.35, 103.8], Tokyo: [35.7, 139.7],
  Sydney: [-33.9, 151.2], Mumbai: [19.1, 72.9], "New York": [40.7, -74.0], "São Paulo": [-23.5, -46.6],
};
const ARCS = [
  { from: CITY.London, to: CITY.Singapore }, { from: CITY.Singapore, to: CITY.Sydney }, { from: CITY.Singapore, to: CITY.Tokyo },
  { from: CITY.Mumbai, to: CITY.Singapore }, { from: CITY.Lagos, to: CITY.London }, { from: CITY["New York"], to: CITY.London },
];
const globeBox = "w-full max-w-[420px]";

function GlobeBasic() {
  const markers = Object.values(CITY).map((position, i) => ({ position, active: i === 0 || i === 2 }));
  return <div className={globeBox}><MapGlobe markers={markers} arcs={ARCS} center={[12, 70]} /></div>;
}

function GlobeVariants() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <figure><MapGlobe variant="land" center={[12, 70]} /><figcaption className="text-center text-xs text-ink-muted">land</figcaption></figure>
      <figure><MapGlobe variant="ocean" center={[18, 165]} /><figcaption className="text-center text-xs text-ink-muted">ocean</figcaption></figure>
    </div>
  );
}

function GlobeHover() {
  const [picked, setPicked] = useState<number | null>(1);
  const markers = Object.entries(CITY).map(([name, position], i) => ({ position, label: name, selected: picked === i }));
  return (
    <div className={globeBox}>
      <MapGlobe markers={markers} arcs={ARCS} center={[12, 70]} aria-label="Offices" onMarkerClick={(i) => setPicked((p) => (p === i ? null : i))} />
      <p className="mt-1 text-center text-sm text-ink-muted">{picked == null ? "Nothing selected" : `Selected: ${markers[picked].label}`}</p>
    </div>
  );
}

function GlobeDark() {
  return (
    <div className={globeBox + " rounded-xl bg-[#0e0e0f] p-4"}>
      <MapGlobe theme="dark" markers={Object.values(CITY).map((position) => ({ position }))} arcs={ARCS} center={[12, 70]} />
    </div>
  );
}

export default function MapPage() {
  return (
    <article>
      <PageHeader
        title="Map"
        description="An interactive tile map with markers, popups and controls, and a 3D dotted globe. No map library, fully themed with tokens."
      />

      <div className="space-y-10">
        <section>
          <p className="mb-3 text-sm text-ink-muted">
            <code>Map</code> draws flat map tiles and places <code>MapMarker</code> and <code>MapPopup</code> children by
            latitude and longitude. Drag to pan, scroll or pinch to zoom at the pointer, double-click to zoom in. Tiles are
            plain images on a Web Mercator grid, so it adds no dependency; the default tiles are OpenStreetMap&apos;s, which
            suit development and light use. For production traffic bring your own provider with <code>tileUrl</code> (see
            Tiles below).
          </p>
          <ComponentPreview code={BASIC}>
            <Places />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Markers</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Three types, each with Default, Hover and Selected states that match the Figma <em>Map Marker</em> set. Hover works on
            every marker (the one under the pointer rises above its neighbours); <code>selected</code> is yours to set. The pin
            is anchored at its tip, the dot and cluster at their centre.
          </p>
          <ComponentPreview code={MARKERS}>
            <MarkerShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Popup</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A card that opens above a place. The description, the close button and the pointer are each optional, and it takes
            children for actions.
          </p>
          <ComponentPreview code={POPUP}>
            <PopupShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controls</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Zoom buttons are on by default (Default, Hover and Disabled states, matching <em>Map Control Button</em>); add{" "}
            <code>locate</code> for a button that centres on the user. The same buttons are exported as{" "}
            <code>MapControls</code> and <code>MapControlButton</code> for custom overlays.
          </p>
          <ComponentPreview code={CONTROLS}>
            <ControlsShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dark mode</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The map follows the page&apos;s theme, so under <code>.dark</code> its tiles are darkened to near-black land with blue
            water and roads darker than the land (tune it with <code>--map-tile-filter</code>). Markers, controls and popups
            re-theme with the tokens. Use the moon button on any preview here to see it, or pass <code>theme=&quot;dark&quot;</code> to make
            one map dark on a light page, as below. For a provider&apos;s own dark style, give <code>tileUrlDark</code>.
          </p>
          <ComponentPreview code={DARK}>
            <DarkShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Live data</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Keep positions in state, update them when your feed delivers (WebSocket, server-sent events, polling), and give the
            markers <code>glide</code> of about the interval between updates: they slide to each new place instead of jumping,
            and a popup that points at one follows it. Here a new position arrives every two seconds; toggle <code>glide</code> to
            compare.
          </p>
          <ComponentPreview code={LIVE}>
            <LiveShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Many places</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Don&apos;t map thousands of <code>MapMarker</code>s yourself. <code>MapClusterLayer</code> groups nearby places into counted
            clusters that zoom to their places when clicked, regroups as you zoom, and renders only what is in view. This map
            has 2,000 places; a zoom step takes about 5 ms with 10,000.
          </p>
          <ComponentPreview code={CLUSTER}>
            <ClusterShowcase />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Tiles and attribution</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Any raster tile server works: give its <code>{"{z}/{x}/{y}"}</code> template and the credit it requires. OpenStreetMap&apos;s
            own servers are for light use; their usage policy asks heavier sites to use a provider or host their own tiles.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-line-subtle bg-surface p-4 text-[13px] leading-relaxed text-ink-muted">{TILES}</pre>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Your own overlays</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Inside a <code>Map</code>, <code>useMapContext()</code> projects places into the map&apos;s pixels and can move the view.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-line-subtle bg-surface p-4 text-[13px] leading-relaxed text-ink-muted">{CONTEXT}</pre>
          <div className="mt-3"><DocTable headers={["Member", "What it does"]} rows={CONTEXT_API} mono={[0]} /></div>
        </section>

        <section>
          <h2 id="globe" className="mb-3 text-lg font-semibold text-ink">Globe</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>MapGlobe</code> is a 3D dotted globe for places in the world as a whole: offices, customers, routes. It is a canvas with
            an orthographic projection and a small Natural Earth land mask, so it adds no dependency. It spins on its own, can be
            dragged, pauses offscreen, and stays still under reduced motion. It has no background of its own: it takes the colour
            of whatever it sits on.
          </p>
          <ComponentPreview code={GLOBE}>
            <GlobeBasic />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Globe variants</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>land</code> dots the continents; <code>ocean</code> dots the sea and leaves the land dark. Atmosphere, markers and arcs
            are each optional (Figma: Show atmosphere, Show markers, Show arcs).
          </p>
          <ComponentPreview code={GLOBE_VARIANTS}>
            <GlobeVariants />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Globe markers: hover and select</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Markers have Default, Hover (a soft halo), Selected (a larger halo) and Active (a pulse) states. Hovering one stops the
            spin so it can be clicked, and a marker with a <code>label</code> shows its name in a small card while hovered or
            selected. Labelled markers are also reachable with Tab.
          </p>
          <ComponentPreview code={GLOBE_HOVER}>
            <GlobeHover />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Globe in dark</h2>
          <p className="mb-3 text-sm text-ink-muted">
            It follows the page&apos;s theme like everything else. <code>theme=&quot;dark&quot;</code> draws light dots for a globe that sits on
            a dark surface inside a light page.
          </p>
          <ComponentPreview code={GLOBE_DARK}>
            <GlobeDark />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Interaction</h2>
          <DocTable headers={["Input", "What happens"]} rows={INTERACTION} mono={[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The map is a labelled region you can focus: arrow keys pan and <kbd>+</kbd> / <kbd>-</kbd> zoom, and the zoom buttons are real buttons with focus rings.</li>
            <li>Give every <code>MapMarker</code> a <code>label</code>. Markers with <code>onClick</code> are buttons (<code>aria-pressed</code> follows <code>selected</code>); the rest are images with that name.</li>
            <li>Popups are dialogs: Escape closes them when they have <code>onClose</code>.</li>
            <li>Reduced motion turns off pan inertia, the zoom easing, <code>glide</code> and the globe&apos;s spin.</li>
            <li>A map is hard to use without a pointer, so offer the places in a list or table next to it. The globe is decorative unless it has <code>onMarkerClick</code>: then labelled markers get a hidden button each.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Map props</h2>
          <PropsTable rows={MAP_PROPS} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MapMarker props</h2>
          <PropsTable rows={MARKER_PROPS} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MapPopup props</h2>
          <PropsTable rows={POPUP_PROPS} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MapClusterLayer props</h2>
          <PropsTable rows={CLUSTER_PROPS} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MapGlobe props</h2>
          <PropsTable rows={GLOBE_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/map" />
    </article>
  );
}
