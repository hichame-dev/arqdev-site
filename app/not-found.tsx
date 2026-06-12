import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        color: "#F2EDE4",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-space-mono), ui-monospace, monospace",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8A7855",
          marginBottom: 16,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(36px, 5vw, 64px)",
          letterSpacing: "-0.04em",
          marginBottom: 24,
        }}
      >
        Page introuvable.
      </h1>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-space-mono), ui-monospace, monospace",
          fontSize: "12px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#F2EDE4",
          borderBottom: "1px solid rgba(242, 237, 228, 0.35)",
          paddingBottom: 4,
        }}
      >
        → Retour à l&apos;accueil
      </Link>
    </main>
  );
}
