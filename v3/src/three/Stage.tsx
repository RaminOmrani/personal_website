import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { copy } from '../data/copy';
import { auroraFragment, auroraVertex, screenFragment, screenVertex } from './shaders';
import { keyboardTexture, plate, slab } from './geometry';
import { beats, clamp01, damp, easeInOut, easeOut, film, lerp, range, smooth, stepped } from './film';

/* ---------- dimensions (world units; the laptop is 3.3 wide) ---------- */

const LAPTOP = { w: 3.3, depth: 2.25, t: 0.1, lidH: 2.15, lidT: 0.05, screenW: 3.06, screenH: 1.9125 };
const TABLET = { w: 2.5, h: 1.66, d: 0.07, screenW: 2.3, screenH: 1.4375 };
const PHONE = { w: 0.98, h: 2.02, d: 0.095, screenW: 0.9, screenH: 1.95 };

const LID_OPEN = -0.2;
const LID_CLOSED = 1.5;

/** sRGB hex → raw vec3 (the shaders write sRGB directly). */
const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const palettes = {
  // a Persian dawn: lapis, turquoise and saffron light on ivory
  base: rgb('#F6F4EF'),
  hero: [rgb('#7EA0F0'), rgb('#F4C47C'), rgb('#72D5CA')],
  sites: [rgb('#6CC8E8'), rgb('#86A6F2'), rgb('#8FE3C8')],
  app: [rgb('#F4C47C'), rgb('#72D5CA'), rgb('#96B2F3')],
};

const TABLET_SRC = 'work/crm-calendar.jpg';
// the screens are the same on both pages
const { sites, app } = copy.fa;
const URLS = [...sites.items.map((s) => s.screen), TABLET_SRC, ...app.screens.map((s) => s.screen)];

/* ---------- layout presets by viewport shape ---------- */

/**
 * `m` is 1 on the right-to-left page and -1 on the left-to-right one: the whole composition
 * is mirrored across the centre line (x and the turns about y and z flip sign), so the devices
 * always gather around the portrait at the inline end and leave the headline side clear.
 */
function layout(aspect: number, m: 1 | -1) {
  // 0 = tall phone, 1 = wide desktop
  const k = clamp01((aspect - 0.62) / (1.45 - 0.62));
  return {
    m,
    fov: lerp(40, 30, k),
    cluster: new THREE.Vector3(m * lerp(0, -2.05, k), lerp(-1.35, 0, k), 0),
    heroCam: new THREE.Vector3(0, lerp(0.2, 0.55, k), lerp(13.6, 10.4, k)),
    heroLook: new THREE.Vector3(0, lerp(0.55, 0.3, k), 0),
    phone: new THREE.Vector3(m * lerp(0, -1.35, k), lerp(-0.42, 0, k), 0),
    phoneFill: lerp(0.5, 0.72, k),
    wide: k > 0.5,
    // hero poses: the portrait stands left of centre (right of it in English), so the devices gather around it
    heroLap: { pos: new THREE.Vector3(m * lerp(-1.45, -4.05, k), lerp(-2.75, 0.45, k), lerp(-1.8, -1.6, k)), ry: m * lerp(0.4, 0.6, k), scale: lerp(0.6, 0.86, k) },
    heroTab: { pos: new THREE.Vector3(m * lerp(6, -4.6, k), lerp(0.2, -1.75, k), -2.6), ry: m * lerp(-0.35, 0.5, k) },
    heroPhone: { pos: new THREE.Vector3(m * lerp(1.55, -0.45, k), lerp(-2.6, -1.1, k), lerp(1.2, 1.2, k)), ry: m * lerp(-0.3, -0.42, k), scale: lerp(0.58, 0.76, k) },
  };
}

function useScreens() {
  const textures = useLoader(THREE.TextureLoader, URLS);
  useMemo(() => {
    for (const t of textures) {
      t.colorSpace = THREE.NoColorSpace; // raw sRGB in, raw sRGB out
      t.anisotropy = 8;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.needsUpdate = true;
    }
  }, [textures]);
  return {
    sites: textures.slice(0, sites.items.length),
    tablet: textures[sites.items.length],
    phone: textures.slice(sites.items.length + 1),
  };
}

function screenMaterial(w: number, h: number, radius: number, tex: THREE.Texture, aspect: number) {
  return new THREE.ShaderMaterial({
    vertexShader: screenVertex,
    fragmentShader: screenFragment,
    transparent: true,
    uniforms: {
      uA: { value: tex },
      uB: { value: tex },
      uAspA: { value: aspect },
      uAspB: { value: aspect },
      uMix: { value: 0 },
      uTime: { value: 0 },
      uPower: { value: 0 },
      uSize: { value: new THREE.Vector2(w, h) },
      uRadius: { value: radius },
      uGlow: { value: rgb('#8CE8DC') },
    },
  });
}

function Scene({ onReady, mirror }: { onReady: () => void; mirror: boolean }) {
  const { camera, size, clock } = useThree();
  const tex = useScreens();

  const laptop = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const tablet = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const laptopScreen = useRef<THREE.Mesh>(null);

  const smooth2 = useRef({ px: 0, py: 0 });
  const L = useMemo(() => layout(size.width / size.height, mirror ? -1 : 1), [size.width, size.height, mirror]);
  const tmp = useMemo(
    () => ({
      v: new THREE.Vector3(),
      n: new THREE.Vector3(),
      cam: new THREE.Vector3(),
      look: new THREE.Vector3(),
      pos: new THREE.Vector3(),
      lk: new THREE.Vector3(),
      appCam: new THREE.Vector3(),
      appLook: new THREE.Vector3(),
      q: new THREE.Quaternion(),
    }),
    [],
  );

  const mats = useMemo(() => {
    const alu = new THREE.MeshPhysicalMaterial({ color: '#dfe2ea', metalness: 0.92, roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.25, envMapIntensity: 1.15 });
    const phoneBody = new THREE.MeshPhysicalMaterial({ color: '#c9ced9', metalness: 1, roughness: 0.22, clearcoat: 0.6, envMapIntensity: 1.2 });
    const glass = new THREE.MeshPhysicalMaterial({ color: '#07080b', metalness: 0.1, roughness: 0.08, clearcoat: 1, envMapIntensity: 1.4 });
    const black = new THREE.MeshBasicMaterial({ color: '#050608' });
    const deck = new THREE.MeshStandardMaterial({ map: keyboardTexture(), metalness: 0.55, roughness: 0.45, envMapIntensity: 0.9 });
    const aurora = new THREE.ShaderMaterial({
      vertexShader: auroraVertex,
      fragmentShader: auroraFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2() },
        uBase: { value: palettes.base.clone() },
        uC1: { value: palettes.hero[0].clone() },
        uC2: { value: palettes.hero[1].clone() },
        uC3: { value: palettes.hero[2].clone() },
        uIntensity: { value: 1 },
        uFlip: { value: mirror ? 1 : 0 },
      },
    });
    return {
      alu,
      phoneBody,
      glass,
      black,
      deck,
      aurora,
      laptopScreen: screenMaterial(LAPTOP.screenW, LAPTOP.screenH, 0.035, tex.sites[0], 800 / 1280),
      tabletScreen: screenMaterial(TABLET.screenW, TABLET.screenH, 0.05, tex.tablet, 800 / 1280),
      phoneScreen: screenMaterial(PHONE.screenW, PHONE.screenH, 0.12, tex.phone[1], app.screens[1].aspect),
    };
  }, [tex, mirror]);

  const geo = useMemo(
    () => ({
      base: slab(LAPTOP.w, LAPTOP.depth, LAPTOP.t, 0.14, 0.02),
      lid: slab(LAPTOP.w, LAPTOP.lidH, LAPTOP.lidT, 0.14, 0.012),
      bezel: plate(LAPTOP.w - 0.06, LAPTOP.lidH - 0.06, 0.12),
      laptopScreen: new THREE.PlaneGeometry(LAPTOP.screenW, LAPTOP.screenH),
      deck: new THREE.PlaneGeometry(LAPTOP.w - 0.16, LAPTOP.depth - 0.16),
      tablet: slab(TABLET.w, TABLET.h, TABLET.d, 0.16, 0.014),
      tabletGlass: plate(TABLET.w - 0.05, TABLET.h - 0.05, 0.13),
      tabletScreen: new THREE.PlaneGeometry(TABLET.screenW, TABLET.screenH),
      phone: slab(PHONE.w, PHONE.h, PHONE.d, 0.17, 0.018),
      phoneGlass: plate(PHONE.w - 0.035, PHONE.h - 0.035, 0.15),
      phoneScreen: new THREE.PlaneGeometry(PHONE.screenW, PHONE.screenH),
      island: plate(0.27, 0.078, 0.039),
    }),
    [],
  );

  useEffect(() => {
    film.bootAt = clock.elapsedTime;
    onReady();
    return () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [clock, geo, mats, onReady]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = film.p;
    const reduced = film.reduced;

    // pointer, softened
    const sp = smooth2.current;
    sp.px = damp(sp.px, film.pointerX, 3, dt);
    sp.py = damp(sp.py, film.pointerY, 3, dt);

    // the page-load moment: devices rise into place and the lid opens
    const since = film.bootAt < 0 ? 0 : t - film.bootAt;
    const rise = reduced ? 1 : easeOut(range(since, 0, 1.4));
    const open = reduced ? 1 : easeInOut(range(since, 0.15, 1.5));
    const power = reduced ? 1 : smooth(range(since, 1.0, 1.7));

    // beats
    const dive = easeInOut(range(p, ...beats.dive));
    const exit = easeInOut(range(p, ...beats.exit));
    const phoneIn = easeOut(range(p, ...beats.phoneIn));
    const end = easeInOut(range(p, ...beats.end));
    const siteStep = stepped(p, beats.sites, sites.items.length);
    const appStep = stepped(p, beats.screens, app.screens.length);
    const calm = 1 - dive; // float + parallax only while in the hero

    /* ---- aurora ---- */
    const u = mats.aurora.uniforms;
    u.uTime.value = t;
    u.uRes.value.set(size.width, size.height);
    u.uPointer.value.set(sp.px * L.m, sp.py); // the fields are mirrored, the pointer is not
    const wSites = range(p, 0.08, 0.24) * (1 - range(p, 0.6, 0.7));
    const wApp = range(p, 0.62, 0.72);
    for (const [k, i] of [['uC1', 0], ['uC2', 1], ['uC3', 2]] as const) {
      const c = u[k].value as THREE.Vector3;
      c.copy(palettes.hero[i]).lerp(palettes.sites[i], wSites).lerp(palettes.app[i], wApp);
    }

    /* ---- laptop ---- */
    const lap = laptop.current!;
    const float = Math.sin(t * 0.8) * 0.05 * calm * (reduced ? 0 : 1);
    const hl = L.heroLap;
    lap.position.set(lerp(hl.pos.x, 0, dive), lerp(hl.pos.y, -0.9, dive) + float - (1 - rise) * 0.6 - exit * 4.2, lerp(hl.pos.z, 0, dive));
    lap.rotation.set(lerp(0.12, 0, dive) + sp.py * 0.05 * calm + exit * 0.5, lerp(hl.ry, 0, dive) + sp.px * 0.14 * calm, 0);
    const lapScale = lerp(hl.scale * lerp(0.94, 1, rise), 1, dive);
    lap.scale.setScalar(lapScale);
    lid.current!.rotation.x = lerp(LID_CLOSED, LID_OPEN, open) + exit * 1.1;

    const ls = mats.laptopScreen.uniforms;
    const si = Math.min(Math.floor(siteStep), tex.sites.length - 2);
    ls.uA.value = tex.sites[si];
    ls.uB.value = tex.sites[si + 1];
    ls.uMix.value = siteStep - si;
    ls.uTime.value = t;
    ls.uPower.value = power * (1 - exit * 0.9);

    /* ---- tablet ---- */
    const tab = tablet.current!;
    const off = dive;
    const ht = L.heroTab;
    const m = L.m;
    tab.position.set(ht.pos.x - m * off * 6, ht.pos.y + Math.sin(t * 0.7 + 1.3) * 0.06 * calm + off * 2.5 - (1 - rise) * 0.8, ht.pos.z - off * 3);
    tab.rotation.set(0.1 + sp.py * 0.05, ht.ry + sp.px * 0.12 + m * off * 1.2, m * (0.05 + off * 0.6));
    tab.visible = off < 0.999 && L.wide;
    mats.tabletScreen.uniforms.uPower.value = power;

    /* ---- phone ---- */
    const ph = phone.current!;
    const hp = L.heroPhone;
    const flyOff = dive;
    const inPos = tmp.v.set(L.phone.x, L.phone.y - 4.6, 0).lerp(L.phone, phoneIn);
    const pinned = p >= beats.phoneIn[0];
    const sway = (i: number) => m * (L.wide ? (i % 2 === 0 ? -0.2 : 0.18) : i % 2 === 0 ? -0.12 : 0.12);
    const ai = Math.min(Math.floor(appStep), app.screens.length - 2);
    const yaw = lerp(sway(ai), sway(ai + 1), appStep - ai);
    if (!pinned) {
      ph.position.set(hp.pos.x + m * flyOff * 4.5, hp.pos.y + Math.sin(t * 0.9 + 2.1) * 0.07 * calm - flyOff * 4 - (1 - rise) * 1, hp.pos.z + flyOff * 2);
      ph.rotation.set(0.04 + sp.py * 0.06, hp.ry + sp.px * 0.16 - m * flyOff * 1.4, m * (-0.07 - flyOff * 0.8));
      ph.scale.setScalar(lerp(hp.scale, 1, flyOff));
    } else {
      ph.scale.setScalar(1);
      ph.position.set(inPos.x, inPos.y + end * 4.8, inPos.z);
      ph.rotation.set(lerp(0.5, 0.02, phoneIn), lerp(-1.4 * m, yaw, phoneIn), lerp(0.25 * m, 0, phoneIn));
    }
    ph.visible = pinned || flyOff < 0.999;

    const ps = mats.phoneScreen.uniforms;
    if (!pinned) {
      ps.uA.value = ps.uB.value = tex.phone[1];
      ps.uAspA.value = ps.uAspB.value = app.screens[1].aspect;
      ps.uMix.value = 0;
    } else {
      ps.uA.value = tex.phone[ai];
      ps.uB.value = tex.phone[ai + 1];
      ps.uAspA.value = app.screens[ai].aspect;
      ps.uAspB.value = app.screens[ai + 1].aspect;
      ps.uMix.value = appStep - ai;
    }
    ps.uTime.value = t;
    ps.uPower.value = power;

    /* ---- camera ---- */
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - L.fov) > 0.01) {
      cam.fov = L.fov;
      cam.updateProjectionMatrix();
    }
    const aspect = size.width / size.height;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));

    // in front of the laptop screen, far enough that it just fits the frame
    lap.updateMatrixWorld(true);
    const scr = laptopScreen.current!;
    scr.getWorldPosition(tmp.look);
    scr.getWorldQuaternion(tmp.q);
    tmp.n.set(0, 0, 1).applyQuaternion(tmp.q);
    const fitW = (LAPTOP.screenW * lapScale * 0.5 * 1.03) / (tanHalf * aspect);
    const fitH = (LAPTOP.screenH * lapScale * 0.5 * 1.05) / tanHalf;
    const diveDist = reduced ? Math.max(fitW, fitH) * 1.6 : Math.max(fitW, fitH);
    const diveCam = tmp.cam.copy(tmp.look).addScaledVector(tmp.n, diveDist);

    const appDist = (PHONE.h * 0.5) / L.phoneFill / tanHalf;
    const appCam = tmp.appCam.set(L.phone.x * 0.25, L.phone.y + 0.1, appDist);
    const appLook = tmp.appLook.set(L.phone.x * 0.25, L.phone.y + 0.05, 0);

    const pos = tmp.pos.copy(L.heroCam).lerp(diveCam, dive).lerp(appCam, exit);
    const look = tmp.lk.copy(L.heroLook).lerp(tmp.look, dive).lerp(appLook, exit);
    // a slow drift keeps held shots alive
    if (!reduced) {
      pos.x += Math.sin(t * 0.35) * 0.04 * (1 - calm);
      pos.y += Math.cos(t * 0.3) * 0.03 * (1 - calm);
    }
    cam.position.copy(pos);
    cam.lookAt(look);
  });

  const { lidH, lidT } = LAPTOP;
  return (
    <>
      <mesh renderOrder={-1} frustumCulled={false} material={mats.aurora}>
        <planeGeometry args={[2, 2]} />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 7, 6]} intensity={1.5} />
      <directionalLight position={[-6, 2, 4]} intensity={0.55} color="#cdd6ff" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#eef0f6']} />
        <Lightformer form="rect" intensity={3} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#dfe6ff" />
        <Lightformer form="rect" intensity={2.4} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#ffe9f3" />
        <Lightformer form="ring" intensity={1.5} position={[0, 1, -6]} scale={4} color="#ffffff" />
      </Environment>

      {/* laptop: base + hinged lid */}
      <group ref={laptop}>
        <mesh geometry={geo.base} material={mats.alu} rotation-x={-Math.PI / 2} position-y={LAPTOP.t / 2} />
        <mesh geometry={geo.deck} material={mats.deck} rotation-x={-Math.PI / 2} position={[0, LAPTOP.t + 0.001, 0]} />
        <group ref={lid} position={[0, LAPTOP.t, -LAPTOP.depth / 2 + 0.03]}>
          <mesh geometry={geo.lid} material={mats.alu} position={[0, lidH / 2, -lidT / 2]} />
          <mesh geometry={geo.bezel} material={mats.glass} position={[0, lidH / 2, 0.002]} />
          <mesh ref={laptopScreen} geometry={geo.laptopScreen} material={mats.laptopScreen} position={[0, lidH / 2 + 0.04, 0.004]} />
          <mesh position={[0, lidH - 0.06, 0.004]} material={mats.black}>
            <circleGeometry args={[0.012, 16]} />
          </mesh>
        </group>
      </group>

      <group ref={tablet}>
        <mesh geometry={geo.tablet} material={mats.alu} />
        <mesh geometry={geo.tabletGlass} material={mats.glass} position-z={TABLET.d / 2 + 0.001} />
        <mesh geometry={geo.tabletScreen} material={mats.tabletScreen} position-z={TABLET.d / 2 + 0.003} />
      </group>

      <group ref={phone}>
        <mesh geometry={geo.phone} material={mats.phoneBody} />
        <mesh geometry={geo.phoneGlass} material={mats.glass} position-z={PHONE.d / 2 + 0.001} />
        <mesh geometry={geo.phoneScreen} material={mats.phoneScreen} position-z={PHONE.d / 2 + 0.003} />
        <mesh geometry={geo.island} material={mats.black} position={[0, PHONE.screenH / 2 - 0.075, PHONE.d / 2 + 0.005]} />
      </group>
    </>
  );
}

/** The 3D stage. Mounted client-side only, after the page is already readable. */
export default function Stage({ active, onReady, mirror = false }: { active: boolean; onReady: () => void; mirror?: boolean }) {
  return (
    <Canvas
      className="stage-canvas"
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0.5, 10] }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene onReady={onReady} mirror={mirror} />
      </Suspense>
    </Canvas>
  );
}
