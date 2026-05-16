"use client";

import { TECH_STACK_ROW1, TECH_STACK_ROW2, TechItem } from "@/lib/constants";

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: TechItem[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, #000000, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, #000000, transparent)" }} />

      <div
        className={`flex gap-12 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-3 shrink-0"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: tech.color,
                boxShadow: `0 0 6px ${tech.color}60, 0 0 16px ${tech.color}25`,
              }}
            />
            <span className="font-mono text-[13px] tracking-[4px] text-white/40 uppercase">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-12" style={{ background: "transparent" }}>
      <div className="flex flex-col gap-6">
        <MarqueeRow items={TECH_STACK_ROW1} />
        <MarqueeRow items={TECH_STACK_ROW2} reverse />
      </div>
    </section>
  );
}
