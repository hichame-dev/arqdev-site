"use client";

import { motion } from "framer-motion";
import {
  MapPin, ShoppingBag, MessageCircle, BarChart2,
  CalendarDays, Users, Utensils, CreditCard,
  Camera, Zap, Globe, Lock,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const APP_ICONS = [
  { Icon: MapPin,        label: "GPS",    color: "#9333ea" },
  { Icon: ShoppingBag,   label: "Shop",   color: "#3ee0f5" },
  { Icon: MessageCircle, label: "Chat",   color: "#f59e0b" },
  { Icon: BarChart2,     label: "Stats",  color: "#10b981" },
  { Icon: CalendarDays,  label: "Book",   color: "#ef4444" },
  { Icon: Users,         label: "Social", color: "#8b5cf6" },
  { Icon: Utensils,      label: "Food",   color: "#f97316" },
  { Icon: CreditCard,    label: "Pay",    color: "#06b6d4" },
  { Icon: Camera,        label: "Media",  color: "#ec4899" },
  { Icon: Zap,           label: "Auto",   color: "#a3e635" },
  { Icon: Globe,         label: "Web",    color: "#6366f1" },
  { Icon: Lock,          label: "Auth",   color: "#94a3b8" },
];

const STACK_LAYERS = [
  {
    label: "Frontend",
    color: "#9333ea",
    items: ["React Native", "TypeScript", "Expo", "Tailwind"],
  },
  {
    label: "Backend",
    color: "#3ee0f5",
    items: ["Node.js", "Express", "REST API", "GraphQL"],
  },
  {
    label: "Database",
    color: "#f59e0b",
    items: ["MongoDB", "Firebase", "PostgreSQL", "Redis"],
  },
  {
    label: "Cloud",
    color: "#10b981",
    items: ["AWS S3", "Cloudinary", "Vercel", "Railway"],
  },
];

export default function Projects() {
  return (
    <section id="projets" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[6px] uppercase text-accent-cyan mb-4">
            △ APPLICATIONS MOBILES
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold text-white tracking-tight leading-tight">
            Du concept au store
          </h2>
          <p className="mt-4 text-white/65 max-w-xl leading-relaxed">
            Une seule codebase React Native pour iOS et Android, du design à la mise en production, frontend, backend et cloud inclus.
          </p>
        </ScrollReveal>

        <div className="mt-16 flex flex-col lg:flex-row items-center gap-16">
          {/* Phone mockup */}
          <div className="relative shrink-0">
            {/* Glow */}
            <div className="absolute inset-0 blur-[80px] opacity-20 rounded-full scale-75"
              style={{ background: "radial-gradient(circle, #9333ea, #3ee0f5)" }} />

            {/* Frame */}
            <div
              className="relative w-[250px] h-[520px] rounded-[48px] border-[2.5px] overflow-hidden flex flex-col"
              style={{
                borderColor: "rgba(147,51,234,0.65)",
                background: "#0d0d1a",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(147,51,234,0.2)",
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
                <span className="text-[10px] font-mono text-white/40">9:41</span>
                <div className="w-16 h-4 bg-[#0d0d1a] rounded-full" />
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-2 rounded-sm border border-white/30 relative">
                    <div className="absolute inset-[2px] left-[2px] right-[3px] bg-white/50 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* App grid */}
              <div className="flex-1 px-4 py-2 grid grid-cols-3 gap-3 content-start">
                {APP_ICONS.map(({ Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${color}45, ${color}22)`,
                        border: `1px solid ${color}60`,
                        boxShadow: `0 4px 20px ${color}35`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <span className="text-[9px] font-mono text-white/70">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Home indicator */}
              <div className="pb-3 flex justify-center">
                <div className="w-20 h-1 rounded-full bg-white/15" />
              </div>
            </div>
          </div>

          {/* Stack layers */}
          <div className="flex-1 w-full max-w-lg space-y-4">
            {STACK_LAYERS.map(({ label, color, items }, i) => (
              <ScrollReveal key={label} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-5 border"
                  style={{
                    background: `linear-gradient(135deg, ${color}20, ${color}0e)`,
                    borderColor: color + "45",
                  }}
                >
                  <p
                    className="font-mono text-[10px] tracking-[4px] uppercase mb-3"
                    style={{ color }}
                  >
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-[11px] font-mono border text-white/90"
                        style={{ borderColor: color + "45", background: color + "22" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
