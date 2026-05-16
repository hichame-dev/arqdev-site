"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  variant?: "primary" | "secondary";
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.3,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const primaryStyle = {
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    border: "1px solid rgba(167, 139, 250, 0.3)",
    boxShadow: isHovered
      ? "0 0 48px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
      : "0 0 32px rgba(124,58,237,0.4), 0 0 64px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
  };

  const secondaryStyle = {
    background: "linear-gradient(135deg, rgba(147,51,234,0.08) 0%, rgba(192,132,252,0.04) 100%)",
    border: `1px solid ${isHovered ? "rgba(147,51,234,0.5)" : "rgba(147,51,234,0.25)"}`,
    boxShadow: isHovered
      ? "0 0 20px rgba(147,51,234,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
      : "inset 0 1px 0 rgba(255,255,255,0.03)",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={`relative inline-block px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide cursor-pointer overflow-hidden transition-all duration-300 ${variant === "primary" ? "text-white" : "text-white/70 hover:text-white"} ${className}`}
      style={variant === "primary" ? primaryStyle : secondaryStyle}
    >
      {/* Top shine line */}
      {variant === "primary" && (
        <div
          className="absolute top-0 left-[15%] right-[15%] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
