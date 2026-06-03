import { ReactNode } from "react";

/** Feature card for the "what you do in the lab" grid.
 *  Each card carries its own accent (top bar + icon tint) to break up the
 *  purple-on-purple grid. The green hover lift stays consistent via .lab-card. */
export default function FeatureCard({
  icon,
  title,
  desc,
  accent = "var(--color-neon)",
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  accent?: string;
}) {
  return (
    <div className="lab-card relative flex flex-col gap-3 overflow-hidden p-5">
      {/* accent top bar */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      {/* faint accent wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
        style={{ backgroundColor: accent, opacity: 0.12 }}
      />
      <span
        className="relative grid h-11 w-11 place-items-center rounded-xl text-xl"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, border: `1px solid ${accent}66`, color: accent }}
      >
        {icon}
      </span>
      <h3 className="relative text-lg text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
        {title}
      </h3>
      <p className="relative text-sm leading-relaxed text-[var(--color-ink-dim)]">{desc}</p>
    </div>
  );
}
