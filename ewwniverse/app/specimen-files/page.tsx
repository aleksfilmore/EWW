import type { Metadata } from "next";
import Link from "next/link";
import { specimenPosts, ewwMeterLabels, creatureImagePath, postEwwLevel } from "@/lib/data";
import { APP_STORE_URL } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import EmailSignupForm from "@/components/EmailSignupForm";

export const metadata: Metadata = {
  title: "Specimen Files",
  description:
    "Deep-dives into the grossest creatures on the planet — field reports and weird science from Dr. Icky's lab. Then classify the specimens yourself in the app.",
  alternates: { canonical: "/specimen-files" },
};

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

export default function SpecimenFilesPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16 md:py-20">
        <div className="hazard-stripe absolute inset-x-0 top-0 h-2 opacity-70" />
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="From the field"
            title="Specimen Files"
            sub="Deep-dives into the grossest creatures on the planet — verified by Dr. Icky, dangerous to read before lunch."
          />
        </div>
      </section>

      {/* ── POSTS GRID ─────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specimenPosts.map((post) => {
              const ewwLevel = postEwwLevel[post.slug] ?? 60;
              const ewwConfig = ewwMeterLabels[ewwLevel];
              return (
                <Link key={post.slug} href={`/specimen-files/${post.slug}`} className="lab-card group flex flex-col overflow-hidden">
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[var(--color-lab-void)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creatureImagePath(post.creatureName)}
                      alt={post.creatureName}
                      loading="lazy"
                      className="relative z-10 h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      className="absolute right-3 top-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-bold text-black"
                      style={{ backgroundColor: ewwLevel === 100 ? "var(--color-danger)" : ewwLevel === 80 ? "var(--color-amber)" : "var(--color-neon)" }}
                    >
                      EWW {ewwLevel}
                    </span>
                    <span className="absolute bottom-3 left-3 z-20 rounded-full border border-[var(--color-neon)]/30 bg-[var(--color-lab-void)]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neon)]">
                      {categoryLabels[post.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h2 className="text-lg leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-neon)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-dim)]">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-[var(--color-lab-line)] pt-2">
                      <span className="text-xs text-[var(--color-ink-mute)]">
                        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {post.readTime} min read
                      </span>
                      <span className="text-xs font-bold text-[var(--color-neon)] group-hover:underline">Open file →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* App CTA strip */}
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-lab-line-bright)] bg-[var(--color-lab-panel)] p-6 text-center">
            <p className="text-lg text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
              Want to classify these specimens yourself?
            </p>
            <a href={APP_STORE_URL} target="_blank" rel="noopener" className="rounded-full bg-[var(--color-neon)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5">
              Get the free app →
            </a>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-14">
        <div className="relative mx-auto max-w-xl px-4 text-center">
          <h2 className="font-creepster neon-text mb-3 text-2xl" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
            Get specimen files by email
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--color-ink-dim)]">
            New specimen files and book news, straight to your inbox. No filler. Gross guaranteed.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
