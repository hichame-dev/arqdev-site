"use client";

import { useEffect } from "react";

export default function HeroParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const section = document.getElementById("hero");
    const triangle = document.getElementById("hero-lines");
    const headline = document.getElementById("hero-headline");
    if (!section) return;

    if (triangle) {
      triangle.style.transition =
        "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }
    if (headline) {
      headline.style.transition =
        "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      rafId = 0;
      if (triangle) {
        triangle.style.transform = `translate(calc(-50% + ${targetX * 0.02}px), calc(-50% + ${targetY * 0.02}px))`;
      }
      if (headline) {
        headline.style.transform = `translate(${targetX * 0.008}px, ${targetY * 0.008}px)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = e.clientX - (rect.left + rect.width / 2);
      targetY = e.clientY - (rect.top + rect.height / 2);
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
