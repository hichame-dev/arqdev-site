"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const MONO = "var(--font-space-mono), ui-monospace, monospace";
const INTER = "var(--font-inter), system-ui, sans-serif";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour 👋 Je suis l'assistant ARQDEV. Une question sur le studio, nos services ou votre projet ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, une erreur est survenue. Réessayez — ou écrivez-nous à arqdev@outlook.fr.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 flex flex-col overflow-hidden w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100dvh-140px)]"
            style={{
              background: "rgba(10, 10, 10, 0.96)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(242, 237, 228, 0.12)",
              borderRadius: "16px",
              boxShadow:
                "0 8px 60px rgba(0,0,0,0.6), 0 0 40px rgba(138, 120, 85, 0.08)",
            }}
            role="dialog"
            aria-label="Assistant ARQDEV"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(242, 237, 228, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="metal-surface flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    color: "#0A0A0A",
                    fontFamily: MONO,
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  A
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      color: "#F2EDE4",
                      textTransform: "uppercase",
                    }}
                  >
                    Assistant ARQDEV
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="animate-pulse"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#E8D5A8",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "10px",
                        color: "rgba(232, 213, 168, 0.8)",
                      }}
                    >
                      en ligne
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer l'assistant"
                className="transition-colors"
                style={{
                  color: "rgba(242, 237, 228, 0.4)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 16px",
                      borderRadius: 14,
                      fontFamily: INTER,
                      fontSize: "13px",
                      lineHeight: 1.55,
                      ...(msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #E8D5A8 0%, #9A8055 100%)",
                            color: "#0A0A0A",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: "rgba(242, 237, 228, 0.06)",
                            border: "1px solid rgba(242, 237, 228, 0.1)",
                            color: "rgba(242, 237, 228, 0.85)",
                            borderBottomLeftRadius: 4,
                          }),
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: 14,
                      borderBottomLeftRadius: 4,
                      background: "rgba(242, 237, 228, 0.06)",
                      border: "1px solid rgba(242, 237, 228, 0.1)",
                    }}
                  >
                    <Loader2
                      size={16}
                      className="animate-spin"
                      style={{ color: "#E8D5A8" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="px-4 py-3"
              style={{ borderTop: "1px solid rgba(242, 237, 228, 0.08)" }}
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Votre message…"
                  aria-label="Votre message"
                  className="flex-1 focus:outline-none"
                  style={{
                    background: "rgba(242, 237, 228, 0.05)",
                    border: "1px solid rgba(242, 237, 228, 0.12)",
                    borderRadius: 8,
                    padding: "10px 16px",
                    fontFamily: INTER,
                    fontSize: "13px",
                    color: "#F2EDE4",
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  aria-label="Envoyer"
                  className="metal-surface flex items-center justify-center transition-opacity disabled:opacity-30"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    border: "none",
                    color: "#0A0A0A",
                    cursor: "pointer",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant ARQDEV"}
        aria-expanded={isOpen}
        className="metal-surface flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          color: "#0A0A0A",
          cursor: "pointer",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.35) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 10px 30px -8px rgba(0,0,0,0.6)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="flex"
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex"
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
