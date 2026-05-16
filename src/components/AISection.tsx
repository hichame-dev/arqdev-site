"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function AISection() {
  return (
    <ScrollReveal>
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgba(19,19,31,0.9) 0%, rgba(15,15,26,0.95) 40%, rgba(19,19,31,0.9) 100%)",
          border: "1px solid rgba(62,224,245,0.15)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.3), 0 0 60px rgba(62,224,245,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — Text */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="font-mono text-[10px] tracking-[6px] uppercase text-accent-cyan mb-4">
              △ INTELLIGENCE ARTIFICIELLE
            </p>

            <h3 className="text-2xl md:text-[32px] font-bold text-white tracking-tight leading-tight mb-4">
              L&apos;IA au service de
              <br />
              vos projets
            </h3>

            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-lg">
              Intégration d&apos;agents intelligents, automatisation des workflows,
              chatbots conversationnels. L&apos;IA n&apos;est pas un buzzword — c&apos;est
              un outil concret.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Groq", "Llama", "MCP", "Agents", "Claude"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono text-accent-cyan border border-accent-cyan/20"
                  style={{ background: "linear-gradient(135deg, rgba(62,224,245,0.1), rgba(62,224,245,0.04))", boxShadow: "0 0 8px rgba(62,224,245,0.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <MagneticButton
              href="#contact"
              variant="secondary"
              className="border-accent-cyan/30 hover:border-accent-cyan/60"
            >
              En savoir plus
            </MagneticButton>
          </div>

          {/* Right — Image */}
          <div className="relative min-h-[300px] md:min-h-[450px]">
            <Image
              src="/asset/site.png"
              alt="Intelligence Artificielle — ARQDEV"
              fill
              className="object-cover object-center"
              style={{ filter: "saturate(0.8) brightness(0.9)" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Soft left-edge fade into the text side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14] via-transparent to-transparent w-1/3" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
