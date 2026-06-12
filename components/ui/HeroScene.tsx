"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const CODE_SNIPPETS = [
  { text: "async fetchData()", top: "12%", left: "8%", dur: 4.2 },
  { text: "const [state]", top: "22%", left: "70%", dur: 5.1 },
  { text: "useEffect(()=>{})", top: "48%", left: "4%", dur: 3.4 },
  { text: ".map(item =>", top: "58%", left: "78%", dur: 5.8 },
  { text: "await Promise", top: "78%", left: "12%", dur: 4.7 },
  { text: "export default", top: "82%", left: "66%", dur: 3.9 },
];

// Écran du téléphone dessiné en canvas : fond sombre, triangle or du logo,
// wordmark et lignes d'interface stylisées.
function makeScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, 512, 1024);

  // Halo doré discret derrière le logo
  const halo = ctx.createRadialGradient(256, 400, 40, 256, 400, 320);
  halo.addColorStop(0, "rgba(232, 213, 168, 0.14)");
  halo.addColorStop(1, "rgba(232, 213, 168, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, 512, 1024);

  // Poinçon caméra
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(256, 38, 13, 0, Math.PI * 2);
  ctx.fill();

  // Triangle wireframe — clin d'œil au logo (même dessin que HeroLines)
  ctx.strokeStyle = "#E8D5A8";
  ctx.lineWidth = 5;
  ctx.lineJoin = "miter";
  const tx = (x: number) => 256 + (x - 50) * 4.4;
  const ty = (y: number) => 400 + (y - 52) * 4.4;
  ctx.beginPath();
  ctx.moveTo(tx(50), ty(8));
  ctx.lineTo(tx(10), ty(90));
  ctx.lineTo(tx(90), ty(90));
  ctx.closePath();
  ctx.moveTo(tx(50), ty(58));
  ctx.lineTo(tx(50), ty(8));
  ctx.moveTo(tx(50), ty(58));
  ctx.lineTo(tx(10), ty(90));
  ctx.moveTo(tx(50), ty(58));
  ctx.lineTo(tx(90), ty(90));
  ctx.stroke();

  // Wordmark
  ctx.fillStyle = "#F2EDE4";
  ctx.font = "700 44px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "14px";
  ctx.fillText("ARQDEV", 263, 660);

  // Lignes d'interface stylisées
  ctx.fillStyle = "rgba(242, 237, 228, 0.10)";
  const rr = (x: number, y: number, w: number, h: number) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, h / 2);
    ctx.fill();
  };
  rr(96, 760, 320, 14);
  rr(136, 800, 240, 14);
  ctx.fillStyle = "rgba(232, 213, 168, 0.5)";
  rr(196, 880, 120, 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // Environnement neutre pour les reflets métalliques (pas d'asset externe).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // ---- Téléphone premium : châssis or, dos laqué noir, écran allumé ----
    const phoneGroup = new THREE.Group();

    // Châssis (tranche or visible sur le pourtour)
    const frameGeom = new RoundedBoxGeometry(1.14, 2.26, 0.1, 5, 0.11);
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9b07e,
      metalness: 1,
      roughness: 0.28,
    });
    const frame = new THREE.Mesh(frameGeom, goldMat);

    // Corps noir laqué (légèrement plus épais : faces avant/arrière noires)
    const bodyGeom = new RoundedBoxGeometry(1.1, 2.22, 0.12, 5, 0.09);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0c,
      metalness: 0.55,
      roughness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);

    // Écran (texture canvas, non éclairé = lumineux comme un vrai écran)
    const screenTexture = makeScreenTexture();
    const screenGeom = new THREE.PlaneGeometry(0.98, 2.06);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.z = 0.0615;

    // Module caméra au dos (visible quand le téléphone tourne)
    const camGroup = new THREE.Group();
    const camPlateGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.025, 32);
    const camPlate = new THREE.Mesh(camPlateGeom, goldMat);
    camPlate.rotation.x = Math.PI / 2;
    const lensGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.03, 24);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x05050a,
      metalness: 0.2,
      roughness: 0.05,
      clearcoat: 1,
    });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.z = -0.012;
    camGroup.add(camPlate, lens);
    camGroup.position.set(-0.3, 0.82, -0.062);
    camGroup.rotation.y = Math.PI; // orienté vers l'arrière

    phoneGroup.add(frame, body, screen, camGroup);
    scene.add(phoneGroup);

    // Lumières : key froide + rim dorée pour accrocher la tranche
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    const key = new THREE.DirectionalLight(0xfff4e0, 1.6);
    key.position.set(2.5, 2, 4);
    const rim = new THREE.PointLight(0xe8d5a8, 14, 12);
    rim.position.set(-2.5, -1, 2.5);
    scene.add(ambient, key, rim);

    // Orbit ring 1
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.006, 2, 120),
      new THREE.MeshBasicMaterial({
        color: 0xe8d5a8,
        transparent: true,
        opacity: 0.4,
      }),
    );
    scene.add(ring1);

    // Orbit ring 2 (tilted)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.004, 2, 120),
      new THREE.MeshBasicMaterial({
        color: 0x8a7855,
        transparent: true,
        opacity: 0.3,
      }),
    );
    ring2.rotation.x = Math.PI * 0.35;
    scene.add(ring2);

    // 8 small spheres orbiting on ring1
    const orbitSpheres: { mesh: THREE.Mesh; speed: number; angle: number }[] = [];
    const sphereGeom = new THREE.SphereGeometry(0.025, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xe8d5a8,
      transparent: true,
      opacity: 0.6,
    });
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(sphereGeom, sphereMat);
      const angle = (i / 8) * Math.PI * 2;
      orbitSpheres.push({ mesh: s, speed: 0.004 * (i + 1) * 0.3, angle });
      scene.add(s);
    }

    // Particle system — paper + signal accent groups
    const totalParticles = isMobile ? 150 : 600;
    const whiteCount = Math.round(totalParticles * (520 / 600));
    const goldCount = totalParticles - whiteCount;

    const makeParticles = (count: number, spread: number) => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geom;
    };

    const whitePoints = new THREE.Points(
      makeParticles(whiteCount, 7),
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.012,
        transparent: true,
        opacity: 0.3,
        sizeAttenuation: true,
      }),
    );
    const goldPoints = new THREE.Points(
      makeParticles(goldCount, 7),
      new THREE.PointsMaterial({
        color: 0x8a7855,
        size: 0.018,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    );
    scene.add(whitePoints, goldPoints);

    // Grid floor
    const grid = new THREE.GridHelper(8, 20, 0xf2ede4, 0x2a2a2e);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.15;
    grid.position.y = -2;
    scene.add(grid);

    // Mouse rotation — track cursor over canvas (normalized 0→1)
    let mouseX = 0.5;
    let mouseY = 0.5;
    let isHover = false;
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      isHover = true;
    };
    const onPointerLeave = () => {
      isHover = false;
    };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    // Animation loop
    let rafId = 0;
    const timer = new THREE.Timer();
    const animate = () => {
      timer.update();
      const t = timer.getElapsed();

      phoneGroup.position.y = Math.sin(t * 0.6) * 0.08;

      // Target rotation: mouse-driven when hovering, gentle sine float otherwise
      const targetRotY = isHover
        ? (mouseX - 0.5) * 1.6
        : Math.sin(t * 0.4) * 0.16;
      const targetRotX = isHover
        ? (mouseY - 0.5) * -1.0
        : Math.sin(t * 0.3) * 0.05;
      // Smooth lerp for damped response
      phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.08;
      phoneGroup.rotation.x += (targetRotX - phoneGroup.rotation.x) * 0.08;

      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;
      ring2.rotation.y += 0.001;

      for (const s of orbitSpheres) {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * 1.8;
        s.mesh.position.y = Math.sin(s.angle) * 1.8;
      }

      whitePoints.rotation.y += 0.0008;
      whitePoints.rotation.x += 0.0003;
      goldPoints.rotation.y += 0.0008;
      goldPoints.rotation.x += 0.0003;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      pmrem.dispose();
      envTexture.dispose();
      frameGeom.dispose();
      bodyGeom.dispose();
      screenGeom.dispose();
      screenTexture.dispose();
      camPlateGeom.dispose();
      lensGeom.dispose();
      goldMat.dispose();
      bodyMat.dispose();
      screenMat.dispose();
      lensMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      (ring1.geometry as THREE.BufferGeometry).dispose();
      (ring1.material as THREE.Material).dispose();
      (ring2.geometry as THREE.BufferGeometry).dispose();
      (ring2.material as THREE.Material).dispose();
      (whitePoints.geometry as THREE.BufferGeometry).dispose();
      (whitePoints.material as THREE.Material).dispose();
      (goldPoints.geometry as THREE.BufferGeometry).dispose();
      (goldPoints.material as THREE.Material).dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full"
      aria-hidden
      style={{ minHeight: "400px" }}
    >
      {!isMobile &&
        CODE_SNIPPETS.map((s, i) => (
          <span
            key={i}
            className="absolute pointer-events-none select-none hero-code-snippet"
            style={{
              top: s.top,
              left: s.left,
              fontFamily: "var(--font-space-mono), ui-monospace, monospace",
              fontSize: "9px",
              color: "rgba(242, 237, 228, 0.4)",
              whiteSpace: "nowrap",
              animation: `hero-code-float ${s.dur}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          >
            {s.text}
          </span>
        ))}
    </div>
  );
}
