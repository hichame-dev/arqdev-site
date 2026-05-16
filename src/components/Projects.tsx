"use client";

import Image from "next/image";
import { Apple, Smartphone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  return (
    <section id="projets" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[6px] uppercase text-accent-cyan mb-4">
            △ PROJETS
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold text-white tracking-tight leading-tight">
            Ce qu&apos;on construit
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.15}>
              <TiltCard accentColor={project.color}>
                {/* Image */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover ${project.imagePosition === "bottom" ? "object-bottom" : "object-center"}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(13,13,25,0.95) 0%, rgba(13,13,25,0.5) 35%, rgba(13,13,25,0.1) 65%, transparent 100%)`,
                    }}
                  />
                </div>

                <div className="p-8 pt-5">
                  {/* Platform badges + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}20, ${project.color}0A)`,
                          boxShadow: `0 0 12px ${project.color}10`,
                          border: `1px solid ${project.color}15`,
                        }}
                      >
                        <Apple className="w-4 h-4" style={{ color: project.color }} />
                      </div>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}20, ${project.color}0A)`,
                          boxShadow: `0 0 12px ${project.color}10`,
                          border: `1px solid ${project.color}15`,
                        }}
                      >
                        <Smartphone className="w-4 h-4" style={{ color: project.color }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p
                        className="text-sm font-mono"
                        style={{ color: project.color }}
                      >
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/55 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-white/45"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full text-[11px] font-mono border"
                        style={{
                          color: project.color,
                          borderColor: project.color + "25",
                          background: `linear-gradient(135deg, ${project.color}14, ${project.color}08)`,
                          boxShadow: `0 0 8px ${project.color}08`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
