"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 60%)" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Logo triangle */}
            <motion.svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.path
                d="M30 6 L56 52 L4 52 Z"
                stroke="#9333ea"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
            </motion.svg>

            {/* Brand text */}
            <motion.p
              className="mt-4 font-extrabold text-sm tracking-[6px] text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              AR<span className="text-brand">Δ</span>DEV
            </motion.p>

            {/* Loading bar */}
            <div className="mt-6 w-32 h-[2px] rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #9333ea, #c084fc)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
