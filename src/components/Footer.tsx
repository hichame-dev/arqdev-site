"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-brand/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-extrabold text-lg tracking-[4px] text-[#f0f0f5] mb-3">
              AR<span className="text-brand">Δ</span>DEV
            </p>
            <p className="text-sm text-white/30 leading-relaxed max-w-sm mb-4">
              Studio de développement freelance spécialisé en applications mobiles,
              web et solutions IA sur mesure.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/30 hover:text-brand transition-colors"
                style={{
                  background: "linear-gradient(135deg, rgba(18,18,36,0.9), rgba(12,12,26,0.95))",
                  border: "1px solid rgba(147,51,234,0.1)",
                }}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/30 hover:text-brand transition-colors"
                style={{
                  background: "linear-gradient(135deg, rgba(18,18,36,0.9), rgba(12,12,26,0.95))",
                  border: "1px solid rgba(147,51,234,0.1)",
                }}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/30 hover:text-brand transition-colors"
                style={{
                  background: "linear-gradient(135deg, rgba(18,18,36,0.9), rgba(12,12,26,0.95))",
                  border: "1px solid rgba(147,51,234,0.1)",
                }}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-brand/60 uppercase mb-4">
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
                    className="text-sm text-white/30 hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-brand/60 uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/30">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {SITE_CONFIG.location}
              </li>
            </ul>
            <p className="mt-4 font-mono text-[10px] tracking-[2px] text-white/15">
              Freelance · Dispo CDI
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-brand/[0.04] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[2px] text-white/15">
            &copy; {currentYear} {SITE_CONFIG.namePlain} &mdash; Tous droits r&eacute;serv&eacute;s
          </p>
          <p className="font-mono text-[10px] tracking-[2px] text-white/10">
            Conçu et développé par {SITE_CONFIG.founder}
          </p>
        </div>
      </div>
    </footer>
  );
}
