import { ReactNode } from "react";

/** Consistent lab-label + neon display heading used across sections. */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <p className="lab-label mb-3 text-[var(--color-neon)]">{eyebrow}</p>
      )}
      <h2
        className="font-creepster neon-text leading-tight"
        style={{
          fontFamily: "var(--font-creepster), 'Cantora One', serif",
          fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-3 text-[var(--color-ink-dim)] leading-relaxed ${
            center ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
