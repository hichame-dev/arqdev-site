"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypingText({
  texts,
  speed = 50,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className,
  style,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    if (!isDeleting && displayed.length < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && displayed.length === current.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, deleteSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [displayed, textIndex, isDeleting, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className} style={style}>
      {displayed}
      <span className="animate-typing-cursor text-brand">|</span>
    </span>
  );
}
