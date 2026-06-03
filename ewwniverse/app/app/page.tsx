import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import PhoneFrame from "@/components/PhoneFrame";
import AppStoreButton from "@/components/AppStoreButton";
import LabTransmission from "@/components/LabTransmission";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "The App",
  description:
    "234 gross specimens across three field guides. Scan, classify, survive the quiz, master specimens, and raise your EWW score with Dr. Icky. Free to start on iPhone & iPad.",
  alternates: { canonical: "/app" },
};

const features = [
  { icon: "🫙", title: "234 specimens", desc: "Creepy Creatures, Dinosaurs and Earth — every entry illustrated, EWW-rated and ready to classify.", accent: "#8DE71C" },
  { icon: "❓", title: "Master quizzes", desc: "Three questions per specimen. Ace all three to master it. Dr. Icky delivers his verdict either way.", accent: "#A78BFA" },
  { icon: "📈", title: "EWW score", desc: "A live gauge that climbs as you classify and master. Five stages stand between you and Full Dr. Icky.", accent: "#E8932E" },
  { icon: "🧪", title: "Slime Surges", desc: "Master enough specimens to trigger contamination events that unlock 15 special specimens.", accent: "#E0403C" },
];

const loop = [
  { n: "01", t: "Scan", d: "Spend a scan to crack open a sealed mystery jar." },
  { n: "02", t: "Classify", d: "Reveal the specimen and its real, gross science fact." },
  { n: "03", t: "Quiz", d: "Answer Dr. Icky's questions about what you just found." },
  { n: "04", t: "Master", d: "Ace the quiz to stamp it MASTERED and earn bonus scans." },
  { n: "05", t: "Unlock", d: "Climb the stages and trigger rare Slime Surge specimens." },
];

const stages = [
  { stage: 1, name: "Kinda Curious", color: "#8DE71C", desc: "Clean dark lab. You're just getting started." },
  { stage: 2, name: "Properly Revolted", color: "#2BD4B0", desc: "Green haze at the edges. Something is growing." },
  { stage: 3, name: "Super Slimy", color: "#E8932E", desc: "Specimen-jar elements seep into the interface." },
  { stage: 4, name: "Biologically Alarmed", color: "#3FB6F0", desc: "The lab starts reacting to everything you do." },
  { stage: 5, name: "Full Dr. Icky", color: "#A78BFA", desc: "Maximum atmosphere. You've unlocked the whole lab." },
];

export default function AppPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)]">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-5">
            <p className="lab-label text-[var(--color-neon)]">The EWW-niverse app</p>
            <h1
              className="font-creepster neon-text"
              style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", fontSize: "clamp(2.4rem,5.2vw,4rem)", lineHeight: 1.04 }}
            >
              The whole lab, in your pocket
            </h1>
            <p className="max-w-md leading-relaxed text-[var(--color-ink-dim)]">
              234 specimens across three field guides. Classify them, master them through Dr. Icky&apos;s quiz, earn your
              EWW score, and trigger contamination events that reveal specimens you didn&apos;t know existed.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Free to download", "No ads", "No subscription"].map((t) => (
                <span key={t} className="rounded-full border border-[var(--color-neon)]/40 bg-[var(--color-neon)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-neon)]">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <AppStoreButton />
              <span className="lab-label text-[var(--color-ink-mute)]">Available now on {PRODUCT.platform}</span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-3">
            <div className="w-36 sm:w-40" style={{ transform: "rotate(-6deg) translateY(14px)" }}>
              <PhoneFrame src="/images/screenshots/shot-02.webp" alt="Classified specimen with EWW-meter" />
            </div>
            <div className="z-10 w-44 sm:w-52">
              <PhoneFrame src="/images/screenshots/shot-01.webp" alt="Home screen with today's gross challenge" priority />
            </div>
            <div className="w-36 sm:w-40" style={{ transform: "rotate(6deg) translateY(14px)" }}>
              <PhoneFrame src="/images/screenshots/shot-03.webp" alt="Lab quiz screen" />
            </div>
          </div>
        </div>
      </section>

      {/* ── GAMEPLAY LOOP ──────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="The gameplay loop" title="Scan. Classify. Quiz. Master. Unlock." align="center" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {loop.map((s) => (
              <div key={s.n} className="lab-panel flex flex-col gap-2 p-5">
                <span className="font-creepster text-2xl text-[var(--color-neon)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                  {s.n}
                </span>
                <p className="text-base text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{s.t}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="What's inside" title="Everything in the lab" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} accent={f.accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STAGES ─────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Your progression" title="Five stages of the lab" align="center" />
          <div className="mt-10 flex flex-col gap-3 md:flex-row">
            {stages.map((s) => (
              <div key={s.stage} className="lab-panel flex flex-1 flex-col gap-2 p-4">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: s.color, fontFamily: "var(--font-boogaloo), cursive" }}
                >
                  {s.stage}
                </div>
                <p className="text-sm font-medium" style={{ color: s.color }}>{s.name}</p>
                <p className="text-xs leading-relaxed text-[var(--color-ink-mute)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (one free app + optional unlock) ───────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Free to play"
            title="Free to download. No ads. Ever."
            sub="Everyone gets the full 75-specimen Creepy Creatures guide for free. One optional one-time unlock opens the rest of the lab, forever."
            align="center"
          />
          <div className="mt-10 overflow-hidden rounded-[1.5rem]" style={{ border: "1px solid var(--color-lab-line-bright)" }}>
            <div className="flex flex-col gap-5 bg-[var(--color-lab-panel)] p-7 sm:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="lab-label text-[var(--color-neon)]">The app — free for everyone</p>
                  <p className="mt-2 font-creepster text-5xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>Free</p>
                </div>
                <AppStoreButton />
              </div>
              <ul className="grid grid-cols-1 gap-2.5 text-sm text-[var(--color-ink-dim)] sm:grid-cols-2">
                {["No ads — not a single one", "No sign-up, no account, no tracking", "All 75 Creepy Creatures specimens", "Daily challenge, quizzes & mastery", "Stages 1–2"].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="text-[var(--color-neon)]">✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 p-7 sm:p-9" style={{ background: "linear-gradient(165deg,var(--color-lab-panel-2),var(--color-lab-panel))", borderTop: "1px solid var(--color-neon)" }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="lab-label text-[var(--color-neon)]">Optional · one-time in-app unlock</p>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black" style={{ backgroundColor: "var(--color-neon)" }}>{PRODUCT.price} · lifetime</span>
              </div>
              <h3 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>Full Lab Pass — unlock the whole lab</h3>
              <ul className="grid grid-cols-1 gap-2.5 text-sm text-[var(--color-ink-dim)] sm:grid-cols-2">
                {["All 234 specimens — Creatures, Dinosaurs & Earth", "All 15 special Slime Surge unlocks", "Stages 3–5: Super Slimy → Full Dr. Icky", "One-time $3.99. No subscription, ever."].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="text-[var(--color-neon)]">✓</span>{t}</li>
                ))}
              </ul>
              <p className="text-xs text-[var(--color-ink-mute)]">Unlock it from inside the free app whenever you&apos;re ready — a single purchase that lasts forever, restorable on every device signed in to your Apple account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DR. ICKY VIDEO ─────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="From the lab"
              title="Every scan gets a verdict"
              sub="Each specimen you classify triggers a Dr. Icky reaction. The worse the creature, the better the verdict."
            />
            <div className="mt-6">
              <Link href="/dr-icky" className="rounded-full border border-[var(--color-lab-line-bright)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]">
                Meet Dr. Icky
              </Link>
            </div>
          </div>
          <LabTransmission src="/videos/dr-icky-intro.mp4" poster="/videos/dr-icky-intro-poster.jpg" caption="A short transmission from EWW-niverse Labs." />
        </div>
      </section>

      <CTABanner title="Open the lab." />
    </>
  );
}
