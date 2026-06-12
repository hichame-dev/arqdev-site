"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#0A0A0A",
          color: "#F2EDE4",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8A7855",
            marginBottom: 16,
          }}
        >
          500
        </p>
        <h1
          style={{
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Une erreur est survenue.
        </h1>
        <button
          onClick={() => reset()}
          style={{
            background: "#8A7855",
            color: "#F2EDE4",
            padding: "12px 24px",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
