"use client";

import { motion } from "framer-motion";

interface TechPillProps {
  label: string;
  variant?: "light" | "dark";
}

export default function TechPill({ label, variant = "dark" }: TechPillProps) {
  const isDark = variant === "dark";
  return (
    <motion.span
      whileHover={{ y: -1 }}
      className="inline-block rounded-sm px-3 py-1"
      style={{
        fontFamily: "var(--font-space-mono), ui-monospace, monospace",
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: isDark
          ? "rgba(242, 237, 228, 0.06)"
          : "rgba(10, 10, 10, 0.05)",
        color: isDark
          ? "rgba(242, 237, 228, 0.75)"
          : "rgba(10, 10, 10, 0.7)",
        border: isDark
          ? "1px solid rgba(242, 237, 228, 0.1)"
          : "1px solid rgba(10, 10, 10, 0.1)",
      }}
    >
      {label}
    </motion.span>
  );
}
