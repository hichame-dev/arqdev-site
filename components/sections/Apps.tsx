"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import PhoneMockup from "@/components/ui/PhoneMockup";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-display), system-ui, sans-serif";
const INTER = "var(--font-inter), system-ui, sans-serif";

type Metric = { value: string; label: string };

type AppEntry = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  stack: string;
  metrics: Metric[];
  downloads?: { ios?: string; android?: string };
};

const apps: AppEntry[] = [
  {
    index: "01",
    name: "MotorQuest",
    tagline: "Ride Beyond",
    description:
      "GPS moto gamifié. Trackez vos sessions, débloquez des achievements, affrontez votre historique.",
    image: "/brand/MotorQuest.jpg",
    stack: "React Native · Expo · Mapbox · Firebase",
    metrics: [
      { value: "iOS / Android", label: "plateformes" },
      { value: "< 2 s", label: "cold start" },
      { value: "Live", label: "en production" },
    ],
  },
  {
    index: "02",
    name: "RoadtripPark",
    tagline: "Plan & Park",
    description:
      "Planifiez vos road trips en van. Itinéraires curatés, parkings vérifiés, navigation intégrée.",
    image: "/brand/RoadtripPark.jpg",
    stack: "React Native · Node.js · MongoDB · AWS",
    metrics: [
      { value: "iOS / Android", label: "plateformes" },
      { value: "Offline-first", label: "architecture" },
      { value: "Beta", label: "phase" },
    ],
    // TODO : remplacer par les vraies URLs des stores à la sortie de la beta.
    downloads: {
      ios: "",
      android: "",
    },
  },
];

/* Official Apple logo — bitten apple silhouette (monochrome). */
function AppleIcon() {
  return (
    <svg
      viewBox="0 0 384 512"
      width="18"
      height="20"
      aria-hidden
      fill="currentColor"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM229.1 100.9c22.5-26.7 20.5-51 19.8-59.7-19.8 1.2-42.7 13.5-55.8 28.6-14.4 16.2-22.9 36.2-21.1 58.1 21.4 1.7 40.9-9.3 57.1-27z" />
    </svg>
  );
}

/* Official Google Play triangle — rendu officiel à 4 facettes. */
function AndroidIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      width="18"
      height="20"
      aria-hidden
    >
      <defs>
        <linearGradient id="gp-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00A0FF" />
          <stop offset="100%" stopColor="#00E2FF" />
        </linearGradient>
        <linearGradient id="gp-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFCE00" />
          <stop offset="100%" stopColor="#FFBD00" />
        </linearGradient>
        <linearGradient id="gp-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="gp-d" x1="0" y1="0" x2="1" y2="-1">
          <stop offset="0%" stopColor="#32A071" />
          <stop offset="100%" stopColor="#2DA771" />
        </linearGradient>
      </defs>
      {/* Left blue panel */}
      <path
        fill="url(#gp-a)"
        d="M30 30c-5 5-8 13-8 23v406c0 10 3 18 8 23l255-255z"
      />
      {/* Right yellow panel */}
      <path
        fill="url(#gp-b)"
        d="M370 369l-85-85 85-85 85 48c24 14 24 36 0 50z"
      />
      {/* Bottom red panel */}
      <path
        fill="url(#gp-c)"
        d="M285 284l85 85L30 482c-10 6-19 5-25 2z"
      />
      {/* Top green panel */}
      <path
        fill="url(#gp-d)"
        d="M285 284L5 30c6-4 15-4 25 1l340 169z"
      />
    </svg>
  );
}

export default function Apps() {
  return (
    <section
      id="apps"
      className="py-28 sm:py-40"
      style={{ background: "#0A0A0A" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
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
                Applications
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
              Des produits,
              <br />
              pas des démos.
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-col gap-28 md:gap-40">
          {apps.map((app, idx) => (
            <motion.div
              key={app.name}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="flex justify-center">
                <PhoneMockup imageSrc={app.image} alt={`${app.name} screenshot`} />
              </div>

              <div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      color: "#8A7855",
                      fontWeight: 700,
                    }}
                  >
                    {app.index}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      color: "rgba(242, 237, 228, 0.45)",
                      textTransform: "uppercase",
                    }}
                  >
                    {app.tagline}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: "clamp(34px, 4vw, 52px)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1.02,
                    color: "#F2EDE4",
                  }}
                  className="mb-6"
                >
                  {app.name}
                </h3>

                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: "17px",
                    lineHeight: 1.65,
                    color: "rgba(242, 237, 228, 0.65)",
                  }}
                  className="mb-10 max-w-md"
                >
                  {app.description}
                </p>

                <div
                  className="grid grid-cols-3 gap-px mb-10"
                  style={{ background: "rgba(242, 237, 228, 0.1)" }}
                >
                  {app.metrics.map((m) => (
                    <div
                      key={m.label}
                      style={{ background: "#0A0A0A", padding: "18px 14px" }}
                    >
                      <p
                        style={{
                          fontFamily: DISPLAY,
                          fontWeight: 700,
                          fontSize: "18px",
                          letterSpacing: "-0.02em",
                          color: "#F2EDE4",
                          lineHeight: 1.1,
                        }}
                      >
                        {m.value}
                      </p>
                      <p
                        style={{
                          fontFamily: MONO,
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          color: "rgba(242, 237, 228, 0.45)",
                          textTransform: "uppercase",
                          marginTop: 6,
                        }}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "rgba(242, 237, 228, 0.45)",
                  }}
                  className={app.downloads ? "mb-8" : undefined}
                >
                  {app.stack}
                </p>

                {app.downloads && (
                  <div className="flex flex-wrap items-center gap-3">
                    {(
                      [
                        { key: "ios", icon: <AppleIcon />, label: "iOS" },
                        { key: "android", icon: <AndroidIcon />, label: "Android" },
                      ] as const
                    ).map(({ key, icon, label }) => {
                      const href = app.downloads?.[key];
                      if (href === undefined) return null;
                      const inner = (
                        <>
                          {icon}
                          <span
                            style={{
                              fontFamily: MONO,
                              fontSize: "10px",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              lineHeight: 1,
                            }}
                          >
                            {label}
                          </span>
                        </>
                      );
                      const boxStyle: React.CSSProperties = {
                        background: "rgba(242, 237, 228, 0.06)",
                        border: "1px solid rgba(242, 237, 228, 0.15)",
                        color: "#F2EDE4",
                        padding: "10px 16px",
                        borderRadius: "6px",
                      };
                      // Pas encore d'URL store : badge non cliquable plutôt
                      // qu'un lien mort.
                      return href ? (
                        <a
                          key={key}
                          href={href}
                          aria-label={`Télécharger sur ${key === "ios" ? "l'App Store" : "Google Play"}`}
                          className="inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
                          style={boxStyle}
                        >
                          {inner}
                        </a>
                      ) : (
                        <span
                          key={key}
                          className="inline-flex items-center gap-2"
                          style={{ ...boxStyle, opacity: 0.55 }}
                        >
                          {inner}
                          <span
                            style={{
                              fontFamily: MONO,
                              fontSize: "9px",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#E8D5A8",
                              lineHeight: 1,
                            }}
                          >
                            · Bientôt
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
