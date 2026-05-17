"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Label = { text: string; color: string; top?: string; bottom?: string; left?: string; right?: string };

const LABELS: Label[] = [
  { text: "CONCEVOIR",     top: "8%",   left: "2%",   color: "#c084fc" },
  { text: "DÉVELOPPER",    top: "22%",  right: "2%",  color: "#9333ea" },
  { text: "ARCHITECTURER", top: "50%",  right: "2%",  color: "#06b6d4" },
  { text: "DÉPLOYER",      bottom: "15%", left: "2%", color: "#9333ea" },
  { text: "AUTOMATISER",   bottom: "2%",  left: "2%", color: "#f08dff" },
];

export default function HeroSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const R = 110; // sphere radius
    const COUNT = 700;

    // Fibonacci sphere distribution
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phi = Math.PI * (3 - Math.sqrt(5));

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#9333ea"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#f08dff"),
    ];

    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * r * R;
      const yy = y * R;
      const z = Math.sin(theta) * r * R;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = yy;
      positions[i * 3 + 2] = z;

      pts.push(new THREE.Vector3(x, yy, z));

      const c = palette[Math.floor(Math.random() * palette.length)];
      const bright = Math.random() < 0.15;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = bright ? 2.8 + Math.random() * 1.5 : 0.8 + Math.random() * 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sphere = new THREE.Points(geo, mat);
    scene.add(sphere);

    // Connection lines between nearby points
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const threshold = R * 0.38;

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const d = pts[i].distanceTo(pts[j]);
        if (d < threshold) {
          const fade = 1 - d / threshold;
          const ci = palette[Math.floor(Math.random() * palette.length)];

          linePositions.push(pts[i].x, pts[i].y, pts[i].z);
          linePositions.push(pts[j].x, pts[j].y, pts[j].z);
          lineColors.push(ci.r * fade * 0.4, ci.g * fade * 0.4, ci.b * fade * 0.4);
          lineColors.push(ci.r * fade * 0.4, ci.g * fade * 0.4, ci.b * fade * 0.4);

          if (linePositions.length > 12000) break;
        }
      }
      if (linePositions.length > 12000) break;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(new Float32Array(lineColors), 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(R * 1.05, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6d28d9,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouse);

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      sphere.rotation.y = t * 0.08 + mouseX * 0.5;
      sphere.rotation.x = Math.sin(t * 0.03) * 0.15 + mouseY * 0.3;

      const lines = scene.children.find(c => c instanceof THREE.LineSegments) as THREE.LineSegments;
      if (lines) {
        lines.rotation.y = sphere.rotation.y;
        lines.rotation.x = sphere.rotation.x;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: "380px" }}>
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Floating labels */}
      {LABELS.map((l) => (
        <div
          key={l.text}
          className="absolute flex items-center gap-2 pointer-events-none"
          style={{ top: l.top, bottom: l.bottom, left: l.left, right: l.right }}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: l.color, boxShadow: `0 0 8px ${l.color}, 0 0 16px ${l.color}60` }}
          />
          <span
            className="font-mono text-[11px] font-semibold tracking-[4px] uppercase"
            style={{ color: l.color, textShadow: `0 0 20px ${l.color}80, 0 1px 4px rgba(0,0,0,0.9)` }}
          >
            {l.text}
          </span>
        </div>
      ))}
    </div>
  );
}
