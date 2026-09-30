/** Ashima Arts 3D simplex noise (MIT). */
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uIntro;
uniform float uSize;
uniform float uPixelRatio;
uniform float uVelocity;
uniform float uAspect;
uniform float uFocus;
uniform float uMouseForce;
uniform vec2 uMouse;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec3 aP5;
attribute vec3 aP6;
attribute vec3 aP7;
attribute vec4 aRandom;

varying vec3 vColor;
varying float vAlpha;

${noise}

// progress of the morph from shape k to shape k+1, staggered per particle
float stage(float k){
  float t = clamp(uMorph - k, 0.0, 1.0);
  float d = aRandom.w * 0.4;
  t = clamp((t - d) / 0.6, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main(){
  vec3 p = position;
  p = mix(p, aP1, stage(0.0));
  p = mix(p, aP2, stage(1.0));
  p = mix(p, aP3, stage(2.0));
  p = mix(p, aP4, stage(3.0));
  p = mix(p, aP5, stage(4.0));
  p = mix(p, aP6, stage(5.0));
  p = mix(p, aP7, stage(6.0));

  // curl-like flow: stronger while morphing and while scrolling fast
  float between = sin(3.14159265 * fract(uMorph));
  vec3 q = p * 0.34 + vec3(0.0, uTime * 0.07, uTime * 0.045);
  vec3 flow = vec3(snoise(q), snoise(q + 17.31), snoise(q + 41.73));
  float amp = 0.09 + between * 1.1 + min(abs(uVelocity), 4.0) * 0.16;
  p += flow * amp;

  // intro: particles rush in from a deep scattered field
  vec3 scatter = (aRandom.xyz - 0.5) * vec3(42.0, 26.0, 34.0);
  scatter.z -= 10.0;
  float it = clamp((uIntro - aRandom.w * 0.45) / 0.55, 0.0, 1.0);
  it = 1.0 - pow(1.0 - it, 3.0);
  p = mix(scatter, p, it);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);

  // pointer repulsion, measured in screen space
  vec4 clip = projectionMatrix * mv;
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
  float dist = length(d);
  float force = smoothstep(0.34, 0.0, dist) * uMouseForce;
  mv.xy += (d / max(dist, 0.0001)) * force * (-mv.z) * 0.085;

  gl_Position = projectionMatrix * mv;

  // size + fake depth of field (bokeh away from the focal plane)
  float depth = -mv.z;
  float coc = abs(depth - uFocus);
  float bokeh = step(0.986, aRandom.x);
  float size = uSize * (0.35 + aRandom.x * 0.9) * (1.0 + bokeh * 3.2);
  size *= 1.0 + coc * 0.16;
  gl_PointSize = size * uPixelRatio / depth;

  float n = snoise(p * 0.24 + uTime * 0.04);
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.55, 0.6, n + (aRandom.y - 0.5) * 0.7));
  col = mix(col, uColorC, step(0.955, aRandom.z) * 0.9);
  col += force * 0.9;
  vColor = col;

  float twinkle = 0.62 + 0.38 * sin(uTime * (0.8 + aRandom.y * 2.4) + aRandom.z * 40.0);
  vAlpha = (0.28 + 0.72 * aRandom.y) * twinkle;
  vAlpha /= 1.0 + coc * coc * 0.05;
  vAlpha *= 1.0 - bokeh * 0.72;
  vAlpha *= mix(0.35, 1.0, it);
}`;

export const particleFragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = pow(smoothstep(0.5, 0.0, d), 1.7);
  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
}`;

export const dustVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute vec4 aRandom;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.2 + aRandom.x * 30.0) * 0.4;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (14.0 + aRandom.y * 26.0) * uPixelRatio / -mv.z;
  vAlpha = (0.15 + 0.45 * aRandom.z) * (0.6 + 0.4 * sin(uTime * (0.5 + aRandom.w) + aRandom.x * 50.0));
}`;

export const dustFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, pow(smoothstep(0.5, 0.0, d), 2.0) * vAlpha * uOpacity);
}`;
