import * as THREE from 'three';

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** A device body: a rounded rectangle in XY with softly bevelled edges, thickness along Z, centred. */
export function slab(w: number, h: number, depth: number, r: number, bevel = 0.014) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - 2 * bevel, h - 2 * bevel, Math.max(r - bevel, 0.002)), {
    depth: Math.max(depth - 2 * bevel, 0.001),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 18,
  });
  g.translate(0, 0, -(depth - 2 * bevel) / 2);
  g.computeVertexNormals();
  return g;
}

/** A flat rounded rectangle (glass, bezel, camera island). */
export function plate(w: number, h: number, r: number) {
  return new THREE.ShapeGeometry(roundedRect(w, h, r), 18);
}

/** Keyboard deck drawn on a canvas: keys, a trackpad and a speaker grille. */
export function keyboardTexture() {
  const W = 1024;
  const H = 700;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#d9dce3';
  g.fillRect(0, 0, W, H);

  const key = (x: number, y: number, w: number, h: number) => {
    g.fillStyle = '#23262d';
    g.beginPath();
    g.roundRect(x, y, w, h, 7);
    g.fill();
  };
  const top = 70;
  const kw = 58;
  const gap = 8;
  const rows = [14, 14, 13, 12, 11];
  rows.forEach((n, r) => {
    const rowW = n * kw + (n - 1) * gap;
    const extra = (W - 150 - rowW) / 2;
    for (let i = 0; i < n; i++) key(75 + extra + i * (kw + gap), top + r * (kw * 0.78 + gap), kw, kw * 0.78);
  });
  // space row
  const y = top + 5 * (kw * 0.78 + gap);
  key(260, y, 500, kw * 0.78);
  key(185, y, 66, kw * 0.78);
  key(769, y, 66, kw * 0.78);
  // trackpad
  g.fillStyle = '#cfd3db';
  g.beginPath();
  g.roundRect(W / 2 - 190, y + 64, 380, 210, 18);
  g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.08)';
  g.lineWidth = 2;
  g.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
