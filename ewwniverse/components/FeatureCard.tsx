import { ReactNode } from "react";

/** Feature card for the "what you do in the lab" grid. */
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
    <div className="lab-card flex flex-col gap-3 p-5">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl text-xl"
        style={{ backgroundColor: "rgba(141,231,28,0.08)", border: `1px solid ${accent}55`, color: accent }}
      >
        {icon}
      </span>
      <h3
        className="text-lg text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-boogaloo), cursive" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{desc}</p>
    </div>
  );
}
