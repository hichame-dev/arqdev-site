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
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

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
            <span className="font-mono text-[13px] tracking-[4px] text-white/20 uppercase">
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
    <section className="py-12 bg-surface border-y border-brand/[0.05]">
      <div className="flex flex-col gap-6">
        <MarqueeRow items={TECH_STACK_ROW1} />
        <MarqueeRow items={TECH_STACK_ROW2} reverse />
      </div>
    </section>
  );
}
