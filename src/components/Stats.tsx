"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: StatItem[] = [
  { value: 1, suffix: "",  label: "App publiée", color: "#9333ea" },
  { value: 1, suffix: "",  label: "En cours de dev", color: "#f08dff" },
  { value: 5, suffix: "+", label: "Technos maîtrisées", color: "#c084fc" },
  { value: 100, suffix: "%", label: "Code sur mesure", color: "#3ee0f5" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} style={{ color }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full blur-[200px]"
        style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="font-mono text-[11px] tracking-[2px] text-white/40 uppercase">
                  {stat.label}
                </p>
                {/* Underline glow */}
                <div
                  className="mx-auto mt-3 h-[2px] w-12 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)`,
                    boxShadow: `0 0 8px ${stat.color}30`,
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
