/**
 * Hull: solid #5c7d95 (icebreaker red). No strokes. Dark deck holds #2d4554.
 * Skips light-beam-*.svg and wake-*.svg
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dir = path.join(root, "public", "ship-refs");

const HULL = "#5c7d95";
const HULL_ICEBREAKER = "#c2410c";
const DECK = "#2d4554";
const TANK = "#6a8494";
const DOME = "#8a9faf";

function mapUrlFill(id) {
  if (id === "coal") return "#44403c";
  if (id === "ore") return "#b45309";
  if (id === "pipeDeck" || id === "deckShade") return DECK;
  if (id === "tankL" || id === "sphereL" || id === "sphere") return TANK;
  if (id === "dome" || id === "domeL") return DOME;
  if (id.startsWith("h")) return HULL;
  return null;
}

function process(name, raw) {
  if (name.startsWith("light-beam-") || name.startsWith("wake-")) return raw;

  let s = raw;

  s = s.replace(/<path[^>]*\bfill="none"[^/]*\/>/g, "");
  s = s.replace(/<path\s+fill="none"[\s\S]*?\/>/g, "");

  s = s.replace(/\s+stroke-linecap="[^"]*"/g, "");
  s = s.replace(/\s+stroke-linejoin="[^"]*"/g, "");
  s = s.replace(/\s+stroke-dasharray="[^"]*"/g, "");
  s = s.replace(/\s+stroke-opacity="[^"]*"/g, "");
  s = s.replace(/\s+stroke-width="[^"]*"/g, "");
  s = s.replace(/\s+stroke="[^"]*"/g, "");

  s = s.replace(/fill="url\(#[^)]+\)"/g, (m) => {
    const id = m.match(/#([^)]+)\)/)[1];
    const repl = mapUrlFill(id);
    return repl ? `fill="${repl}"` : m;
  });

  if (name === "icebreaker-top.svg") {
    s = s.replace(/<path fill="#[^"]+"/, `<path fill="${HULL_ICEBREAKER}"`);
  } else if (name !== "barge-top.svg") {
    if (/<path\s/i.test(s)) s = s.replace(/<path fill="#[^"]+"/, `<path fill="${HULL}"`);
  }

  s = s.replace(/fill="#7dd3fc"/g, `fill="${DECK}"`);

  s = s.replace(/\s+filter="url\(#softC\)"/g, "");
  s = s.replace(/<filter id="softC"[\s\S]*?<\/filter>\s*/g, "");

  return s;
}

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".svg")) continue;
  const p = path.join(dir, f);
  const raw = fs.readFileSync(p, "utf8");
  fs.writeFileSync(p, process(f, raw), "utf8");
}
console.log("refine-ship-svgs: done");
