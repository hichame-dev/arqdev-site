"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-brand/[0.12]"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-extrabold text-lg tracking-[4px] text-white mb-3">
              AR<span className="text-brand">Δ</span>DEV
            </p>
            <p className="text-sm text-white/65 leading-relaxed max-w-sm mb-4">
              Studio de développement freelance spécialisé en applications mobiles,
              web et solutions IA sur mesure.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-brand transition-colors"
                style={{
                  background: "rgba(147,51,234,0.08)",
                  border: "1px solid rgba(147,51,234,0.2)",
                }}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-brand transition-colors"
                style={{
                  background: "rgba(147,51,234,0.08)",
                  border: "1px solid rgba(147,51,234,0.2)",
                }}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-brand transition-colors"
                style={{
                  background: "rgba(147,51,234,0.08)",
                  border: "1px solid rgba(147,51,234,0.2)",
                }}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-brand uppercase mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Accueil", href: "#hero" },
                { label: "Projets", href: "#projets" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-brand uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {SITE_CONFIG.location}
              </li>
            </ul>
            <p className="mt-4 font-mono text-[10px] tracking-[2px] text-white/45">
              Freelance
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[2px] text-white/50">
            &copy; {currentYear} {SITE_CONFIG.namePlain} &mdash; Tous droits r&eacute;serv&eacute;s
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] tracking-[2px] text-white/40">
              SIRET {SITE_CONFIG.siret}
            </p>
            <span className="text-white/20">·</span>
            <p className="font-mono text-[10px] tracking-[2px] text-white/40">
              Conçu par {SITE_CONFIG.founder}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
