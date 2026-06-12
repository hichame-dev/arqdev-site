"use client";

import { motion, type Variants } from "framer-motion";

type Variant = "hero" | "light";

interface GeometricLinesProps {
  variant?: Variant;
  className?: string;
}

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (opacity: number) => ({
    pathLength: 1,
    opacity,
    transition: { duration: 2, ease: "easeOut" },
  }),
};

export default function GeometricLines({
  variant = "light",
  className = "",
}: GeometricLinesProps) {
  const isHero = variant === "hero";
  const stroke = isHero ? "#F2EDE4" : "#0A0A0A";
  const opacity = isHero ? 0.06 : 0.05;

  const motionProps = isHero
    ? { initial: "hidden", animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  if (isHero) {
    // Large centered pyramid — converging lines from bottom-center toward top corners
    return (
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{ zIndex: 0 }}
      >
        <motion.svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          {...motionProps}
        >
          <g
            fill="none"
            stroke={stroke}
            strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
          >
            {/* Pyramid: bottom-center → top corners + apex */}
            <motion.line
              x1="500"
              y1="920"
              x2="80"
              y2="80"
              variants={lineVariants}
              custom={opacity}
            />
            <motion.line
              x1="500"
              y1="920"
              x2="920"
              y2="80"
              variants={lineVariants}
              custom={opacity}
            />
            <motion.line
              x1="500"
              y1="920"
              x2="500"
              y2="80"
              variants={lineVariants}
              custom={opacity}
            />
            {/* Sparse diagonal accent at ~15deg */}
            <motion.line
              x1="0"
              y1="720"
              x2="1000"
              y2="452"
              variants={lineVariants}
              custom={opacity}
            />
            {/* Horizontal base accent */}
            <motion.line
              x1="0"
              y1="870"
              x2="1000"
              y2="870"
              variants={lineVariants}
              custom={opacity}
            />
          </g>
        </motion.svg>
      </div>
    );
  }

  // Light variant — subtler corner motifs
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="w-full h-full"
        {...motionProps}
      >
        <g
          fill="none"
          stroke={stroke}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        >
          {/* Top-left corner pyramid */}
          <motion.line
            x1="0"
            y1="220"
            x2="220"
            y2="0"
            variants={lineVariants}
            custom={opacity}
          />
          <motion.line
            x1="0"
            y1="110"
            x2="110"
            y2="0"
            variants={lineVariants}
            custom={opacity}
          />
          {/* Bottom-right corner pyramid */}
          <motion.line
            x1="780"
            y1="1000"
            x2="1000"
            y2="780"
            variants={lineVariants}
            custom={opacity}
          />
          <motion.line
            x1="890"
            y1="1000"
            x2="1000"
            y2="890"
            variants={lineVariants}
            custom={opacity}
          />
          {/* Sparse diagonal accent at ~15deg */}
          <motion.line
            x1="0"
            y1="300"
            x2="1000"
            y2="32"
            variants={lineVariants}
            custom={opacity}
          />
        </g>
      </motion.svg>
    </div>
  );
}
