"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Stars — 3 couches de profondeur
    const createStarLayer = (count: number, spread: number, size: number, opacity: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
        sizes[i] = size * (0.5 + Math.random() * 0.5);
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
      });

      return new THREE.Points(geometry, material);
    };

    const layer1 = createStarLayer(1800, 2000, 1.2, 0.9); // proche, brillant
    const layer2 = createStarLayer(1200, 1400, 0.7, 0.6); // milieu
    const layer3 = createStarLayer(800,  900,  0.4, 0.35); // loin, subtil

    scene.add(layer1, layer2, layer3);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", handleMouse);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Dérive lente — chaque couche à vitesse différente
      layer1.rotation.y = t * 0.012 + mouseX * 0.5;
      layer1.rotation.x = t * 0.006 + mouseY * 0.5;

      layer2.rotation.y = t * 0.008 + mouseX * 0.3;
      layer2.rotation.x = t * 0.004 + mouseY * 0.3;

      layer3.rotation.y = t * 0.004 + mouseX * 0.15;
      layer3.rotation.x = t * 0.002 + mouseY * 0.15;

      // Scintillement — opacité qui pulse doucement
      (layer1.material as THREE.PointsMaterial).opacity = 0.85 + Math.sin(t * 0.8) * 0.08;
      (layer2.material as THREE.PointsMaterial).opacity = 0.55 + Math.sin(t * 0.6 + 1) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      layer1.geometry.dispose();
      layer2.geometry.dispose();
      layer3.geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
