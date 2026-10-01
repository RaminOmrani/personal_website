// The mark's geometry, on a 120×120 grid (one cell of the 12×12 construction grid = 10 units).
// Everything here is plain numbers so the construction sheet can draw the same lines it builds from.
export const f = (n) => +n.toFixed(2);

/** the pointed Persian arch: two circle arcs whose centres sit on the spring line */
export const ARCH = { cx: 60, a: 27, spring: 65, apex: 21, base: 100, w: 10 };
export function archGeometry({ cx, a, spring, apex } = ARCH) {
  const h = spring - apex;
  const r = (a * a + h * h) / (2 * a); // the arc through the leg top and the apex, tangent to the leg
  const off = r - a; // each centre sits this far past the axis, on the opposite side
  const tilt = Math.atan2(off, h); // the arc's slope at the apex, from horizontal
  return { r, off, tilt, leftCentre: [cx + off, spring], rightCentre: [cx - off, spring] };
}
/** centre line of the arch, for stroking */
export function archPath(g = ARCH) {
  const { r } = archGeometry(g);
  const { cx, a, spring, apex, base } = g;
  return `M${f(cx - a)} ${f(base)}V${f(spring)}A${f(r)} ${f(r)} 0 0 1 ${f(cx)} ${f(apex)}A${f(r)} ${f(r)} 0 0 1 ${f(cx + a)} ${f(spring)}V${f(base)}`;
}
/** the doorway: the inside of the arch's centre line, closed along the base */
export function doorPath(g = ARCH) {
  return archPath(g) + 'Z';
}
/** the top of the arch's outer edge: where the two offset arcs meet on the axis */
export function apexTip(g = ARCH) {
  const { r, off } = archGeometry(g);
  const ro = r + g.w / 2;
  return g.spring - Math.sqrt(ro * ro - off * off);
}

/** ر: one cubic stroke, drawn like a reed pen: an angled entry, a full belly, a lighter flat-cut tail.
 * It starts down-and-right and sweeps down-left, the same S as the ر in the Estedad wordmark. */
export const REH = { curve: [[66, 54], [73, 66], [70, 86], [45, 95.5]], entry: 11.5, belly: 13, tail: 8, peak: 0.45 };
export function rehWidth({ entry, belly, tail, peak } = REH) {
  return (t) =>
    t < peak
      ? entry + (belly - entry) * Math.sin(((t / peak) * Math.PI) / 2)
      : belly + (tail - belly) * (1 - Math.cos((((t - peak) / (1 - peak)) * Math.PI) / 2));
}
function bezier([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const pt = [0, 1].map((i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]);
  const d = [0, 1].map((i) => 3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]));
  return { pt, d };
}
// a smooth curve through points (Catmull-Rom → cubic Béziers), so the outline stays light and exact
function through(points) {
  let d = '';
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}
/** the outline of ر, as a filled shape */
export function rehPath(r = REH, steps = 24) {
  const w = rehWidth(r);
  const L = [], R = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const { pt: [x, y], d: [dx, dy] } = bezier(r.curve, t);
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len, h = w(t) / 2;
    L.push([x + nx * h, y + ny * h]);
    R.push([x - nx * h, y - ny * h]);
  }
  R.reverse();
  return `M${f(L[0][0])} ${f(L[0][1])}${through(L)}L${f(R[0][0])} ${f(R[0][1])}${through(R)}Z`;
}

/** a superellipse tile, the "squircle" of modern app icons */
export function squircle(x = 0, y = 0, w = 120, h = 120, n = 5, steps = 64) {
  const cx = x + w / 2, cy = y + h / 2, a = w / 2, b = h / 2;
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    pts.push([cx + a * Math.sign(c) * Math.abs(c) ** (2 / n), cy + b * Math.sign(s) * Math.abs(s) ** (2 / n)]);
  }
  pts.push(pts[0]);
  return `M${f(pts[0][0])} ${f(pts[0][1])}${through(pts)}Z`;
}

/** the symbol's own bounds (arch outer edge to base), for tight crops */
export function symbolBox(g = ARCH) {
  const top = apexTip(g);
  return { x: g.cx - g.a - g.w / 2, y: top, w: 2 * g.a + g.w, h: g.base - top };
}

/** the arch as a filled outline (its stroke expanded), exact: offsets of circle arcs are circle arcs */
export function archOutline(g = ARCH) {
  const { r, off } = archGeometry(g);
  const { cx, a, spring, base, w } = g;
  const ro = r + w / 2, ri = r - w / 2;
  const yo = spring - Math.sqrt(ro * ro - off * off);
  const yi = spring - Math.sqrt(ri * ri - off * off);
  return (
    `M${f(cx - a - w / 2)} ${f(base)}V${f(spring)}A${f(ro)} ${f(ro)} 0 0 1 ${f(cx)} ${f(yo)}A${f(ro)} ${f(ro)} 0 0 1 ${f(cx + a + w / 2)} ${f(spring)}V${f(base)}` +
    `H${f(cx + a - w / 2)}V${f(spring)}A${f(ri)} ${f(ri)} 0 0 0 ${f(cx)} ${f(yi)}A${f(ri)} ${f(ri)} 0 0 0 ${f(cx - a + w / 2)} ${f(spring)}V${f(base)}Z`
  );
}
/** the opening inside the arch */
export function doorway(g = ARCH) {
  const { r, off } = archGeometry(g);
  const { cx, a, spring, base, w } = g;
  const ri = r - w / 2;
  const yi = spring - Math.sqrt(ri * ri - off * off);
  return `M${f(cx - a + w / 2)} ${f(base)}V${f(spring)}A${f(ri)} ${f(ri)} 0 0 1 ${f(cx)} ${f(yi)}A${f(ri)} ${f(ri)} 0 0 1 ${f(cx + a - w / 2)} ${f(spring)}V${f(base)}Z`;
}
