/**
 * Target point clouds for the particle morph. Every function returns `count * 3` floats.
 * Order on the page: sphere → portrait (ring as fallback) → </> glyph → ocean → helix → vortex → rings → galaxy.
 */

export type Rng = () => number;

/** Small deterministic PRNG so the scene looks identical on every visit. */
export function rng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rotate(arr: Float32Array, rx: number, ry: number, rz: number): Float32Array {
  const [sx, cx, sy, cy, sz, cz] = [Math.sin(rx), Math.cos(rx), Math.sin(ry), Math.cos(ry), Math.sin(rz), Math.cos(rz)];
  for (let i = 0; i < arr.length; i += 3) {
    let x = arr[i];
    let y = arr[i + 1];
    let z = arr[i + 2];
    [y, z] = [y * cx - z * sx, y * sx + z * cx];
    [x, z] = [x * cy + z * sy, -x * sy + z * cy];
    [x, y] = [x * cz - y * sz, x * sz + y * cz];
    arr[i] = x;
    arr[i + 1] = y;
    arr[i + 2] = z;
  }
  return arr;
}

export function sphere(n: number, r: Rng, radius = 2.25): Float32Array {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * golden;
    const shell = r() < 0.86 ? radius * (0.985 + r() * 0.03) : radius * Math.cbrt(r()) * 0.96;
    out[i * 3] = Math.cos(th) * rad * shell;
    out[i * 3 + 1] = y * shell;
    out[i * 3 + 2] = Math.sin(th) * rad * shell;
  }
  return out;
}

export function torus(n: number, r: Rng, R = 2.55, tube = 0.5): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = r() * Math.PI * 2;
    const v = r() * Math.PI * 2;
    const t = tube * (r() < 0.8 ? 1 : Math.sqrt(r()));
    out[i * 3] = (R + t * Math.cos(v)) * Math.cos(u);
    out[i * 3 + 1] = (R + t * Math.cos(v)) * Math.sin(u);
    out[i * 3 + 2] = t * Math.sin(v);
  }
  return rotate(out, 1.12, 0, 0.28);
}

/**
 * Ramin's portrait as a stipple drawing: points land more densely where the photo is bright
 * or has an edge, and the face gets more of them than the suit. Returns positions plus each
 * point's brightness (0–1), which the shader uses for colour and alpha.
 */
export async function portrait(n: number, r: Rng, src: string, width = 3.7): Promise<{ points: Float32Array; tone: Float32Array } | null> {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode();
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx || !W || !H) return null;
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, W, H).data;

  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    lum[i] = ((0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255) * (px[i * 4 + 3] / 255);
  }
  // weight = brightness + edges (sobel); the face gets extra, the body fades toward the bottom
  const cdf = new Float64Array(W * H);
  let sum = 0;
  for (let y = 0; y < H; y++) {
    const fall = (y / H < 0.45 ? 1.5 : 1) * (1 - 0.65 * smoothstep(0.35, 0.9, y / H));
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const a = px[i * 4 + 3] / 255;
      let edge = 0;
      if (x > 0 && y > 0 && x < W - 1 && y < H - 1) {
        const gx = lum[i - W + 1] + 2 * lum[i + 1] + lum[i + W + 1] - lum[i - W - 1] - 2 * lum[i - 1] - lum[i + W - 1];
        const gy = lum[i + W - 1] + 2 * lum[i + W] + lum[i + W + 1] - lum[i - W - 1] - 2 * lum[i - W] - lum[i - W + 1];
        edge = Math.min(1, Math.hypot(gx, gy));
      }
      sum += a > 0.05 ? a * (0.06 + 1.4 * Math.pow(lum[i], 1.4) + 1.4 * edge) * fall : 0;
      cdf[i] = sum;
    }
  }
  if (sum <= 0) return null;

  const points = new Float32Array(n * 3);
  const tone = new Float32Array(n);
  const s = width / W;
  for (let k = 0; k < n; k++) {
    // inverse-CDF sampling
    const target = r() * sum;
    let lo = 0;
    let hi = cdf.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    const x = (lo % W) + r();
    const y = Math.floor(lo / W) + r();
    const t = lum[lo];
    const across = (x - W / 2) / (W / 2);
    points[k * 3] = (x - W / 2) * s;
    points[k * 3 + 1] = -(y - H * 0.48) * s;
    // gentle relief: a rounded body plus brighter areas nearer the camera
    points[k * 3 + 2] = Math.sqrt(Math.max(0, 1 - across * across)) * 0.5 + (t - 0.4) * 0.3 + (r() - 0.5) * 0.04;
    tone[k] = t;
  }
  return { points, tone };
}

function smoothstep(a: number, b: number, v: number): number {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Samples points from text drawn on a 2D canvas. */
export function glyph(n: number, r: Rng, text: string, font: string): Float32Array | null {
  const W = 1024;
  const H = 400;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = font;
  ctx.fillText(text, W / 2, H / 2 + 10);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
    }
  }
  if (pts.length < 200) return null;
  const out = new Float32Array(n * 3);
  const scale = 6.6 / W;
  const count = pts.length / 2;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(r() * count) * 2;
    out[i * 3] = (pts[k] - W / 2 + (r() - 0.5) * 2) * scale;
    out[i * 3 + 1] = -(pts[k + 1] - H / 2 + (r() - 0.5) * 2) * scale;
    out[i * 3 + 2] = (r() - 0.5) * 0.55;
  }
  return rotate(out, 0, -0.25, 0);
}

export function cube(n: number, r: Rng, s = 1.7): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const face = Math.floor(r() * 6);
    const a = (r() * 2 - 1) * s;
    const b = (r() * 2 - 1) * s;
    const sign = face % 2 ? 1 : -1;
    const axis = face >> 1;
    const p = [a, b, sign * s];
    out[i * 3 + ((axis + 0) % 3)] = p[0];
    out[i * 3 + ((axis + 1) % 3)] = p[1];
    out[i * 3 + ((axis + 2) % 3)] = p[2];
  }
  return rotate(out, 0.6, 0.7, 0);
}

/** A round "ocean" of waves below the camera. */
export function ocean(n: number, r: Rng, radius = 7.5): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * radius;
    const x = Math.cos(a) * d;
    const z = Math.sin(a) * d;
    const y = Math.sin(x * 0.9) * 0.28 + Math.cos(z * 1.1 + x * 0.3) * 0.24 + Math.sin(d * 1.6) * 0.12;
    out[i * 3] = x;
    out[i * 3 + 1] = y - 1.9;
    out[i * 3 + 2] = z - 1.2;
  }
  return out;
}

export function helix(n: number, r: Rng, radius = 1.15, height = 8): Float32Array {
  const out = new Float32Array(n * 3);
  const turns = 2.6;
  const rungs = 46;
  for (let i = 0; i < n; i++) {
    let x: number;
    let y: number;
    let z: number;
    if (r() < 0.78) {
      const t = r();
      const a = t * Math.PI * 2 * turns + (r() < 0.5 ? 0 : Math.PI);
      const j = 0.09;
      x = Math.cos(a) * radius + (r() - 0.5) * j;
      z = Math.sin(a) * radius + (r() - 0.5) * j;
      y = (t - 0.5) * height;
    } else {
      const k = Math.floor(r() * rungs) / rungs;
      const a = k * Math.PI * 2 * turns;
      const s = r() * 2 - 1;
      x = Math.cos(a) * radius * s;
      z = Math.sin(a) * radius * s;
      y = (k - 0.5) * height;
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return rotate(out, 0.2, 0, 0.42);
}

/** A twisting vortex / funnel — time travelling through the journey section. */
export function vortex(n: number, r: Rng): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = Math.pow(r(), 0.8);
    const y = (t - 0.5) * 7;
    const rad = 0.25 + t * t * 3.6 + (r() - 0.5) * 0.25;
    const a = r() * Math.PI * 2 + t * 7;
    out[i * 3] = Math.cos(a) * rad;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(a) * rad;
  }
  return rotate(out, 0.35, 0, 0);
}

/** Two interlocking rings — trust & collaboration. */
export function rings(n: number, r: Rng, R = 1.7, tube = 0.2): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const second = i % 2 === 1;
    const u = r() * Math.PI * 2;
    const v = r() * Math.PI * 2;
    const t = tube * Math.sqrt(r());
    let x = (R + t * Math.cos(v)) * Math.cos(u);
    let y = (R + t * Math.cos(v)) * Math.sin(u);
    let z = t * Math.sin(v);
    if (second) {
      // second ring stands perpendicular and passes through the first one
      [y, z] = [z, y];
      x += R * 0.95;
    }
    out[i * 3] = x - R * 0.475;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return rotate(out, 0.35, 0.5, 0.15);
}

export function galaxy(n: number, r: Rng, radius = 5.4, arms = 4): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const d = Math.pow(r(), 1.7) * radius;
    const branch = ((i % arms) / arms) * Math.PI * 2;
    const spin = d * 1.05;
    const spread = (v: number) => Math.pow(r(), 3) * (r() < 0.5 ? 1 : -1) * v * (0.25 + d * 0.12);
    out[i * 3] = Math.cos(branch + spin) * d + spread(1);
    out[i * 3 + 1] = spread(0.45);
    out[i * 3 + 2] = Math.sin(branch + spin) * d + spread(1);
  }
  return rotate(out, 0.62, 0, -0.2);
}
