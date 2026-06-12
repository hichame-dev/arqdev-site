"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

type Tag = "h1" | "h2" | "h3" | "h4";

interface Props {
  as?: Tag;
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each letter */
  stagger?: number;
  /** Initial delay before the first letter */
  delay?: number;
}

const components = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

const charVariant: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: (t: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: t,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function CascadeHeading({
  as = "h2",
  text,
  className,
  style,
  stagger = 0.035,
  delay = 0,
}: Props) {
  const chars = Array.from(text);
  const MotionTag = components[as];

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          custom={delay + i * stagger}
          variants={charVariant}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </MotionTag>
  );
}
