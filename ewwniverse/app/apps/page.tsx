import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE_URL, PRODUCT, SLIME, SLIME_APP_STORE_URL, SLIME_PLAY_STORE_URL } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import StoreBadge from "@/components/StoreBadge";

export const metadata: Metadata = {
  title: "Our Apps",
  description:
    "Two gross-science apps from Dr. Icky's EWW-niverse: the EWW-niverse specimen-classification game (live on iPhone & iPad) and Slime or Bye, the gross-science quiz show (coming soon to iPhone, iPad & Android). No ads, no tracking, no accounts.",
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16 md:py-20">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="From Dr. Icky's lab"
            title="Two ways into the EWW-niverse"
            sub="Both apps are built the same way: real gross science, kid-safe design, no ads, no tracking, no accounts. Pick your poison."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* ── EWW-niverse app ─────────────────────────────── */}
            <div className="lab-panel flex flex-col gap-5 p-7">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ui/logo-main.png"
                  alt="EWW-niverse"
                  className="h-14 w-auto object-contain"
                />
                <span className="rounded-full bg-[var(--color-neon)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">
                  Live now
                </span>
              </div>
              <h2 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
                The EWW-niverse app
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">
                Scan sealed specimen jars, classify what&apos;s inside, survive Dr. Icky&apos;s quiz, and master all{" "}
                {PRODUCT.totalSpecimens} specimens across three field guides as your EWW score climbs.
              </p>
              <ul className="flex flex-col gap-1.5 text-sm text-[var(--color-ink-dim)]">
                {["Specimen-classification game", `${PRODUCT.totalSpecimens} specimens, 5 stages`, "Free — optional one-time Full Lab Pass", `${PRODUCT.platform}`].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="text-[var(--color-neon)]">✓</span>{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-2">
                <StoreBadge store="apple" href={APP_STORE_URL} size="md" />
                <Link href="/app" className="text-sm font-bold uppercase tracking-wide text-[var(--color-neon)] hover:underline">
                  Explore the app →
                </Link>
              </div>
            </div>

            {/* ── Slime or Bye ────────────────────────────────── */}
            <div className="lab-panel flex flex-col gap-5 p-7" style={{ borderColor: "#39FF1455" }}>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/slime-or-bye/app-icon.webp"
                  alt="Slime or Bye"
                  className="h-14 w-14 rounded-2xl object-cover"
                  style={{ border: "1px solid #39FF1455" }}
                />
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black" style={{ background: "#39FF14" }}>
                  {SLIME.status}
                </span>
              </div>
              <h2 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
                {SLIME.name}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">
                {SLIME.tagline}. Answer fast, beat the slime timer, survive the round, collect specimen cards and earn
                badges as Dr. Icky hosts every question.
              </p>
              <ul className="flex flex-col gap-1.5 text-sm text-[var(--color-ink-dim)]">
                {["Gross-science quiz show", "180 specimen cards, 18 badges, lifelines", "Free pack — optional one-time pack unlocks", `${SLIME.platform}`].map((t) => (
                  <li key={t} className="flex gap-2.5"><span style={{ color: "#39FF14" }}>✓</span>{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-2">
                <div className="flex flex-wrap gap-3">
                  <StoreBadge store="apple" href={SLIME_APP_STORE_URL} size="md" />
                  <StoreBadge store="google" href={SLIME_PLAY_STORE_URL} size="md" />
                </div>
                <Link href="/slime-or-bye" className="text-sm font-bold uppercase tracking-wide hover:underline" style={{ color: "#39FF14" }}>
                  Explore Slime or Bye →
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[var(--color-ink-mute)]">
            Both apps are made for curious kids and trusted by parents.{" "}
            <Link href="/for-parents" className="font-semibold text-[var(--color-neon)] hover:underline">
              See what we collect (almost nothing) →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
