"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const INTER = "var(--font-inter), system-ui, sans-serif";
const DISPLAY = "var(--font-display), system-ui, sans-serif";

type Capability = {
  number: string;
  discipline: string;
  line: string;
  stack: string[];
};

const capabilities: Capability[] = [
  {
    number: "01",
    discipline: "Mobile",
    line: "Applications natives et cross-platform, du prototype au store.",
    stack: ["React Native", "Expo", "Swift", "Kotlin", "Mapbox", "Firebase"],
  },
  {
    number: "02",
    discipline: "Web",
    line: "Sites vitrines, dashboards et produits web performants.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    number: "03",
    discipline: "Backend",
    line: "APIs typées, bases solides, infra reproductible.",
    stack: ["Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"],
  },
  {
    number: "04",
    discipline: "IA & Automatisation",
    line: "Agents, chatbots, workflows — l'IA intégrée à vos produits et vos process. Formation de vos équipes incluse.",
    stack: ["Claude API", "Groq", "MCP", "Agents IA", "n8n", "Prompt Engineering"],
  },
  {
    number: "05",
    discipline: "Optimisation",
    line: "Sites existants remis au niveau — perf, SEO, accessibilité.",
    stack: ["Lighthouse", "Core Web Vitals", "Bundle analysis", "SEO technique"],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{ background: "#F2EDE4" }}
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
                style={{
                  width: 36,
                  height: 2,
                  background:
                    "linear-gradient(90deg, #3D3220 0%, #E8D5A8 50%, #3D3220 100%)",
                  borderRadius: 1,
                }}
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
                Compétences
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
              Toute la pile.
            </h2>
          </div>
          <p
            style={{
              fontFamily: INTER,
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(10, 10, 10, 0.6)",
              maxWidth: "360px",
            }}
          >
            Mobile en premier, mais pas que. Web, backend, intégration IA et
            optimisation — toute la chaîne quand le projet le demande.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ borderTop: "1px solid rgba(10, 10, 10, 0.12)" }}
        >
          {capabilities.map((cap) => (
            <motion.article
              key={cap.number}
              variants={fadeInUp}
              className="group grid grid-cols-12 gap-6 py-8 sm:py-10 transition-colors"
              style={{
                borderBottom: "1px solid rgba(10, 10, 10, 0.12)",
              }}
            >
              <div className="col-span-12 sm:col-span-2 flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#8A7855",
                    fontWeight: 700,
                  }}
                >
                  {cap.number}
                </span>
                <span
                  aria-hidden
                  style={{
                    height: 1,
                    flex: 1,
                    background: "rgba(10, 10, 10, 0.15)",
                    maxWidth: 24,
                  }}
                  className="hidden sm:block"
                />
              </div>

              <div className="col-span-12 sm:col-span-3">
                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: "clamp(26px, 2.6vw, 36px)",
                    letterSpacing: "-0.03em",
                    color: "#0A0A0A",
                    lineHeight: 1,
                  }}
                >
                  {cap.discipline}
                </h3>
              </div>

              <div className="col-span-12 sm:col-span-4">
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "rgba(10, 10, 10, 0.72)",
                  }}
                >
                  {cap.line}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-3 flex flex-wrap items-start gap-x-2 gap-y-1">
                {cap.stack.map((tech, i) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: "rgba(10, 10, 10, 0.6)",
                    }}
                  >
                    {tech}
                    {i < cap.stack.length - 1 && (
                      <span
                        aria-hidden
                        style={{ color: "rgba(10, 10, 10, 0.25)" }}
                      >
                        {" · "}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
