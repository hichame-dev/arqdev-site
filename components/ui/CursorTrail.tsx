"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  decay: number;
};

const COLORS = ["#F2EDE4", "#6B6B6B", "#8A7855"];
const COLOR_WEIGHTS = [0.6, 0.3, 0.1];
const MAX_PARTICLES = 60;
const SPAWN_INTERVAL_MS = 16;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
      lastSpawn = now;
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const r = Math.random();
      let colorIdx = 0;
      let acc = 0;
      for (let i = 0; i < COLOR_WEIGHTS.length; i++) {
        acc += COLOR_WEIGHTS[i];
        if (r < acc) {
          colorIdx = i;
          break;
        }
      }
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: 2 + Math.random() * 3,
        color: COLORS[colorIdx],
        vx: (Math.random() * 2 - 1) * 0.8,
        vy: -0.5 - Math.random(),
        life: 1,
        decay: 0.018 + Math.random() * 0.007,
      });
    };

    window.addEventListener("mousemove", onMove);

    let rafId = 0;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
