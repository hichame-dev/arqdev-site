"use client";

import { motion } from "framer-motion";
import WorkflowNode from "./WorkflowNode";
import WorkflowConnection from "./WorkflowConnection";
import { WORKFLOW_NODES } from "@/lib/constants";

export default function WorkflowSchema() {
  const nodes = WORKFLOW_NODES;

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4">
      <svg
        viewBox="0 0 1120 320"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* Micro dot grid */}
        {Array.from({ length: 20 }).map((_, col) =>
          Array.from({ length: 7 }).map((_, row) => (
            <circle
              key={`dot-${col}-${row}`}
              cx={60 + col * 52}
              cy={60 + row * 35}
              r={0.8}
              fill="#9333ea"
              opacity={0.1}
            />
          ))
        )}

        {/* Mini floating decorative nodes */}
        {[
          { x: 40, y: 90, w: 14 },
          { x: 220, y: 260, w: 18 },
          { x: 450, y: 70, w: 12 },
          { x: 680, y: 280, w: 16 },
          { x: 900, y: 80, w: 20 },
          { x: 1060, y: 260, w: 14 },
          { x: 160, y: 50, w: 12 },
          { x: 850, y: 250, w: 16 },
        ].map((mini, i) => (
          <motion.rect
            key={`mini-${i}`}
            x={mini.x}
            y={mini.y}
            width={mini.w}
            height={mini.w}
            rx={4}
            fill="none"
            stroke="#9333ea"
            strokeWidth={0.5}
            opacity={0.25}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 2.5 + i * 0.1 }}
          />
        ))}

        {/* Connections */}
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          return (
            <WorkflowConnection
              key={`conn-${i}`}
              id={`conn-${i}`}
              fromX={node.x}
              fromY={node.y}
              toX={next.x}
              toY={next.y}
              color={node.color}
              delay={1.0 + i * 0.4}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <WorkflowNode
            key={node.id}
            x={node.x}
            y={node.y}
            icon={node.icon}
            label={node.label}
            color={node.color}
            delay={0.8 + i * 0.4}
          />
        ))}

        {/* Bottom label */}
        <motion.text
          x={560}
          y={310}
          textAnchor="middle"
          fill="rgba(255,255,255,0.2)"
          fontSize={8}
          fontFamily="var(--font-space-mono)"
          letterSpacing="6px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          ARQDEV WORKFLOW ENGINE
        </motion.text>
      </svg>
    </div>
  );
}
