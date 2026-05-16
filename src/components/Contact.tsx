"use client";

import { Github, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow — multi-layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(240,141,255,0.1) 0%, rgba(240,141,255,0.03) 50%, transparent 70%)" }}
      />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[6px] uppercase text-accent-magenta mb-4">
            △ CONTACT
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight leading-tight">
            Un projet en tête ?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 font-mono text-[13px] text-white/40 tracking-wide">
            Discutons-en.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] tracking-[5px] uppercase text-white/25">
              {SITE_CONFIG.namePlain}
            </p>
            <MagneticButton
              href={`mailto:${SITE_CONFIG.email}`}
              variant="primary"
              className="text-base"
            >
              {SITE_CONFIG.email}
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Socials */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-brand transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              style={{
                background: "linear-gradient(135deg, rgba(25,25,40,0.9), rgba(19,19,31,0.95))",
                border: "1px solid rgba(147,51,234,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={SITE_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-brand transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              style={{
                background: "linear-gradient(135deg, rgba(25,25,40,0.9), rgba(19,19,31,0.95))",
                border: "1px solid rgba(147,51,234,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
