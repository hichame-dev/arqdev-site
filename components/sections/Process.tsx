"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const INTER = "var(--font-inter), system-ui, sans-serif";
const DISPLAY = "var(--font-display), system-ui, sans-serif";

const steps = [
  {
    number: "01",
    title: "Cadrage",
    description:
      "On commence par comprendre. Utilisateurs, contraintes, métriques. Avant d'écrire une ligne.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Architecture pensée pour tenir. Code typé, APIs documentées, itérations courtes, tests qui comptent.",
  },
  {
    number: "03",
    title: "Livraison",
    description:
      "Stores, scaling, observabilité. On déploie, on mesure, on reste disponibles après le lancement.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
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
                  color: "#F2EDE4",
                  textTransform: "uppercase",
                }}
              >
                Process
              </p>
            </div>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: "clamp(40px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                color: "#F2EDE4",
              }}
            >
              Trois étapes.
              <br />
              Aucune bavure.
            </h2>
          </div>
          <p
            style={{
              fontFamily: INTER,
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(242, 237, 228, 0.55)",
              maxWidth: "340px",
            }}
          >
            Une méthode simple, éprouvée sur chaque projet. Pas de cérémonie,
            pas de slides — du produit qui livre.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(242, 237, 228, 0.08)" }}
        >
          {steps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeInUp}
              className="group relative"
              style={{
                background: "#0A0A0A",
                padding: "48px 36px",
                minHeight: "320px",
                transition: "background 0.3s ease",
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#8A7855",
                    fontWeight: 700,
                  }}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden
                  style={{
                    flex: 1,
                    marginLeft: 16,
                    height: 1,
                    background: "rgba(242, 237, 228, 0.1)",
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  fontSize: "32px",
                  letterSpacing: "-0.025em",
                  color: "#F2EDE4",
                  lineHeight: 1.1,
                }}
                className="mb-5"
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(242, 237, 228, 0.6)",
                }}
              >
                {step.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
