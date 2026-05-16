"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = !window.matchMedia("(hover: hover)").matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ x: position.x - 175, y: position.y - 160 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.3 }}
    >
      <div
        className="w-[350px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(147,51,234,0.14) 0%, rgba(168,85,247,0.08) 25%, rgba(62,224,245,0.04) 50%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
