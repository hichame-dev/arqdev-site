"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroSphere from "./HeroSphere";
import TypingText from "./TypingText";
import MagneticButton from "./MagneticButton";
import DoubleTriangle from "./DoubleTriangle";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* === BACKGROUND LAYERS === */}

      {/* Layer 1: Gradient mesh — espace profond */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob gauche — violet */}
        <div
          className="absolute inset-y-0 left-0 w-[60%]"
          style={{ background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(109, 40, 217, 0.12) 0%, transparent 70%)" }}
        />
        {/* Blob droite — cyan */}
        <div
          className="absolute inset-y-0 right-0 w-[60%]"
          style={{ background: "radial-gradient(ellipse 35% 50% at 100% 50%, rgba(6, 182, 212, 0.07) 0%, transparent 70%)" }}
        />
        {/* Halo supérieur */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(88, 28, 135, 0.1) 0%, transparent 70%)" }}
        />
      </div>

      {/* Layer 2: Tech grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Layer 3: Scanline */}
      <div className="absolute inset-0 scanline" />

      {/* Layer 4: Noise texture */}
      <div className="absolute inset-0 noise-bg opacity-[0.025]" />

      {/* Layer 5: Double triangle behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
        <DoubleTriangle size={500} opacity={0.12} />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[13px] font-bold tracking-[7px] uppercase mb-6"
          style={{ color: "#7a91b8" }}
        >
          DÉVELOPPEUR FULLSTACK · FREELANCE · MARSEILLE
        </motion.p>

        {/* Logo — staggered letter animation */}
        <h1
          className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-extrabold tracking-[12px] md:tracking-[14px] leading-none flex items-center"
          style={{ color: "#f0ecff", textShadow: "0 0 80px rgba(139,92,246,0.3)" }}
        >
          {["A", "R"].map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.5, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, #ffffff 10%, #c084fc 50%, #9333ea 100%)",
            }}
          >
            Δ
            {/* Primary glow behind delta */}
            <motion.span
              className="absolute inset-0 bg-clip-text text-transparent blur-[8px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #a855f7 0%, #c084fc 100%)",
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Δ
            </motion.span>
            {/* Outer soft bloom */}
            <motion.span
              className="absolute inset-0 bg-clip-text text-transparent blur-[20px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #9333ea 0%, #3ee0f5 100%)",
              }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Δ
            </motion.span>
          </motion.span>
          {["D", "E", "V"].map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2 + i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Sub-logo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-code text-[12px] tracking-[14px] text-brand/40 mt-2 mb-12"
        >
          ARQDEV
        </motion.p>

        {/* Hero Sphere — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="w-full max-w-2xl hidden md:block"
        >
          <HeroSphere />
        </motion.div>

        {/* Mobile: simplified tagline */}
        <div className="md:hidden mt-4 mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-mono text-[11px] tracking-[3px] text-white/40 text-center"
          >
            CONCEVOIR · DÉVELOPPER · ARCHITECTURER
            <br />
            DÉPLOYER · AUTOMATISER
          </motion.p>
        </div>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-8 md:mt-10 h-8"
        >
          <div className="inline-block px-4 py-1 rounded"
            style={{ background: "rgba(4,5,14,0.5)" }}
          >
          <TypingText
            texts={[
              "De l\u2019id\u00e9e au d\u00e9ploiement \u2014 un pipeline complet.",
              "Applications mobiles React Native",
              "Plateformes web Next.js",
              "APIs robustes & scalables",
              "Automatisation IA & workflows",
            ]}
            className="font-mono text-[12px] tracking-[2px] text-white/70"
            style={{ textShadow: "0 0 30px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,1)" }}
          />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <MagneticButton href="#contact" variant="primary">
            Lancer votre projet
          </MagneticButton>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {["React Native", "TypeScript", "Next.js", "Node.js", "MongoDB", "Firebase", "Anthropic"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-[11px] font-mono text-[#c4b5fd] border border-[rgba(139,92,246,0.25)] bg-[rgba(109,40,217,0.08)]"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[22px] h-[34px] rounded-full border border-white/15 flex items-start justify-center p-1.5"
              style={{ boxShadow: "0 0 15px rgba(147,51,234,0.1), inset 0 0 8px rgba(147,51,234,0.05)" }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "radial-gradient(circle, #a855f7, #9333ea)", boxShadow: "0 0 6px rgba(147,51,234,0.6)" }}
              />
            </div>
            <ChevronDown className="w-4 h-4 text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
