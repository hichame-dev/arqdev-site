"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import AISection from "./AISection";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-surface-mid">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[6px] uppercase text-accent-purple mb-4">
            △ SERVICES
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#f0f0f5] tracking-tight leading-tight">
            Ce qu&apos;on fait
          </h2>
        </ScrollReveal>

        {/* Service cards grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div
                className="group relative p-6 rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500"
                style={{
                  background: "linear-gradient(160deg, rgba(18,18,36,0.9) 0%, rgba(12,12,26,0.95) 40%, rgba(18,18,36,0.9) 100%)",
                  border: "1px solid rgba(147,51,234,0.08)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = service.accent + "30";
                  el.style.boxShadow = `0 0 40px ${service.accent}12, 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(147,51,234,0.08)";
                  el.style.boxShadow = "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)";
                }}
              >
                {/* Top shine line */}
                <div
                  className="absolute top-0 left-[15%] right-[15%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}40, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl overflow-hidden mb-5 transition-all duration-300"
                  style={{
                    boxShadow: `0 0 20px ${service.accent}15`,
                    border: `1px solid ${service.accent}20`,
                  }}
                >
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#f0f0f5] group-hover:text-brand transition-colors mb-1">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/40 mb-4">
                  {service.description}
                </p>

                {/* Details */}
                <ul className="space-y-1.5">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-xs text-white/30">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: service.accent }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* AI Section */}
        <div className="mt-16">
          <AISection />
        </div>
      </div>
    </section>
  );
}
