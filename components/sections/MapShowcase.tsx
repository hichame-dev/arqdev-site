"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const MONO = "var(--font-space-mono), ui-monospace, monospace";

// Tracé stylisé Marseille → Lyon → Zaragoza dans un viewBox 1000×562.
// Positions resserrées vers le centre : le viewBox est rogné en `slice` et les
// bords sont mangés par les fondus — décoratif, pas une vraie projection.
const CITIES = [
  { name: "Marseille", x: 845, y: 340 },
  { name: "Lyon", x: 775, y: 165 },
  { name: "Zaragoza", x: 200, y: 430 },
];

// Villes de contexte, sans label — juste pour donner une texture de carte.
const CONTEXT_DOTS = [
  { x: 690, y: 320 }, // Montpellier
  { x: 440, y: 330 }, // Toulouse
  { x: 520, y: 465 }, // Barcelona
  { x: 905, y: 215 }, // Genève
  { x: 310, y: 225 }, // Bordeaux
];

const ROUTE_PATH = "M 845 340 L 775 165 L 200 430";

type Feature = { label: string; icon: string };
const FEATURES: Feature[] = [
  { label: "Géolocalisation temps réel", icon: "/lottie/location.lottie" },
  { label: "Routing personnalisé", icon: "/lottie/routing.lottie" },
  { label: "Mode hors-ligne", icon: "/lottie/offline.lottie" },
];

function FeaturePill({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(10,10,10,0.75)",
        border: "1px solid rgba(138, 120, 85,0.35)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "100px",
        padding: "10px 24px 10px 16px",
        fontFamily: MONO,
        fontSize: "11px",
        color: "rgba(255,255,255,0.75)",
        letterSpacing: "0.02em",
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DotLottieReact
          src={feature.icon}
          loop
          autoplay
          style={{ width: 32, height: 32 }}
        />
      </span>
      {feature.label}
    </motion.span>
  );
}

export default function MapShowcase() {
  return (
    <section
      id="map"
      style={{
        background: "#0A0A0A",
        minHeight: "80vh",
        overflow: "hidden",
        position: "relative",
        paddingBottom: "96px",
      }}
    >
      <style>{`
        @keyframes map-route-dash {
          to { stroke-dashoffset: -28; }
        }
        @keyframes map-marker-pulse {
          0% { r: 8; opacity: 0.7; }
          100% { r: 26; opacity: 0; }
        }
        @keyframes map-gps-travel {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes map-gps-pulse {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .map-gps-dot {
          offset-path: path('${ROUTE_PATH}');
          offset-rotate: 0deg;
          animation: map-gps-travel 9s linear infinite;
        }
      `}</style>

      <div
        className="map-container"
        style={{ position: "relative", width: "100%", height: "70vh" }}
      >
        <svg
          aria-hidden
          viewBox="0 0 1000 562"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            {/* Graticule discret façon fond de carte */}
            <pattern id="map-grid" width="76" height="76" patternUnits="userSpaceOnUse">
              <path
                d="M 76 0 L 0 0 0 76"
                fill="none"
                stroke="rgba(242, 237, 228, 0.045)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="map-glow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="rgba(138, 120, 85, 0.10)" />
              <stop offset="100%" stopColor="rgba(138, 120, 85, 0)" />
            </radialGradient>
          </defs>

          <rect width="1000" height="562" fill="url(#map-grid)" />
          <rect width="1000" height="562" fill="url(#map-glow)" />

          {/* Villes de contexte */}
          {CONTEXT_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="3" fill="rgba(242, 237, 228, 0.18)" />
          ))}

          {/* Tracé de l'itinéraire — base + pointillés défilants */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#8A7855"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#8A7855"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            strokeDasharray="10 18"
            style={{ animation: "map-route-dash 1.4s linear infinite" }}
          />

          {/* Étapes : pulsation + point + label */}
          {CITIES.map((c, i) => (
            <g key={c.name}>
              <circle
                cx={c.x}
                cy={c.y}
                r="8"
                fill="none"
                stroke="#8A7855"
                strokeWidth="1.5"
                style={{
                  animation: `map-marker-pulse 2s ease-out ${i * 0.5}s infinite`,
                }}
              />
              <circle cx={c.x} cy={c.y} r="4" fill="#8A7855" />
              <text
                x={c.x}
                y={c.y - 18}
                textAnchor="middle"
                fill="rgba(242, 237, 228, 0.55)"
                style={{
                  fontFamily: MONO,
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {c.name}
              </text>
            </g>
          ))}

          {/* Dot GPS qui parcourt l'itinéraire (offset-path CSS,
              désactivé automatiquement par prefers-reduced-motion) */}
          <g className="map-gps-dot">
            <circle
              r="7"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              style={{ animation: "map-gps-pulse 1s ease-out infinite" }}
            />
            <circle r="3.5" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Edge fades — 4 sides */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "linear-gradient(to bottom, #0A0A0A 0%, transparent 35%, transparent 65%, #0A0A0A 100%), linear-gradient(to right, #0A0A0A 0%, transparent 25%, transparent 75%, #0A0A0A 100%)",
          }}
        />

        {/* Top text overlay with gradient backdrop */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            zIndex: 3,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.92), transparent)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: "#8A7855",
              letterSpacing: "0.15em",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Technologie
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "#FFFFFF",
              marginBottom: "14px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Maps &amp; GPS natifs
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              lineHeight: 1.6,
            }}
          >
            Chaque app ARQDEV intègre Mapbox nativement. Tracking temps
            réel, routing personnalisé, mode hors-ligne.
          </p>
        </div>
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          marginTop: "48px",
          padding: "0 24px",
        }}
      >
        {FEATURES.map((f, i) => (
          <FeaturePill key={f.label} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
