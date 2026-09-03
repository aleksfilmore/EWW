import type { Metadata } from "next";
import Link from "next/link";
import { SLIME, SLIME_APP_STORE_URL, SLIME_PLAY_STORE_URL } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import PhoneFrame from "@/components/PhoneFrame";
import StoreBadge from "@/components/StoreBadge";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Slime or Bye — Dr. Icky's Gross-Science Quiz Show",
  description:
    "Dr. Icky's gross-science quiz show for kids 7–12: answer questions, collect specimen cards, earn badges and survive the round. Coming soon.",
  openGraph: pageOpenGraph(
    "/slime-or-bye",
    "Slime or Bye | EWW-niverse",
    "Dr. Icky's gross-science quiz show for kids 7–12: answer questions, collect specimen cards, earn badges and survive the round. Coming soon.",
  ),
  alternates: { canonical: "/slime-or-bye" },
};

// Slime or Bye's own palette (distinct from the EWW-niverse lab green).
const SLIME_GREEN = "#39FF14";
const MAGENTA = "#FF2D78";
const GOLD = "#FFC53D";
const OOZE = "#A855F7";

const screenshots = [
  { src: "/images/slime-or-bye/sob-home.webp", alt: "Slime or Bye home screen with quiz-pack selection", caption: "Pick a quiz pack and step on stage." },
  { src: "/images/slime-or-bye/sob-lab.webp", alt: "Specimen Lab grid of collected gross-science cards", caption: "Collect 180 specimen cards in the lab." },
  { src: "/images/slime-or-bye/sob-badges.webp", alt: "Badge gallery for streaks, wins and milestones", caption: "Earn badges for streaks, wins & milestones." },
  { src: "/images/slime-or-bye/sob-store.webp", alt: "One-time pack and bundle purchases, no subscriptions", caption: "Optional one-time unlocks — never a subscription." },
];

const loop = [
  { n: "01", t: "Step on stage", d: "Pick a quiz pack and Dr. Icky kicks off a 10-question round." },
  { n: "02", t: "Answer fast", d: "Beat the slime timer for bonus points. Speed and streaks matter." },
  { n: "03", t: "Survive", d: "Get enough right to clear the round — or get slimed and try again." },
  { n: "04", t: "Collect", d: "Every correct answer bags a real specimen card for your lab." },
  { n: "05", t: "Earn badges", d: "Streaks, flawless rounds and milestones unlock 18 badges." },
];

const features = [
  { icon: "🎬", title: "A real quiz show", desc: "Dr. Icky hosts every round from his host-cam, with reactions for your best and worst answers.", accent: SLIME_GREEN },
  { icon: "🧬", title: "Real gross science", desc: "Every question — and every answer reveal — is built on genuine, genuinely disgusting biology.", accent: MAGENTA },
  { icon: "🃏", title: "Specimen card lab", desc: "Collect 180 specimen cards across the packs and pin your favourites in the Specimen Lab.", accent: GOLD },
  { icon: "🛟", title: "Lab-rat lifelines", desc: "Stuck? Use Slime Split, Ask the Lab Rat, or Microscope Peek to survive the round.", accent: OOZE },
  { icon: "🏅", title: "18 badges", desc: "Slime Survivor, Gross Genius, Flawless Filth and more — for streaks, wins and milestones.", accent: SLIME_GREEN },
  { icon: "🔇", title: "Calm by design", desc: "No ads, no accounts, no chat, no tracking. Separate music and sound-effect toggles.", accent: MAGENTA },
];

export default function SlimeOrBytePage() {
  const anyStoreLive = Boolean(SLIME_APP_STORE_URL || SLIME_PLAY_STORE_URL);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)]">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 opacity-60"
          style={{ background: `radial-gradient(60% 50% at 50% 0%, ${OOZE}22, transparent 70%)` }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/slime-or-bye/app-icon.webp"
                alt="Slime or Bye app icon"
                className="h-14 w-14 rounded-2xl object-cover"
                style={{ border: `1px solid ${SLIME_GREEN}55` }}
              />
              <p className="lab-label" style={{ color: SLIME_GREEN }}>From the EWW-niverse</p>
            </div>
            <h1
              className="font-creepster"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', serif",
                fontSize: "clamp(2.4rem,5.2vw,4rem)",
                lineHeight: 1.04,
                color: SLIME_GREEN,
                textShadow: `0 0 28px ${SLIME_GREEN}55`,
              }}
            >
              Slime or Bye
            </h1>
            <p className="text-lg" style={{ color: MAGENTA, fontFamily: "var(--font-boogaloo), cursive" }}>
              {SLIME.tagline}
            </p>
            <p className="max-w-md leading-relaxed text-[var(--color-ink-dim)]">
              Step onto Dr. Icky&apos;s stage for a fast, funny, genuinely-gross science quiz show. Answer the
              questions, beat the slime timer, survive the round, collect specimen cards and earn your badges —
              one verdict at a time.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Designed for Families", "Ages 7–12", "No ads", "No tracking"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ border: `1px solid ${SLIME_GREEN}55`, background: `${SLIME_GREEN}14`, color: SLIME_GREEN }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <StoreBadge store="apple" href={SLIME_APP_STORE_URL} />
                <StoreBadge store="google" href={SLIME_PLAY_STORE_URL} />
              </div>
              {!anyStoreLive && (
                <span className="lab-label text-[var(--color-ink-mute)]">
                  Submitted to the App Store — launching on {SLIME.platform} soon.
                </span>
              )}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-3">
            <div className="w-36 sm:w-40" style={{ transform: "rotate(-6deg) translateY(14px)" }}>
              <PhoneFrame src="/images/slime-or-bye/sob-quiz.webp" alt="Slime or Bye quiz question with Dr. Icky" />
            </div>
            <div className="z-10 w-44 sm:w-52">
              <PhoneFrame src="/images/slime-or-bye/sob-landing.webp" alt="Slime or Bye — Dr. Icky's gross-science quiz show" priority />
            </div>
            <div className="w-36 sm:w-40" style={{ transform: "rotate(6deg) translateY(14px)" }}>
              <PhoneFrame src="/images/slime-or-bye/sob-reveal.webp" alt="Slime or Bye answer reveal with gross fact" />
            </div>
          </div>
        </div>
      </section>

      {/* ── GAMEPLAY LOOP ──────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="How a round works" title="Answer. Survive. Collect. Repeat." align="center" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {loop.map((s) => (
              <div key={s.n} className="lab-panel flex flex-col gap-2 p-5">
                <span className="font-creepster text-2xl" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", color: SLIME_GREEN }}>
                  {s.n}
                </span>
                <p className="text-base text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{s.t}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="What's inside" title="The whole gross game show" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} accent={f.accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="On stage" title="Real screens from the show" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {screenshots.map((s, i) => (
              <div key={s.src} className="flex flex-col items-center gap-3">
                <PhoneFrame src={s.src} alt={s.alt} priority={i === 0} className="w-full max-w-[220px]" />
                <p className="max-w-[220px] text-center text-xs leading-relaxed text-[var(--color-ink-dim)]">{s.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Free to play"
            title="Free to start. No ads. Ever."
            sub="The first quiz pack is free for everyone. Extra packs are optional one-time purchases — buy a single pack, or unlock everything (including future packs) in one go. No subscriptions, ever."
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="lab-panel flex flex-col gap-3 p-6">
              <p className="lab-label" style={{ color: SLIME_GREEN }}>Free pack</p>
              <p className="font-creepster text-4xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>Free</p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">The starter quiz pack, the full game-show loop, specimen cards and badges — at no cost.</p>
            </div>
            <div className="lab-panel flex flex-col gap-3 p-6">
              <p className="lab-label" style={{ color: MAGENTA }}>Extra pack</p>
              <p className="font-creepster text-4xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>{SLIME.packPrice}</p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">A one-time unlock for any additional quiz pack. Pay once, keep it forever.</p>
            </div>
            <div className="lab-panel flex flex-col gap-3 p-6" style={{ borderColor: GOLD }}>
              <p className="lab-label" style={{ color: GOLD }}>Unlock everything</p>
              <p className="font-creepster text-4xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>{SLIME.bundlePrice}</p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">Every pack — plus every future pack — in a single one-time bundle.</p>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-[var(--color-ink-mute)]">
            {SLIME.priceNote}. Purchases are one-time and happen behind a parent gate.
          </p>
        </div>
      </section>

      {/* ── PARENT TRUST ───────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="For parents"
            title="Gross for kids. Clean for parents."
            sub="Slime or Bye is a Designed-for-Families app built the same way as the rest of the EWW-niverse: no ads, no tracking, no accounts, and a parent gate in front of every purchase."
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "No ads, ever", d: "No banners, no pop-ups, no ad networks at any tier." },
              { t: "No tracking", d: "No analytics SDKs, no advertising IDs, no profiling of your child." },
              { t: "No accounts", d: "No sign-up and no email. Progress saves on the device only." },
              { t: "Parent gate", d: "A maths challenge stands between your child and any purchase." },
            ].map((c) => (
              <div key={c.t} className="lab-panel p-5">
                <p className="text-base font-semibold" style={{ color: SLIME_GREEN, fontFamily: "var(--font-boogaloo), cursive" }}>{c.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-dim)]">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/for-parents"
              className="rounded-full border border-[var(--color-lab-line-bright)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]"
            >
              Read the full parent guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2
            className="font-creepster"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: SLIME_GREEN, textShadow: `0 0 28px ${SLIME_GREEN}55` }}
          >
            Slime or bye?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-[var(--color-ink-dim)]">
            The show is almost ready. {anyStoreLive ? "Get it now." : "Add it to your list — it lands on " + SLIME.platform + " soon."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge store="apple" href={SLIME_APP_STORE_URL} />
            <StoreBadge store="google" href={SLIME_PLAY_STORE_URL} />
          </div>
          <p className="mt-6 text-sm text-[var(--color-ink-mute)]">
            Looking for the other app?{" "}
            <Link href="/app" className="font-semibold text-[var(--color-neon)] hover:underline">Explore the EWW-niverse app →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
