"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href).map((href) =>
      document.querySelector(href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl border-b border-brand/[0.08]"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        background: "linear-gradient(180deg, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.85) 100%)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5), 0 0 40px rgba(147,51,234,0.06), inset 0 -1px 0 rgba(147,51,234,0.1)",
      } : undefined}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleClick("#hero")}
          className="group flex items-center gap-1 font-extrabold text-lg tracking-[4px] text-white"
        >
          AR
          <span className="text-brand transition-colors group-hover:text-brand-glow">
            Δ
          </span>
          DEV
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-sm font-medium transition-colors ${
                activeSection === link.href
                  ? "text-brand"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleClick("#contact")}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            style={{ background: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)", boxShadow: "0 0 15px rgba(147,51,234,0.2)" }}
          >
            Contact
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black/60"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d14]/95 backdrop-blur-xl border-b border-brand/[0.1] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-left text-sm font-medium py-2 transition-colors ${
                    activeSection === link.href
                      ? "text-brand"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleClick("#contact")}
                className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold bg-brand text-white text-center"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
