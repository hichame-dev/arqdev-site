"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const W = 1120;
const H = 320;
const NS = 64;

const NODES = [
  { x: 120, y: 200, hex: 0xc084fc },
  { x: 340, y: 120, hex: 0x9333ea },
  { x: 560, y: 200, hex: 0x3ee0f5 },
  { x: 780, y: 120, hex: 0x9333ea },
  { x: 1000, y: 200, hex: 0xf08dff },
];

const toV3 = (x: number, y: number) =>
  new THREE.Vector3(x - W / 2, -(y - H / 2), 0);

export default function WorkflowThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -W / 2, W / 2, H / 2, -H / 2, -10, 10
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const syncSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
    };
    syncSize();

    // Build curves + tubes
    const curves: THREE.CubicBezierCurve3[] = [];

    for (let i = 0; i < NODES.length - 1; i++) {
      const a = NODES[i];
      const b = NODES[i + 1];

      const sx = a.x + NS, sy = a.y + NS / 2;
      const ex = b.x,      ey = b.y + NS / 2;
      const mx = (sx + ex) / 2;

      const curve = new THREE.CubicBezierCurve3(
        toV3(sx, sy), toV3(mx, sy),
        toV3(mx, ey), toV3(ex, ey),
      );
      curves.push(curve);

      // Outer glow tube
      const outerTube = new THREE.TubeGeometry(curve, 48, 2.2, 6, false);
      scene.add(new THREE.Mesh(outerTube, new THREE.MeshBasicMaterial({
        color: a.hex,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })));

      // Core tube
      const coreTube = new THREE.TubeGeometry(curve, 48, 0.6, 6, false);
      scene.add(new THREE.Mesh(coreTube, new THREE.MeshBasicMaterial({
        color: a.hex,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })));

      // Inner white thread
      const innerTube = new THREE.TubeGeometry(curve, 48, 0.2, 4, false);
      scene.add(new THREE.Mesh(innerTube, new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })));
    }

    // Particles
    interface Particle {
      core: THREE.Mesh;
      glow: THREE.Mesh;
      ci: number;
      t: number;
      speed: number;
    }

    const coreGeo = new THREE.SphereGeometry(2.5, 6, 6);
    const glowGeo = new THREE.SphereGeometry(7, 6, 6);
    const particles: Particle[] = [];

    for (let ci = 0; ci < curves.length; ci++) {
      const color = NODES[ci].hex;
      for (let p = 0; p < 4; p++) {
        const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        scene.add(core, glow);
        particles.push({ core, glow, ci, t: p / 4, speed: 0.0025 + Math.random() * 0.0015 });
      }
    }

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const pos = curves[p.ci].getPoint(p.t);
        p.core.position.copy(pos);
        p.glow.position.copy(pos);

        const fade = Math.sin(p.t * Math.PI);
        (p.core.material as THREE.MeshBasicMaterial).opacity = 0.95 * fade;
        (p.glow.material as THREE.MeshBasicMaterial).opacity = 0.18 * fade;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => syncSize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
