/**
 * GLSL shared by the 3D stage and the stand-alone aurora canvas.
 * Colours are written in sRGB directly (no tone mapping), so the aurora and the
 * screenshots look exactly as designed.
 */

const noise = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
    return v;
  }
`;

/** Full-screen triangle/quad; draws behind everything. */
export const auroraVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

/**
 * Daylight aurora: a pearl ground, three soft colour fields that drift on a
 * domain-warped noise, one silk ribbon of light, and a whisper of film grain.
 */
export const auroraFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform vec3 uBase;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uIntensity;
  ${noise}

  float field(vec2 p, vec2 c, float r) { return exp(-dot(p - c, p - c) / (r * r)); }

  void main() {
    float asp = uRes.x / max(uRes.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(asp, 1.0);
    float t = uTime * 0.045;

    vec2 q = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 - t + 4.3));
    vec2 w = p + (q - 0.5) * 0.55;

    vec2 c1 = vec2(-0.42 * asp, 0.28) + 0.18 * vec2(sin(t * 2.1), cos(t * 1.7)) + uPointer * 0.05;
    vec2 c2 = vec2(0.38 * asp, -0.22) + 0.2 * vec2(cos(t * 1.4), sin(t * 2.3)) - uPointer * 0.04;
    vec2 c3 = vec2(0.1 * asp, 0.46) + 0.16 * vec2(sin(t * 1.2 + 2.0), cos(t * 1.9));

    vec3 col = uBase;
    col = mix(col, uC1, field(w, c1, 0.55) * 0.62 * uIntensity);
    col = mix(col, uC2, field(w, c2, 0.6) * 0.58 * uIntensity);
    col = mix(col, uC3, field(w, c3, 0.42) * 0.5 * uIntensity);

    // a silk ribbon of light across the frame
    float ribbon = w.y + 0.22 * sin(w.x * 1.7 + t * 5.0) + (fbm(w * 2.2 + t * 2.0) - 0.5) * 0.35 + 0.08;
    float band = exp(-ribbon * ribbon / 0.012);
    vec3 ribbonCol = mix(uC1, uC3, smoothstep(-asp * 0.5, asp * 0.5, w.x));
    col = mix(col, mix(ribbonCol, vec3(1.0), 0.35), band * 0.5 * uIntensity);
    col += band * 0.05 * uIntensity;

    // soft vignette toward white keeps edges airy, then grain
    col = mix(col, uBase, smoothstep(0.55, 1.1, length(p / vec2(asp, 1.0))) * 0.35);
    col += (hash(vUv * uRes + fract(uTime * 7.0)) - 0.5) * 0.022;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * A device screen: rounded corners, a width-fit screenshot (white below short
 * captures), a noisy right-to-left dissolve between two screenshots with a
 * glowing seam, a glass sheen, and a power-on level.
 */
export const screenFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform float uAspA;
  uniform float uAspB;
  uniform float uMix;
  uniform float uTime;
  uniform float uPower;
  uniform vec2 uSize;
  uniform float uRadius;
  uniform vec3 uGlow;
  ${noise}

  // width-fit; a shorter capture sits a little above centre on white, like an app inside the safe area
  vec3 fit(sampler2D t, vec2 uv, float asp) {
    float screenHW = uSize.y / uSize.x;
    float offset = max(screenHW - asp, 0.0) * 0.55;
    float vTop = ((1.0 - uv.y) * screenHW - offset) / asp;
    if (vTop < 0.0 || vTop > 1.0) return vec3(1.0);
    return texture2D(t, vec2(uv.x, 1.0 - vTop)).rgb;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    vec2 q = abs(p) - (uSize * 0.5 - uRadius);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
    float alpha = 1.0 - smoothstep(-0.004, 0.004, d);

    vec3 a = fit(uA, vUv, uAspA);
    vec3 b = fit(uB, vUv, uAspB);

    float w = 0.09;
    float f = (1.0 - vUv.x) * 0.72 + noise(vUv * vec2(7.0, 5.0) + uTime * 0.15) * 0.28;
    float T = uMix * (1.0 + 2.0 * w) - w;
    float m = 1.0 - smoothstep(T - w, T + w, f);
    float seam = max(0.0, 1.0 - abs(f - T) / w);
    seam = seam * seam * step(0.001, uMix) * step(uMix, 0.999);

    vec3 col = mix(a, b, m) + uGlow * seam * 0.9;
    col += 0.05 * smoothstep(0.28, 0.0, abs(vUv.x * 0.8 + vUv.y - 1.15));
    col = mix(vec3(0.03, 0.035, 0.05), col, uPower);
    gl_FragColor = vec4(col, alpha);
  }
`;
