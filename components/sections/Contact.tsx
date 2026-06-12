"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-display), system-ui, sans-serif";
const INTER = "var(--font-inter), system-ui, sans-serif";

type FormStatus = "idle" | "sending" | "sent" | "fallback";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  // Envoi via /api/contact (Resend). Si l'API n'est pas configurée ou
  // échoue, on retombe sur le client mail avec un message pré-rempli.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      const subject = encodeURIComponent(`Projet — ${name}`);
      const body = encodeURIComponent(
        `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      );
      window.location.href = `mailto:arqdev@outlook.fr?subject=${subject}&body=${body}`;
      setStatus("fallback");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center py-28 sm:py-40 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                color: "#F2EDE4",
                textTransform: "uppercase",
              }}
            >
              Contact
            </p>
          </div>

          <motion.h2
            variants={fadeInUp}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(44px, 6vw, 88px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.98,
              color: "#F2EDE4",
              maxWidth: "760px",
            }}
          >
            Un projet
            <br />
            en tête&nbsp;?
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Left — direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(242, 237, 228, 0.45)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Écrivez-nous
            </p>
            <a
              href="mailto:arqdev@outlook.fr"
              className="inline-block hover:text-signal transition-colors"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 600,
                fontSize: "clamp(26px, 3vw, 40px)",
                letterSpacing: "-0.02em",
                color: "#F2EDE4",
                lineHeight: 1.1,
                borderBottom: "1px solid rgba(242, 237, 228, 0.25)",
                paddingBottom: 6,
              }}
            >
              arqdev@outlook.fr
            </a>

            <div className="mt-12 space-y-3">
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: "15px",
                  color: "rgba(242, 237, 228, 0.6)",
                  lineHeight: 1.65,
                  maxWidth: "340px",
                }}
              >
                Réponse sous 24&nbsp;h ouvrées. Nous échangeons sur votre
                projet, puis revenons vers vous avec une proposition claire.
              </p>

              <div className="flex items-center gap-6 pt-6">
                <a
                  href="https://www.linkedin.com/in/hichame-el-ghaouti-874b31376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(242, 237, 228, 0.55)",
                  }}
                >
                  → LinkedIn
                </a>
                <a
                  href="https://github.com/hichame-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(242, 237, 228, 0.55)",
                  }}
                >
                  → GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(242, 237, 228, 0.45)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full focus:outline-none transition-colors"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid rgba(242, 237, 228, 0.2)",
                  color: "#F2EDE4",
                  padding: "10px 0",
                  fontFamily: INTER,
                  fontSize: "16px",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(242, 237, 228, 0.45)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full focus:outline-none transition-colors"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid rgba(242, 237, 228, 0.2)",
                  color: "#F2EDE4",
                  padding: "10px 0",
                  fontFamily: INTER,
                  fontSize: "16px",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(242, 237, 228, 0.45)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Projet
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full focus:outline-none transition-colors resize-none"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid rgba(242, 237, 228, 0.2)",
                  color: "#F2EDE4",
                  padding: "10px 0",
                  fontFamily: INTER,
                  fontSize: "16px",
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.98 }}
              className="metal-surface inline-flex items-center justify-center disabled:opacity-60"
              style={{
                color: "#0A0A0A",
                padding: "16px 32px",
                fontFamily: MONO,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                border: "none",
                borderRadius: "4px",
                marginTop: 16,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.35) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 8px 24px -10px rgba(0,0,0,0.5)",
              }}
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
            </motion.button>

            <p
              role="status"
              aria-live="polite"
              style={{
                fontFamily: INTER,
                fontSize: "14px",
                color: "rgba(242, 237, 228, 0.6)",
                lineHeight: 1.6,
                minHeight: "1.6em",
                visibility:
                  status === "sent" || status === "fallback"
                    ? "visible"
                    : "hidden",
              }}
            >
              {status === "sent" ? (
                <>Message envoyé ! On vous répond sous 24&nbsp;h ouvrées.</>
              ) : (
                <>
                  Votre client email s&apos;ouvre avec le message pré-rempli.
                  Si rien ne se passe, écrivez-nous directement à{" "}
                  <a
                    href="mailto:arqdev@outlook.fr"
                    style={{ color: "#E8D5A8", textDecoration: "underline" }}
                  >
                    arqdev@outlook.fr
                  </a>
                  .
                </>
              )}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
