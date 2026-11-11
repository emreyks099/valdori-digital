import * as THREE from "three";

/**
 * AÇIKLIK — hero sahnesi.
 * İki obsidyen blok bir "V" açıklığı oluşturur; aralarındaki kor çizgisi tutuşur ve
 * ışık blokların iç yüzeylerini sıyırarak formu ortaya çıkarır.
 * Bilinçli olarak hafif: gölge yok, post-processing yok, ~12 mesh, 3 ışık.
 */

export type HeroSceneOptions = {
  reducedMotion: boolean;
  /** Dar ekranlarda parçacık ve piksel yoğunluğu düşürülür */
  compact: boolean;
  onReady?: () => void;
};

const EMBER = 0xff6828;

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 128, 0, 32, 128, 128);
  grad.addColorStop(0, "rgba(255,150,90,0.9)");
  grad.addColorStop(0.18, "rgba(255,104,40,0.42)");
  grad.addColorStop(0.5, "rgba(255,90,30,0.1)");
  grad.addColorStop(1, "rgba(255,90,30,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Yansımalar için küçük bir ortam: sıcak bir şerit + soğuk bir dolgu */
function buildEnvironment(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x020203);
  const warm = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 14),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(EMBER).multiplyScalar(5) }),
  );
  warm.position.set(0, 2, 6);
  warm.lookAt(0, 0, 0);
  env.add(warm);
  const cool = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 6),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0x8a94a8).multiplyScalar(0.55) }),
  );
  cool.position.set(-8, 9, -4);
  cool.lookAt(0, 0, 0);
  env.add(cool);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(env, 0.04);
  pmrem.dispose();
  warm.geometry.dispose();
  (warm.material as THREE.Material).dispose();
  cool.geometry.dispose();
  (cool.material as THREE.Material).dispose();
  return target;
}

export function mountHeroScene(canvas: HTMLCanvasElement, opts: HeroSceneOptions) {
  const host = canvas.parentElement!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const maxDpr = opts.compact ? 1.5 : 1.75;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x09090b, 0.045);
  const envTarget = buildEnvironment(renderer);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  const camBase = new THREE.Vector3(0, 0.4, 12.5);
  const look = new THREE.Vector3(0, 1.9, 0);

  const obsidian = new THREE.MeshStandardMaterial({
    color: 0x17171a,
    roughness: 0.62,
    metalness: 0.3,
  });
  const basalt = new THREE.MeshStandardMaterial({
    color: 0x0c0c0e,
    roughness: 0.7,
    metalness: 0.4,
  });

  // Ana bloklar — pivotları tabanda; yukarı doğru açılırlar
  const rig = new THREE.Group();
  scene.add(rig);
  const slabGeo = new THREE.BoxGeometry(3.6, 16, 3.6);
  slabGeo.translate(0, 8, 0);
  const left = new THREE.Mesh(slabGeo, obsidian);
  const right = new THREE.Mesh(slabGeo, obsidian);
  const LEAN = 0.24;
  const GAP = 2.05;
  left.position.set(-GAP, -3.2, 0);
  right.position.set(GAP, -3.2, 0);
  left.rotation.set(0, 0.62, LEAN);
  right.rotation.set(0, -0.62, -LEAN);
  rig.add(left, right);

  // Arka plan: sisin içinde kaybolan ikincil bloklar
  const backGeo = new THREE.BoxGeometry(1, 1, 1);
  backGeo.translate(0, 0.5, 0);
  const backs: [number, number, number, number, number][] = [
    [-7.5, -9, 2.2, 9, 0.06],
    [7.8, -11, 2.6, 12, -0.05],
    [-13, -18, 3.4, 15, 0.03],
    [13.5, -20, 3, 17, -0.02],
    [-3.6, -24, 2, 20, 0.02],
    [4.2, -27, 2.4, 22, -0.03],
  ];
  for (const [x, z, w, h, rz] of backs) {
    const m = new THREE.Mesh(backGeo, basalt);
    m.position.set(x, -3.2, z);
    m.scale.set(w, h, w);
    m.rotation.z = rz;
    m.rotation.y = x * 0.05;
    rig.add(m);
  }

  // Zemin: ışığın uzayan yansımasını taşır
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.62, metalness: 0.55 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.2;
  rig.add(floor);

  // Kor çizgisi
  const bladeGeo = new THREE.BoxGeometry(0.035, 12, 0.035);
  bladeGeo.translate(0, 6, 0);
  const bladeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(EMBER).multiplyScalar(3.2) });
  const blade = new THREE.Mesh(bladeGeo, bladeMat);
  blade.position.set(0, -3.2, 0.2);
  rig.add(blade);

  const glowTex = glowTexture();
  const glowMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.85,
  });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 15), glowMat);
  glow.position.set(0, 3, 0.25);
  rig.add(glow);
  const floorGlow = new THREE.Mesh(new THREE.PlaneGeometry(9, 16), glowMat.clone());
  floorGlow.rotation.x = -Math.PI / 2;
  floorGlow.position.set(0, -3.18, 4);
  (floorGlow.material as THREE.MeshBasicMaterial).opacity = 0.35;
  rig.add(floorGlow);

  // Işıklar
  const keyLow = new THREE.PointLight(EMBER, 0, 30, 1.6);
  keyLow.position.set(0, 1.6, 5.5);
  const keyHigh = new THREE.PointLight(0xff7a3a, 0, 34, 1.6);
  keyHigh.position.set(0, 7.5, 6);
  const rim = new THREE.DirectionalLight(0x9aa6bd, 1.3);
  rim.position.set(-6, 9, -7);
  const fill = new THREE.AmbientLight(0x404858, 0.18);
  rig.add(keyLow, keyHigh, rim, fill);

  // Kıvılcım tozu
  const COUNT = opts.compact ? 110 : 260;
  const pos = new Float32Array(COUNT * 3);
  const speed = new Float32Array(COUNT);
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = rand(-5, 5) * Math.pow(Math.random(), 1.6);
    pos[i * 3 + 1] = rand(-3, 9);
    pos[i * 3 + 2] = rand(-2, 5);
    speed[i] = rand(0.08, 0.34);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffa066,
    size: 0.045,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  rig.add(dust);

  // ---- durum ----
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollP = 0;
  let ignite = opts.reducedMotion ? 1 : 0;
  let running = false;
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;
  let ready = false;

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr) * quality);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    // Dikey ekranlarda bloklar kadrajda kalsın diye kamera geri çekilir
    const portrait = aspect < 1;
    camera.fov = portrait ? 40 : 30;
    camBase.z = portrait ? 15.5 : 12.5;
    camBase.y = portrait ? 1.6 : 0.4;
    look.y = portrait ? 3.4 : 1.9;
    camera.updateProjectionMatrix();
    if (!running) draw(0);
  };

  const draw = (dt: number) => {
    elapsed += dt;
    if (!opts.reducedMotion && ignite < 1) {
      ignite = Math.min(1, ignite + dt / 2.6);
    }
    // Tutuşma: önce titrek, sonra kararlı
    const e = 1 - Math.pow(1 - ignite, 3);
    const flicker = ignite < 1 ? 0.82 + 0.18 * Math.sin(elapsed * 38) * (1 - ignite) : 1;
    const breathe = 1 + Math.sin(elapsed * 0.7) * 0.06;
    const power = e * flicker * breathe;

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    blade.scale.y = Math.max(0.0001, e);
    bladeMat.color.setHex(EMBER).multiplyScalar(1.4 + 2.2 * power);
    glowMat.opacity = 0.85 * power;
    (floorGlow.material as THREE.MeshBasicMaterial).opacity = 0.32 * power;
    keyLow.intensity = 90 * power;
    keyHigh.intensity = 120 * power;
    keyLow.position.x = pointer.x * 1.4;
    keyHigh.position.x = pointer.x * 2.2;
    keyHigh.position.y = 7.5 + pointer.y * 1.6;
    dustMat.opacity = 0.75 * e;

    // Kaydırma: bloklar aralanır, kamera açıklığa doğru ilerler
    const spread = scrollP * 1.15;
    left.position.x = -GAP - spread;
    right.position.x = GAP + spread;
    left.rotation.z = LEAN + scrollP * 0.07;
    right.rotation.z = -LEAN - scrollP * 0.07;
    camera.position.set(
      camBase.x + pointer.x * 0.9,
      camBase.y - pointer.y * 0.35 + scrollP * 1.2,
      camBase.z - scrollP * 4.2,
    );
    camera.lookAt(look.x + pointer.x * 0.25, look.y + scrollP * 0.8, 0);

    if (dt > 0) {
      const arr = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += speed[i] * dt;
        arr[i * 3] += Math.sin(elapsed * 0.4 + i) * 0.0009;
        if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -3;
      }
      dustGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };

  // Uyarlanabilir kalite: kare süresi uzarsa önce çözünürlük düşer; yine de
  // yetişemeyen cihazlarda döngü durur ve sahne statik kareye geçer.
  let quality = 1;
  let frames = 0;
  let slowSum = 0;
  let staticMode = false;

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const raw = (now - last) / 1000;
    const dt = Math.min(0.05, raw);
    last = now;
    draw(dt);

    frames++;
    slowSum += Math.min(raw, 0.5);
    if (frames >= 12) {
      const avg = slowSum / frames;
      frames = 0;
      slowSum = 0;
      if (avg > 0.12) {
        // Yazılımsal render ya da çok zayıf GPU: doğrudan statik kare
        staticMode = true;
        ignite = 1;
        stop();
        draw(0);
      } else if (avg > 0.042) {
        if (quality > 0.55) {
          quality *= 0.75;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr) * quality);
          renderer.setSize(host.clientWidth, host.clientHeight, false);
        } else if (avg > 0.075) {
          staticMode = true;
          ignite = 1;
          stop();
          draw(0);
        }
      }
    }
  };

  const start = () => {
    if (running || opts.reducedMotion || staticMode) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const onPointer = (ev: PointerEvent) => {
    if (ev.pointerType === "touch") return;
    pointer.tx = (ev.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (ev.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    const h = host.clientHeight || 1;
    scrollP = Math.min(1, Math.max(0, window.scrollY / h));
    if (opts.reducedMotion || staticMode) draw(0);
  };
  const onVisibility = () => {
    if (document.hidden) stop();
    else if (visible) start();
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !document.hidden) start();
    else stop();
  });
  io.observe(host);
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  onScroll();
  draw(0);
  start();

  return () => {
    stop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose?.();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose?.();
    });
    glowTex.dispose();
    envTarget.dispose();
    renderer.dispose();
  };
}
