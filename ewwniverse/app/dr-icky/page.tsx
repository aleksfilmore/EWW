import type { Metadata } from "next";
import { PRODUCT } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import LabTransmission from "@/components/LabTransmission";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Dr. Icky",
  description:
    "Professor Ignatius Icky — Chief Specimen Scientist of the EWW-niverse. A classified personnel file: who he is, the mission, and the one rule of the lab — real science, gross facts, zero fake monsters.",
  alternates: { canonical: "/dr-icky" },
};

const dossier = [
  {
    label: "Who he is",
    accent: "#8DE71C",
    heading: "The EWW-niverse's self-appointed keeper of gross facts.",
    body: "Dr. Icky is the only person alive who thinks “delightfully disgusting” is a scientific classification. He has spent decades cataloguing the planet's most revolting creatures. His lab coat has never been washed on purpose.",
  },
  {
    label: "The mission",
    accent: "#E8932E",
    heading: "Understanding something gross is the first step to respecting it.",
    body: "Dr. Icky believes the real world is already weirder than anything anyone could invent. So he turned the findings the journals kept asking him to tone down into field guides for kids instead. The second step to respecting a specimen, he notes, is probably gagging.",
  },
  {
    label: "The rule of the lab",
    accent: "#E0403C",
    heading: "Real science. Gross facts. Zero fake monsters.",
    body: "Every specimen in the EWW-niverse is a real creature, personally inspected, sniffed, and documented by Dr. Icky and his team. Nothing is invented or embellished. If it's in the lab, it's real — and it's worse than you think.",
  },
];

const surfaces = [
  { name: "The Books", desc: `${PRODUCT.booksPublished} published field guides to the revolting natural world. Available on Amazon.` },
  { name: "The App", desc: `Live on ${PRODUCT.platform}. ${PRODUCT.totalSpecimens} specimens, free to start, one-time Full Lab Pass.` },
  { name: "The Website", desc: "You're here — the lab's front desk, specimen files, and field guide catalogue." },
];

export default function DrIckyPage() {
  return (
    <>
      {/* ── PERSONNEL FILE HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16 md:py-20">
        <div className="hazard-stripe absolute inset-x-0 top-0 h-2 opacity-70" />
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="rounded border border-[var(--color-danger)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-danger)]">
                Classified
              </span>
              <span className="lab-label text-[var(--color-ink-mute)]">Personnel file · Chief Specimen Scientist</span>
            </div>
            <h1
              className="font-creepster neon-text"
              style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", fontSize: "clamp(2.6rem,6vw,4.5rem)", lineHeight: 1 }}
            >
              Dr. Icky
            </h1>
            <p className="text-lg text-[var(--color-ink-dim)]">
              <span className="text-[var(--color-ink)]">Professor Ignatius Icky</span> — Head of Gross Classification,
              EWW-niverse Labs. Specialist in biological phenomena most respectable scientists prefer not to discuss at dinner.
            </p>
            <div className="mt-2 flex gap-8">
              {[
                { n: PRODUCT.booksPublished, label: "Field guides" },
                { n: PRODUCT.totalSpecimens, label: "Specimens classified" },
                { n: "∞", label: "Disgust threshold" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-creepster text-3xl text-[var(--color-neon)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>{s.n}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-mute)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Dr. Icky photo */}
          <div className="relative mx-auto w-60 sm:w-72">
            <div className="absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(141,231,28,0.3), transparent 70%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dr-icky-real/dr-icky-portrait.webp"
              alt="Dr. Icky — Professor Ignatius Icky, Chief Specimen Scientist"
              className="w-full rounded-2xl object-cover"
              style={{ border: "1px solid var(--color-lab-line-bright)", boxShadow: "0 24px 60px -24px rgba(0,0,0,0.8)" }}
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black" style={{ backgroundColor: "var(--color-neon)" }}>
              Verified specimen #001
            </span>
          </div>
        </div>
      </section>

      {/* ── LAB TRANSMISSION ───────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Lab transmission" title="Dr. Icky has a message" align="center" />
          <div className="mt-8">
            <LabTransmission src="/videos/dr-icky-intro.mp4" poster="/videos/dr-icky-intro-poster.jpg" caption="Press play. He insists." />
          </div>
        </div>
      </section>

      {/* ── DOSSIER ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4">
          <SectionHeading eyebrow="Field observations" title="The dossier" align="center" />
          <div className="mt-10 flex flex-col gap-4">
            {dossier.map((c) => (
              <div key={c.label} className="lab-panel relative overflow-hidden p-6 sm:p-7">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: c.accent }} />
                <span className="inline-block rounded border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: c.accent, borderColor: c.accent }}>
                  {c.label}
                </span>
                <h3 className="mt-3 text-xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{c.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-dim)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE UNIVERSE ───────────────────────────────────────── */}
      <section className="border-t border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="The EWW-niverse" title="One universe. Three surfaces." />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {surfaces.map((item) => (
              <div key={item.name} className="lab-card flex flex-col gap-3 p-5">
                <span className="w-fit rounded-full border border-[var(--color-neon)]/40 bg-[var(--color-neon)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neon)]">
                  Live
                </span>
                <h3 className="text-lg text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{item.name}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Meet him in the lab." sub="Download free and let Dr. Icky walk you through your first revolting specimen." />
    </>
  );
}
