"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Wordmark letters around the triangle (which replaces the Q).
// Order: A R [Δ] D E V
const LETTERS_BEFORE = "AR".split("");
const LETTERS_AFTER = "DEV".split("");

function revealHero(animated: boolean) {
  const headline = document.getElementById("hero-headline");
  const headlineWords = Array.from(
    document.querySelectorAll<HTMLSpanElement>(".hero-headline-word"),
  );
  const subtitle = document.getElementById("hero-subtitle");
  const buttons = document.getElementById("hero-buttons");
  const heroLogo = document.getElementById("hero-logo");
  const linesSvg = document.getElementById("hero-lines");
  const lineEls = linesSvg
    ? (Array.from(
        linesSvg.querySelectorAll("line"),
      ) as unknown as SVGLineElement[])
    : [];

  if (!animated) {
    [headline, subtitle, buttons, heroLogo].forEach((el) => {
      if (el) {
        el.style.opacity = "1";
        gsap.set(el, { clearProps: "transform,filter" });
      }
    });
    headlineWords.forEach((w) => {
      gsap.set(w, { opacity: 1, y: 0, clearProps: "transform" });
    });
    lineEls.forEach((line) => {
      gsap.set(line, { strokeDasharray: "none", strokeDashoffset: 0 });
    });
    return;
  }

  // Hero logo — quick fade in first
  if (heroLogo) {
    gsap.fromTo(
      heroLogo,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }

  // Geometric lines — draw in gradually behind the title
  lineEls.forEach((line) => {
    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.4,
      delay: 0.2,
      ease: "power2.out",
    });
  });

  // Headline — word by word cascade
  if (headline) gsap.set(headline, { opacity: 1 });
  if (headlineWords.length > 0) {
    gsap.fromTo(
      headlineWords,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.3,
      },
    );
  }

  // Subtitle — blur fade in
  if (subtitle) {
    gsap.fromTo(
      subtitle,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.9,
      },
    );
  }

  // Buttons — fade up after the subtitle finishes
  if (buttons) {
    gsap.fromTo(
      buttons,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.7,
      },
    );
  }
}

export default function IntroAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const triOutlineRef = useRef<SVGPolygonElement>(null);
  const triFillRef = useRef<SVGPolygonElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const alreadyPlayed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("intro-played") === "true";
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skip path — overlay hidden, reveal hero instantly, unlock body
    if (alreadyPlayed || prefersReduced) {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      root.classList.add("intro-played");
      document.body.style.overflow = "";
      revealHero(false);
      if (prefersReduced) {
        sessionStorage.setItem("intro-played", "true");
      }
      return;
    }

    // Play path — lock scroll
    document.body.style.overflow = "hidden";

    const triOutline = triOutlineRef.current;
    const triFill = triFillRef.current;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const logoWrap = logoWrapRef.current;
    const overlay = overlayRef.current;

    // Initial states
    if (triOutline) {
      const len = triOutline.getTotalLength();
      gsap.set(triOutline, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    }
    if (triFill) gsap.set(triFill, { opacity: 0 });
    gsap.set(letters, { y: 20, opacity: 0 });

    // Navbar target padding: 40px on sm+, 24px below
    const isSm =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 640px)").matches;
    const targetLeft = isSm ? 40 : 24;

    // Dynamic scale: measure logoWrap and compute ratio to hit navbar size.
    // Navbar wordmark ≈ text-sm (14px) Space Grotesk 700 line-height 1 → ~18px box.
    const navbarTargetHeight = 18;
    const logoBox = logoWrap?.getBoundingClientRect();
    const dynamicScale = logoBox
      ? Math.min(navbarTargetHeight / logoBox.height, 0.5)
      : 0.12;
    // Center shrunken logo vertically within 60px navbar
    const targetTop = Math.max((60 - navbarTargetHeight) / 2, 12);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("intro-played", "true");
        root.classList.add("intro-played");
        document.body.style.overflow = "";
        if (overlay) overlay.style.display = "none";
      },
    });

    // Step 1: Black screen 0 → 0.3s (hold)
    tl.to({}, { duration: 0.3 }, 0);

    // Step 2: Triangle outline draw 0.3 → 1.2 (0.9s ease-in-out)
    if (triOutline) {
      tl.to(
        triOutline,
        { strokeDashoffset: 0, duration: 0.9, ease: "sine.inOut" },
        0.3,
      );
    }
    // Fill fades in partway through outline draw
    if (triFill) {
      tl.to(
        triFill,
        { opacity: 1, duration: 0.4, ease: "power2.inOut" },
        0.85,
      );
    }

    // Step 3: Letters reveal 1.0 → ~1.6 (stagger 0.06)
    tl.to(
      letters,
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.06,
      },
      1.0,
    );

    // Step 4: Shrink + move logo+wordmark to navbar position 1.6 → 2.2 (0.6s)
    if (logoWrap) {
      tl.to(
        logoWrap,
        {
          top: targetTop,
          left: targetLeft,
          xPercent: 0,
          yPercent: 0,
          scale: dynamicScale,
          transformOrigin: "0% 0%",
          duration: 0.6,
          ease: "power2.inOut",
        },
        1.6,
      );
    }

    // Step 5: Hero reveal 2.0 → 2.8 (Headline slide + subtitle/buttons fade + lines draw)
    tl.call(() => revealHero(true), [], 2.0);

    // Overlay background fades to transparent so Hero is visible underneath
    if (overlay) {
      tl.to(
        overlay,
        {
          backgroundColor: "rgba(10, 10, 10, 0)",
          duration: 0.5,
          ease: "power2.out",
        },
        2.0,
      );
      // Overlay (with shrunken intro logo) fades out entirely at the end
      tl.to(
        overlay,
        { opacity: 0, duration: 0.3, ease: "power2.out" },
        2.5,
      );
    }

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 flex pointer-events-none"
      style={{ background: "#0A0A0A", zIndex: 9999 }}
    >
      <div
        ref={logoWrapRef}
        className="font-heading text-white flex items-center absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          fontSize: "clamp(72px, 14vw, 160px)",
          lineHeight: 1,
          willChange: "transform, top, left",
        }}
      >
        {LETTERS_BEFORE.map((char, i) => (
          <span
            key={`b-${i}`}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {char}
          </span>
        ))}
        <svg
          width="0.9em"
          height="0.9em"
          viewBox="0 0 40 40"
          aria-hidden
          style={{ display: "inline-block", margin: "0 0.04em" }}
        >
          <defs>
            <linearGradient
              id="intro-tri-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F2EDE4" />
              <stop offset="100%" stopColor="#8A7855" />
            </linearGradient>
          </defs>
          {/* Outline drawn first (Step 2) */}
          <polygon
            ref={triOutlineRef}
            points="20,4 36,36 4,36"
            stroke="#F2EDE4"
            strokeWidth={1}
            fill="none"
          />
          {/* Fill fades in on top of outline */}
          <polygon
            ref={triFillRef}
            points="20,4 36,36 4,36"
            fill="url(#intro-tri-fill)"
          />
        </svg>
        {LETTERS_AFTER.map((char, i) => {
          const idx = LETTERS_BEFORE.length + i;
          return (
            <span
              key={`a-${i}`}
              ref={(el) => {
                lettersRef.current[idx] = el;
              }}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
