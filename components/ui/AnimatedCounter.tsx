"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-display), system-ui, sans-serif";

interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

const counters: CounterItem[] = [
  { value: 3, suffix: "", label: "chantiers en cours" },
  { value: 2, suffix: "", label: "apps mobiles au studio" },
  { value: 1, suffix: "", label: "bêta sur le Play Store" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function AnimatedCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-3 gap-px mt-20"
      style={{ background: "rgba(10, 10, 10, 0.12)" }}
    >
      {counters.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#F2EDE4",
            padding: "28px 18px",
          }}
        >
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1,
            }}
          >
            <Counter value={item.value} suffix={item.suffix} />
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "rgba(10, 10, 10, 0.55)",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
