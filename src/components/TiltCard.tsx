"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  accentColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 12,
  accentColor = "#9333ea",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * tiltStrength,
      rotateY: (x - 0.5) * tiltStrength,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
    >
      {/* Background — premium glass */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${accentColor}14 0%, ${accentColor}08 40%, rgba(12,12,26,0.95) 100%)`
            : "linear-gradient(160deg, rgba(18,18,36,0.9) 0%, rgba(12,12,26,0.95) 40%, rgba(18,18,36,0.9) 100%)",
          border: `1px solid ${isHovered ? accentColor + "35" : "rgba(147,51,234,0.08)"}`,
          boxShadow: isHovered
            ? `0 0 40px ${accentColor}15, 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`
            : "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      />

      {/* Top edge highlight — like polished metal */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] rounded-full transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${isHovered ? accentColor + "60" : "rgba(255,255,255,0.08)"}, transparent)`,
          filter: isHovered ? `drop-shadow(0 0 4px ${accentColor}40)` : "none",
        }}
      />

      {/* Glare — smooth radial */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 60% 50% at ${glarePos.x}% ${glarePos.y}%, ${accentColor}18, transparent 60%)`,
          }}
        />
      )}

      {/* Shine sweep on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)`,
              transform: `translateX(${(glarePos.x - 50) * 2}%)`,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
