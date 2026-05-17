"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

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
        "Salut ! 👋 Je suis l'assistant de Hichame. Qu'est-ce que tu veux savoir ?",
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
          content: "Désolé, une erreur est survenue. Réessayez.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-[380px] h-[520px] rounded-2xl glass flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 8px 60px rgba(0,0,0,0.5), 0 0 40px rgba(147,51,234,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-accent-purple flex items-center justify-center text-white text-xs font-bold">
                  △
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    ARQDEV Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    <span className="text-[10px] text-accent-cyan font-mono">
                      en ligne
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[11px] font-mono leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-brand to-accent-purple text-white rounded-br-sm"
                        : "bg-white/[0.06] border border-brand/[0.15] text-white/75 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-brand/[0.15] rounded-bl-sm">
                    <Loader2 className="w-4 h-4 text-brand animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-brand/[0.08]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Votre message..."
                  className="flex-1 bg-white/[0.06] border border-brand/[0.15] rounded-lg px-4 py-2.5 text-[11px] font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-brand/40"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center text-white hover:bg-brand-glow transition-colors disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]"
        style={{
          background: "linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)",
          boxShadow: "0 0 30px rgba(147,51,234,0.35), 0 0 60px rgba(147,51,234,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
