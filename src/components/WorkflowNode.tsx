"use client";

import { motion } from "framer-motion";

interface WorkflowNodeProps {
  x: number;
  y: number;
  icon: string;
  label: string;
  color: string;
  delay: number;
}

export default function WorkflowNode({
  x,
  y,
  icon,
  label,
  color,
  delay,
}: WorkflowNodeProps) {
  const nodeSize = 64;
  const innerSize = 48;
  const cx = x + nodeSize / 2;
  const cy = y + nodeSize / 2;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Ambient glow — soft bloom */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={50}
        fill={color}
        opacity={0.06}
        filter="url(#nodeBlur)"
        animate={{ r: [50, 60, 50], opacity: [0.06, 0.03, 0.06] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow ring — smoother pulse */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={38}
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        initial={{ r: 38, opacity: 0.35 }}
        animate={{ r: 48, opacity: 0.08 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Outer rect — gradient fill */}
      <defs>
        <linearGradient id={`nodeGrad-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
        <filter id="nodeBlur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect
        x={x}
        y={y}
        width={nodeSize}
        height={nodeSize}
        rx={16}
        fill={`url(#nodeGrad-${label})`}
        stroke={color}
        strokeWidth={1.2}
      />

      {/* Inner rect — subtle */}
      <rect
        x={x + (nodeSize - innerSize) / 2}
        y={y + (nodeSize - innerSize) / 2}
        width={innerSize}
        height={innerSize}
        rx={12}
        fill="none"
        stroke={color}
        strokeWidth={0.6}
        opacity={0.3}
      />

      {/* Top edge highlight */}
      <line
        x1={x + 16}
        y1={y + 0.5}
        x2={x + nodeSize - 16}
        y2={y + 0.5}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={0.5}
        strokeLinecap="round"
      />

      {/* Icon */}
      <g transform={`translate(${cx - 10}, ${cy - 10})`} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {icon === "concevoir" && (
          /* Lightbulb */
          <>
            <path d="M10 1a7 7 0 0 1 4 12.7V16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 10 1z" />
            <line x1="8" y1="19" x2="12" y2="19" />
            <line x1="10" y1="1" x2="10" y2="5" opacity={0.4} />
          </>
        )}
        {icon === "developper" && (
          /* Code brackets */
          <>
            <polyline points="6,4 1,10 6,16" />
            <polyline points="14,4 19,10 14,16" />
            <line x1="12" y1="2" x2="8" y2="18" opacity={0.5} />
          </>
        )}
        {icon === "architecturer" && (
          /* Structure/layers */
          <>
            <polygon points="10,1 19,6 10,11 1,6" />
            <polyline points="1,10 10,15 19,10" />
            <polyline points="1,14 10,19 19,14" />
          </>
        )}
        {icon === "deployer" && (
          /* Rocket */
          <>
            <path d="M10 18V14" />
            <path d="M6 14l4-12 4 12" />
            <path d="M6 14c-2 0-3 2-3 3h14c0-1-1-3-3-3" />
            <circle cx="10" cy="8" r="1.5" />
          </>
        )}
        {icon === "automatiser" && (
          /* Gear/cog */
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 0.5v3M10 16.5v3M0.5 10h3M16.5 10h3M3.3 3.3l2.1 2.1M14.6 14.6l2.1 2.1M16.7 3.3l-2.1 2.1M5.4 14.6l-2.1 2.1" />
          </>
        )}
      </g>

      {/* Status dot — neon */}
      <circle cx={x + nodeSize - 4} cy={y + 4} r={2.5} fill={color} opacity={0.8} />
      <motion.circle
        cx={x + nodeSize - 4}
        cy={y + 4}
        r={2.5}
        fill="#3ee0f5"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Label */}
      <text
        x={cx}
        y={y + nodeSize + 20}
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        fontSize={9}
        fontFamily="var(--font-space-mono)"
        letterSpacing="1.5px"
      >
        {label}
      </text>
    </motion.g>
  );
}
