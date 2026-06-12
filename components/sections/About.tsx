"use client";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/animations";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-display), system-ui, sans-serif";
const INTER = "var(--font-inter), system-ui, sans-serif";

const values = [
  { num: "01", text: "Architecture avant le code." },
  { num: "02", text: "Chaque fonctionnalité justifiée par l'usage." },
  { num: "03", text: "Du prototype au store en quelques semaines." },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{ background: "#F2EDE4" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              aria-hidden
              style={{ width: 36, height: 2, background: "linear-gradient(90deg, #3D3220 0%, #E8D5A8 50%, #3D3220 100%)", borderRadius: 1 }}
            />
            <p
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#0A0A0A",
                textTransform: "uppercase",
              }}
            >
              Le studio
            </p>
          </div>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 72px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              color: "#0A0A0A",
            }}
          >
            Pensé produit.
            <br />
            Livré au cordeau.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p
              style={{
                fontFamily: INTER,
                fontSize: "19px",
                lineHeight: 1.6,
                color: "rgba(10, 10, 10, 0.82)",
                maxWidth: "480px",
              }}
            >
              Studio de développement fondé à Marseille — mobile, web, backend
              et IA. Une seule exigence&nbsp;: livrer des produits fiables,
              performants et pensés pour durer. Sans dette technique cachée,
              sans promesse intenable.
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {values.map((v) => (
              <div
                key={v.num}
                className="flex gap-6 items-start pb-6"
                style={{ borderBottom: "1px solid rgba(10, 10, 10, 0.1)" }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "#8A7855",
                    fontWeight: 700,
                    marginTop: 6,
                  }}
                >
                  {v.num}
                </span>
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 500,
                    fontSize: "19px",
                    letterSpacing: "-0.015em",
                    color: "#0A0A0A",
                    lineHeight: 1.3,
                  }}
                >
                  {v.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <AnimatedCounter />
      </div>
    </section>
  );
}
