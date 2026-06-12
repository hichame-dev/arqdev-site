"use client";

import { useEffect, useState } from "react";
import HeroParallax from "@/components/ui/HeroParallax";
import CursorTrail from "@/components/ui/CursorTrail";
import HeroScene from "@/components/ui/HeroScene";

const DISPLAY = "var(--font-display), system-ui, sans-serif";
const MONO = "var(--font-space-mono), ui-monospace, monospace";

function Logo({
  height,
  white = false,
  alt = "ARQDEV",
}: {
  height: number;
  white?: boolean;
  alt?: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/brand/arqdev-logo.png"
      alt={alt}
      style={{
        height: `${height}px`,
        width: "auto",
        display: "block",
        filter: white ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#process", label: "Process" },
  { href: "#capabilities", label: "Stack" },
  { href: "#apps", label: "Apps" },
  { href: "#about", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll spy — highlight the nav link of the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
    <nav
      id="hero-navbar"
      className="fixed top-0 left-0 w-full flex items-center"
      style={{
        height: "64px",
        background: "rgba(10, 10, 10, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(242, 237, 228, 0.06)",
        zIndex: 100,
      }}
    >
      <div className="w-full flex items-center justify-between px-6 sm:px-10">
        <a href="#hero" aria-label="ARQDEV — accueil" className="flex items-center">
          <Logo height={20} white />
        </a>
        <div
          className="hidden sm:flex items-center gap-8"
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors hover:text-paper ${
                activeSection === link.href ? "active text-paper" : "text-paper/55"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="sm:hidden flex flex-col items-center justify-center gap-1.5"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((v) => !v)}
          style={{ width: 44, height: 44, background: "transparent", border: "none" }}
        >
          <span
            aria-hidden
            className="block transition-transform duration-300"
            style={{
              width: 22,
              height: 1.5,
              background: "#F2EDE4",
              transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            aria-hidden
            className="block transition-transform duration-300"
            style={{
              width: 22,
              height: 1.5,
              background: "#F2EDE4",
              transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

    </nav>

    {/* Panneau mobile : hors du <nav> — son backdrop-filter ferait du
        position:fixed un positionnement relatif à la barre de 64px. */}
    <div
      id="mobile-menu"
      className="sm:hidden fixed left-0 right-0 flex flex-col transition-[opacity,visibility] duration-300"
      style={{
        top: "64px",
        bottom: 0,
        zIndex: 99,
        background: "rgba(10, 10, 10, 0.97)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        padding: "32px 24px",
        gap: "8px",
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? "visible" : "hidden",
      }}
    >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="transition-colors hover:text-paper"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: "32px",
              letterSpacing: "-0.02em",
              color: activeSection === link.href ? "#F2EDE4" : "rgba(242, 237, 228, 0.6)",
              padding: "14px 0",
              borderBottom: "1px solid rgba(242, 237, 228, 0.08)",
              transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:arqdev@outlook.fr"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "auto",
            fontFamily: MONO,
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(242, 237, 228, 0.45)",
          }}
        >
          arqdev@outlook.fr
        </a>
      </div>
    </>
  );
}

// Wireframe triangle ghost behind the title — clin d'œil au logo.
function HeroLines() {
  return (
    <svg
      id="hero-lines"
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(82vmin, 920px)",
        height: "min(82vmin, 920px)",
        zIndex: 0,
      }}
      viewBox="0 0 100 100"
    >
      <g
        stroke="#F2EDE4"
        opacity={0.04}
        vectorEffect="non-scaling-stroke"
        fill="none"
        strokeLinecap="square"
      >
        <line x1="50" y1="8" x2="10" y2="90" strokeWidth={1} />
        <line x1="10" y1="90" x2="90" y2="90" strokeWidth={1} />
        <line x1="90" y1="90" x2="50" y2="8" strokeWidth={1} />
        <line x1="50" y1="58" x2="50" y2="8" strokeWidth={1} />
        <line x1="50" y1="58" x2="10" y2="90" strokeWidth={1} />
        <line x1="50" y1="58" x2="90" y2="90" strokeWidth={1} />
      </g>
    </svg>
  );
}

// Headline découpée pour permettre à l'intro GSAP de cascader mot par mot.
const HEADLINE_LINES: string[][] = [
  ["Studio", "de"],
  ["développement."],
];

export default function Hero() {
  return (
    <>
      <Navbar />
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <HeroLines />

        <div
          className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10 md:gap-16"
          style={{ paddingLeft: "6vw", paddingRight: "6vw", paddingTop: "80px" }}
        >
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left">
            {/* Eyebrow */}
            <div id="hero-logo" className="hero-reveal flex items-center gap-3">
              <span
                aria-hidden
                style={{
                  width: 36,
                  height: 2,
                  background:
                    "linear-gradient(90deg, #3D3220 0%, #E8D5A8 50%, #3D3220 100%)",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#F2EDE4",
                }}
              >
                ARQDEV · Est. 2024
              </span>
            </div>

            {/* Signature headline */}
            <h1
              id="hero-headline"
              className="hero-reveal hero-title"
              aria-label="Studio de développement. Marseille."
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                color: "#F2EDE4",
                marginTop: "36px",
                maxWidth: "720px",
              }}
            >
              {HEADLINE_LINES.map((words, li) => (
                <span key={li} style={{ display: "block" }}>
                  {words.map((word, wi) => (
                    <span key={wi}>
                      <span
                        aria-hidden
                        className="hero-headline-word inline-block"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {word}
                      </span>
                      {wi < words.length - 1 ? "\u00A0" : null}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Signature — Marseille */}
            <div
              id="hero-subtitle"
              className="hero-reveal flex items-center gap-4"
              style={{ marginTop: "36px" }}
            >
              <span
                aria-hidden
                style={{
                  width: 44,
                  height: 1,
                  background: "rgba(242, 237, 228, 0.35)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2vw, 26px)",
                  letterSpacing: "-0.01em",
                  color: "#F2EDE4",
                }}
              >
                Marseille.
              </span>
            </div>

            {/* Tech stack line */}
            <p
              className="hero-reveal"
              style={{
                fontFamily: MONO,
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "rgba(242, 237, 228, 0.4)",
                marginTop: "28px",
                textTransform: "uppercase",
              }}
            >
              Mobile · Web · Backend · IA
            </p>

            {/* CTAs */}
            <div
              id="hero-buttons"
              className="hero-reveal flex flex-row justify-center md:justify-start"
              style={{ marginTop: "44px", gap: "14px" }}
            >
              <a
                href="#apps"
                className="metal-surface inline-flex items-center justify-center"
                style={{
                  color: "#0A0A0A",
                  borderRadius: "4px",
                  padding: "15px 28px",
                  fontWeight: 700,
                  fontSize: "13px",
                  fontFamily: MONO,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.35) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 8px 24px -10px rgba(0,0,0,0.5)",
                }}
              >
                Voir nos apps
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center transition-colors hover:bg-paper/5"
                style={{
                  background: "transparent",
                  color: "#F2EDE4",
                  border: "1px solid rgba(242, 237, 228, 0.25)",
                  borderRadius: "4px",
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: "13px",
                  fontFamily: MONO,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Nous écrire
              </a>
            </div>
          </div>

          {/* Right column — 3D scene */}
          <div className="w-full md:w-[45%] h-[420px] md:h-[560px]">
            <HeroScene />
          </div>
        </div>
        <HeroParallax />
        <CursorTrail />
      </section>
    </>
  );
}
