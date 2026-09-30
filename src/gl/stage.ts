import * as THREE from 'three';
import gsap from 'gsap';
import { dustFragment, dustVertex, particleFragment, particleVertex } from './shaders';
import * as shapes from './shapes';

export interface SceneState {
  /** shape index (0–7) */
  s: number;
  /** horizontal offset toward the inline-end side, as a fraction of the viewport width */
  x?: number;
  /** opacity */
  o?: number;
  /** scale */
  sc?: number;
}

/** Colour pair per shape — Persian turquoise, saffron, pomegranate, lapis & amethyst. */
const PALETTE: [string, string][] = [
  ['#37f0cf', '#ffb23f'],
  // the portrait: turquoise shadows, warm light on the face
  ['#2bd8c0', '#ffe0b5'],
  ['#ffb23f', '#ff4d5e'],
  ['#2b6bff', '#37f0cf'],
  ['#37f0cf', '#ffb23f'],
  ['#8a6bff', '#37f0cf'],
  ['#ffb23f', '#ff6f91'],
  ['#ffb23f', '#ff4d5e'],
];
/** Spin per shape; 0 turns the shape to face the camera and holds it there (the portrait). */
const SPIN = [0.07, 0, 0.12, 0.03, 0.16, 0.22, 0.1, 0.05];
const SHAPES = 8;

export class Stage {
  readonly ready: Promise<void>;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  private rig = new THREE.Group();
  private spin = new THREE.Group();
  private dustGroup = new THREE.Group();
  private material!: THREE.ShaderMaterial;
  private dustMaterial!: THREE.ShaderMaterial;
  private geometry!: THREE.BufferGeometry;
  private mouseTarget = new THREE.Vector2(9, 9);
  private parallax = new THREE.Vector2();
  private parallaxTarget = new THREE.Vector2();
  private velocityTarget = 0;
  private spinSpeed = { v: SPIN[0] };
  private facing = false;
  /** vertical offset of the portrait's slot from the viewport centre, in viewport heights */
  private anchorY = 0;
  private state: Required<SceneState> = { s: 0, x: 0, o: 1, sc: 1 };
  private dir: 1 | -1 = 1;
  private count: number;
  private frames: number[] = [];
  private degraded = false;
  private checks = 0;
  private width = 1;
  private height = 1;
  private uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uIntro: { value: 0 },
    uSize: { value: 34 },
    uPixelRatio: { value: 1 },
    uVelocity: { value: 0 },
    uAspect: { value: 1 },
    uFocus: { value: 9 },
    uMouseForce: { value: 1 },
    uMouse: { value: new THREE.Vector2(9, 9) },
    uColorA: { value: new THREE.Color(PALETTE[0][0]) },
    uColorB: { value: new THREE.Color(PALETTE[0][1]) },
    uColorC: { value: new THREE.Color('#ff4d5e') },
    uOpacity: { value: 1 },
  };

  constructor(
    private canvas: HTMLCanvasElement,
    private reduced: boolean,
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const lowEnd = (navigator.hardwareConcurrency || 4) <= 4;
    this.count = small ? 16000 : lowEnd ? 26000 : 40000;
    if (small) this.uniforms.uSize.value = 40;

    this.camera.position.set(0, 0, 9);
    this.scene.add(this.rig, this.dustGroup);
    this.rig.add(this.spin);
    this.resize();
    this.ready = this.build();
    if (reduced) {
      this.uniforms.uIntro.value = 1;
      this.uniforms.uMouseForce.value = 0;
    }
  }

  private async build(): Promise<void> {
    const n = this.count;
    const r = shapes.rng(1996);
    let glyph: Float32Array | null = null;
    try {
      await document.fonts.load('700 240px "Unbounded Variable"');
      glyph = shapes.glyph(n, r, '</>', '700 250px "Unbounded Variable", system-ui, sans-serif');
    } catch {
      /* fall back to a cube */
    }
    let face: Awaited<ReturnType<typeof shapes.portrait>> = null;
    try {
      face = await shapes.portrait(n, r, 'me/portrait.webp');
    } catch {
      /* fall back to the ring */
    }
    const targets = [
      shapes.sphere(n, r),
      face?.points ?? shapes.torus(n, r),
      glyph ?? shapes.cube(n, r),
      shapes.ocean(n, r),
      shapes.helix(n, r),
      shapes.vortex(n, r),
      shapes.rings(n, r),
      shapes.galaxy(n, r),
    ];
    const random = new Float32Array(n * 4);
    for (let i = 0; i < random.length; i++) random[i] = r();

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(targets[0], 3));
    for (let i = 1; i < SHAPES; i++) g.setAttribute(`aP${i}`, new THREE.BufferAttribute(targets[i], 3));
    g.setAttribute('aRandom', new THREE.BufferAttribute(random, 4));
    g.setAttribute('aTone', new THREE.BufferAttribute(face?.tone ?? new Float32Array(n).fill(0.5), 1));
    this.geometry = g;

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(g, this.material);
    points.frustumCulled = false;
    this.spin.add(points);

    // far dust for depth
    const dn = this.count > 20000 ? 1400 : 600;
    const dp = new Float32Array(dn * 3);
    const dr = new Float32Array(dn * 4);
    for (let i = 0; i < dn; i++) {
      const a = r() * Math.PI * 2;
      const b = Math.acos(2 * r() - 1);
      const rad = 7 + r() * 16;
      dp[i * 3] = Math.sin(b) * Math.cos(a) * rad;
      dp[i * 3 + 1] = Math.sin(b) * Math.sin(a) * rad * 0.6;
      dp[i * 3 + 2] = Math.cos(b) * rad - 6;
      for (let k = 0; k < 4; k++) dr[i * 4 + k] = r();
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    dg.setAttribute('aRandom', new THREE.BufferAttribute(dr, 4));
    this.dustMaterial = new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      uniforms: {
        uTime: this.uniforms.uTime,
        uPixelRatio: this.uniforms.uPixelRatio,
        uColor: { value: new THREE.Color('#bfeee6') },
        uOpacity: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dg, this.dustMaterial);
    dust.frustumCulled = false;
    this.dustGroup.add(dust);

    // compile shaders before the first visible frame
    this.renderer.compile(this.scene, this.camera);
  }

  setDirection(dir: 'ltr' | 'rtl'): void {
    this.dir = dir === 'rtl' ? -1 : 1;
    this.applyState(0.01);
  }

  /** Particles rush in from deep space. */
  intro(delay = 0): void {
    if (this.reduced) return;
    gsap.fromTo(this.uniforms.uIntro, { value: 0 }, { value: 1, duration: 3.4, delay, ease: 'expo.out' });
  }

  goTo(next: SceneState): void {
    const prev = this.state.s;
    this.state = { s: next.s, x: next.x ?? 0, o: next.o ?? 1, sc: next.sc ?? 1 };
    const distance = Math.abs(next.s - prev);
    if (this.reduced) {
      this.uniforms.uMorph.value = next.s;
    } else if (distance > 0) {
      gsap.to(this.uniforms.uMorph, {
        value: next.s,
        duration: 1.9 + Math.min(distance - 1, 4) * 0.35,
        ease: 'power2.inOut',
        overwrite: true,
      });
    }
    const [a, b] = PALETTE[next.s] ?? PALETTE[0];
    const ca = new THREE.Color(a);
    const cb = new THREE.Color(b);
    const d = this.reduced ? 0 : 2;
    gsap.to(this.uniforms.uColorA.value, { r: ca.r, g: ca.g, b: ca.b, duration: d, ease: 'sine.inOut', overwrite: true });
    gsap.to(this.uniforms.uColorB.value, { r: cb.r, g: cb.g, b: cb.b, duration: d, ease: 'sine.inOut', overwrite: true });
    gsap.to(this.spinSpeed, { v: SPIN[next.s] ?? 0.08, duration: 2, overwrite: true });
    // a shape that must be read (the portrait) turns to face the camera instead of spinning
    this.facing = SPIN[next.s] === 0;
    if (this.facing) {
      const turn = Math.PI * 2;
      gsap.to(this.spin.rotation, { y: Math.round(this.spin.rotation.y / turn) * turn, duration: this.reduced ? 0 : 2.2, ease: 'power3.inOut', overwrite: true });
    } else {
      gsap.killTweensOf(this.spin.rotation);
    }
    this.applyState(this.reduced ? 0 : 2);
  }

  private applyState(duration: number): void {
    const wide = this.width >= 900;
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    const vw = vh * this.camera.aspect;
    const x = wide ? this.state.x * vw * this.dir : 0;
    const scale = this.state.sc * (wide ? 1 : 0.78);
    gsap.to(this.rig.position, { x, duration, ease: 'power3.inOut', overwrite: true });
    gsap.to(this.rig.scale, { x: scale, y: scale, z: scale, duration, ease: 'power3.inOut', overwrite: true });
    gsap.to(this.uniforms.uOpacity, { value: this.state.o * (wide || SPIN[this.state.s] === 0 ? 1 : 0.7), duration, overwrite: true });
  }

  anchor(offset: number): void {
    this.anchorY = Math.max(-1.3, Math.min(1.3, offset));
  }

  pointer(clientX: number, clientY: number): void {
    const x = (clientX / this.width) * 2 - 1;
    const y = -(clientY / this.height) * 2 + 1;
    this.mouseTarget.set(x, y);
    this.parallaxTarget.set(x, y);
  }

  pointerLeave(): void {
    this.mouseTarget.set(9, 9);
    this.parallaxTarget.set(0, 0);
  }

  velocity(v: number): void {
    this.velocityTarget = v;
  }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.width = w;
    this.height = h;
    const pr = Math.min(window.devicePixelRatio || 1, this.degraded ? 1 : 1.75);
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.uniforms.uPixelRatio.value = pr;
    this.uniforms.uAspect.value = w / h;
    this.applyState(0);
  }

  tick = (time: number, deltaMs: number): void => {
    if (!this.geometry) return;
    const dt = Math.min(deltaMs / 1000, 0.05);
    const u = this.uniforms;
    u.uTime.value = this.reduced ? time * 0.25 : time;

    const k = 1 - Math.pow(0.002, dt);
    const m = u.uMouse.value;
    if (this.mouseTarget.x > 5) m.copy(this.mouseTarget);
    else m.lerp(this.mouseTarget, k);
    this.parallax.lerp(this.parallaxTarget, 1 - Math.pow(0.05, dt));
    u.uVelocity.value += (this.velocityTarget - u.uVelocity.value) * Math.min(1, dt * 6);
    this.velocityTarget *= Math.pow(0.05, dt);

    // on phones the portrait scrolls with its slot instead of sitting behind the text
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    const y = this.facing && this.width < 900 ? this.anchorY * vh : 0;
    this.rig.position.y += (y - this.rig.position.y) * (this.reduced ? 1 : 1 - Math.pow(0.0005, dt));

    if (!this.reduced) {
      if (!this.facing) this.spin.rotation.y += dt * (this.spinSpeed.v + Math.min(Math.abs(u.uVelocity.value), 4) * 0.05);
      this.rig.rotation.x = this.parallax.y * -0.16;
      this.rig.rotation.y = this.parallax.x * 0.26;
      this.dustGroup.rotation.y += dt * 0.01;
      this.dustGroup.position.x = this.parallax.x * -0.4;
      this.dustGroup.position.y = this.parallax.y * -0.25;
    }

    this.renderer.render(this.scene, this.camera);
    this.watchPerformance(deltaMs);
  };

  /** Drops resolution and particle count once if the device struggles. */
  private watchPerformance(deltaMs: number): void {
    // only judge the first few seconds after the intro; ignore hitches from background tabs
    if (this.degraded || this.checks >= 4 || this.uniforms.uIntro.value < 0.98 || deltaMs > 250) return;
    this.frames.push(deltaMs);
    if (this.frames.length < 90) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames = [];
    this.checks++;
    if (avg > 24) {
      this.degraded = true;
      this.geometry.setDrawRange(0, Math.floor(this.count * 0.55));
      this.resize();
    }
  }
}

export function createStage(canvas: HTMLCanvasElement, reduced: boolean): Stage | null {
  try {
    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return null;
    return new Stage(canvas, reduced);
  } catch {
    return null;
  }
}
