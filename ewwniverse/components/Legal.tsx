import { ReactNode } from "react";

/** Shared dark "legal text shell" — readable, on-brand, consistent across
 *  Privacy, COPPA and Cookies pages. */
export function LegalShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-lab-void)]">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="lab-label mb-3 text-[var(--color-neon)]">Legal</p>
        <h1
          className="font-creepster neon-text mb-2"
          style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", fontSize: "clamp(2rem,4vw,2.75rem)" }}
        >
          {title}
        </h1>
        <p className="mb-12 text-sm text-[var(--color-ink-mute)]">Last updated: {lastUpdated}</p>
        <div className="space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-[var(--color-ink-dim)] [&_a]:text-[var(--color-neon)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[var(--color-ink)] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
