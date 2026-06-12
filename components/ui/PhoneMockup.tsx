"use client";

import { motion } from "framer-motion";
import { slideInFromRight } from "@/lib/animations";
import Image from "next/image";

interface PhoneMockupProps {
  imageSrc?: string;
  alt: string;
}

export default function PhoneMockup({
  imageSrc,
  alt,
}: PhoneMockupProps) {
  return (
    <motion.div
      variants={slideInFromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative mx-auto w-[260px] sm:w-[300px]"
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[2.8rem] p-2"
        style={{
          border: "7px solid rgba(242, 237, 228, 0.14)",
          background: "#0A0A0A",
          boxShadow:
            "0 24px 60px -20px rgba(138, 120, 85, 0.18), 0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 z-10"
          style={{
            background: "#0A0A0A",
            borderBottomLeftRadius: "0.9rem",
            borderBottomRightRadius: "0.9rem",
          }}
        />
        {/* Screen */}
        <div
          className="relative aspect-[9/19.5] rounded-[2.1rem] overflow-hidden"
          style={{ background: "#1A1A1A" }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover"
              sizes="300px"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(242,237,228,0.06), rgba(138, 120, 85,0.08))",
              }}
            >
              <span
                style={{
                  color: "rgba(242, 237, 228, 0.5)",
                  fontFamily:
                    "var(--font-space-mono), ui-monospace, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Screenshot
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
