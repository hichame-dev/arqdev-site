"use client";

import { motion } from "framer-motion";

interface WorkflowConnectionProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  delay: number;
  id: string;
}

export default function WorkflowConnection({
  fromX,
  fromY,
  toX,
  toY,
  color,
  delay,
  id,
}: WorkflowConnectionProps) {
  const nodeSize = 64;
  const startX = fromX + nodeSize;
  const startY = fromY + nodeSize / 2;
  const endX = toX;
  const endY = toY + nodeSize / 2;

  const midX = (startX + endX) / 2;

  const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

  return (
    <g>
      {/* Outer glow line — soft bloom */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={4}
        opacity={0.06}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />

      {/* Base line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color + "30"}
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />

      {/* Inner bright line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color + "55"}
        strokeWidth={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />

      {/* Traveling dot — with glow */}
      <circle r={2} fill={color} opacity={0.15}>
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin={`${delay + 0.8}s`}
          path={pathD}
        />
      </circle>
      <circle r={3} fill={color}>
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin={`${delay + 0.8}s`}
          path={pathD}
        />
      </circle>

      {/* Secondary dot */}
      <circle r={1.5} fill={color} opacity={0.4}>
        <animateMotion
          dur="4.5s"
          repeatCount="indefinite"
          begin={`${delay + 1.5}s`}
          path={pathD}
          id={`dot-${id}`}
        />
      </circle>
    </g>
  );
}
