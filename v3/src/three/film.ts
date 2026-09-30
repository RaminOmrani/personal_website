/**
 * One source of truth for the film: ScrollTrigger writes `target`, a ticker eases
 * `p` toward it (a cinematic lag, like scrub: 1), and both the 3D stage and the
 * HTML captions read the same `p`, so words and pictures never drift apart.
 */

export const film = {
  target: 0,
  p: 0,
  pointerX: 0,
  pointerY: 0,
  reduced: false,
  /** seconds since the stage mounted; drives the laptop opening */
  bootAt: -1,
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** 0→1 as v moves from a to b */
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent exponential smoothing. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/**
 * The film's beats, as fractions of the scroll range.
 *   hero → dive into the laptop → four sites → pull back → phone → five app screens → out
 */
export const beats = {
  heroOut: [0.02, 0.09] as const,
  dive: [0.07, 0.26] as const,
  sites: [0.27, 0.6] as const,
  exit: [0.6, 0.68] as const,
  phoneIn: [0.64, 0.73] as const,
  screens: [0.74, 0.95] as const,
  end: [0.95, 1] as const,
};

/**
 * Position inside a stepped sequence: integer values hold (so a screen stays put
 * long enough to read) and the fractional part only moves in the middle 40%.
 */
export function stepped(p: number, [a, b]: readonly [number, number], count: number) {
  const raw = range(p, a, b) * (count - 1);
  const i = Math.min(Math.floor(raw), count - 2);
  const f = raw - i;
  return i + smooth(range(f, 0.3, 0.7));
}

/** How visible item `i` of a stepped sequence is (1 on its plateau, 0 away from it). */
export function stepVisibility(s: number, i: number) {
  const d = Math.abs(s - i);
  return 1 - range(d, 0.18, 0.42);
}
