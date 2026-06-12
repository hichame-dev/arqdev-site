"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const CODE_SNIPPETS = [
  { text: "async fetchData()", top: "12%", left: "8%", dur: 4.2 },
  { text: "const [state]", top: "22%", left: "70%", dur: 5.1 },
  { text: "useEffect(()=>{})", top: "48%", left: "4%", dur: 3.4 },
  { text: ".map(item =>", top: "58%", left: "78%", dur: 5.8 },
  { text: "await Promise", top: "78%", left: "12%", dur: 4.7 },
  { text: "export default", top: "82%", left: "66%", dur: 3.9 },
];

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
    mount.appendChild(renderer.domElement);

    // Phone — wireframe hologram + solid inner + screen glow
    const phoneGroup = new THREE.Group();
    const phoneGeom = new RoundedBoxGeometry(1.1, 2.2, 0.12, 4, 0.09);

    const phoneWire = new THREE.Mesh(
      phoneGeom,
      new THREE.MeshBasicMaterial({
        color: 0xf2ede4,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    );
    const phoneSolid = new THREE.Mesh(
      phoneGeom,
      new THREE.MeshBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0.7,
      }),
    );
    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 1.6),
      new THREE.MeshBasicMaterial({
        color: 0x4d4d4d,
        transparent: true,
        opacity: 0.08,
      }),
    );
    screenGlow.position.z = 0.07;
    phoneGroup.add(phoneWire, phoneSolid, screenGlow);
    scene.add(phoneGroup);

    // Orbit ring 1
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.006, 2, 120),
      new THREE.MeshBasicMaterial({
        color: 0xf2ede4,
        transparent: true,
        opacity: 0.5,
      }),
    );
    scene.add(ring1);

    // Orbit ring 2 (tilted)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.004, 2, 120),
      new THREE.MeshBasicMaterial({
        color: 0x4d4d4d,
        transparent: true,
        opacity: 0.25,
      }),
    );
    ring2.rotation.x = Math.PI * 0.35;
    scene.add(ring2);

    // 8 small spheres orbiting on ring1
    const orbitSpheres: { mesh: THREE.Mesh; speed: number; angle: number }[] = [];
    const sphereGeom = new THREE.SphereGeometry(0.025, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
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
    const violetCount = totalParticles - whiteCount;

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
    const violetPoints = new THREE.Points(
      makeParticles(violetCount, 7),
      new THREE.PointsMaterial({
        color: 0x8a7855,
        size: 0.018,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    );
    scene.add(whitePoints, violetPoints);

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
        : Math.sin(t * 0.4) * 0.12;
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
      violetPoints.rotation.y += 0.0008;
      violetPoints.rotation.x += 0.0003;

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
      renderer.dispose();
      phoneGeom.dispose();
      sphereGeom.dispose();
      (phoneWire.material as THREE.Material).dispose();
      (phoneSolid.material as THREE.Material).dispose();
      (screenGlow.material as THREE.Material).dispose();
      (ring1.geometry as THREE.BufferGeometry).dispose();
      (ring1.material as THREE.Material).dispose();
      (ring2.geometry as THREE.BufferGeometry).dispose();
      (ring2.material as THREE.Material).dispose();
      sphereMat.dispose();
      (whitePoints.geometry as THREE.BufferGeometry).dispose();
      (whitePoints.material as THREE.Material).dispose();
      (violetPoints.geometry as THREE.BufferGeometry).dispose();
      (violetPoints.material as THREE.Material).dispose();
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
