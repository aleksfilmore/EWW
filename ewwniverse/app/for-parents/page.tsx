import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "What EWW-niverse is, what it does, and what it deliberately does not do. No ads, no tracking, no accounts, no personal data collected. Real science, kid-safe grossness for ages 7+.",
  alternates: { canonical: "/for-parents" },
};

const trust = [
  { t: "No ads, ever", d: "The app is funded by one optional one-time purchase. No advertisements at any tier." },
  { t: "No tracking", d: "No analytics SDKs, no advertising IDs, no behavioural profiling of your child." },
  { t: "No accounts", d: "No name, email, password or sign-up. Your child never creates a profile." },
  { t: "No personal data", d: "Nothing personal is collected — so there's nothing to sell, leak, or consent away." },
];

const ageContent = [
  "Gross — intentionally and specifically",
  "Scientifically accurate — every fact has a source",
  "Never violent in a graphic sense",
  "Never sexual",
  "Never horror-scary — disgusting and scary are different things",
  "Always grounded in real biology, never fabricated for effect",
];

const faqs = [
  {
    q: "What age is EWW-niverse designed for?",
    a: "Ages 7 and up. The content is gross but never violent, never sexual, and always grounded in real science. The books and the app follow the same standard.",
  },
  {
    q: "What data does the app collect about my child?",
    a: "None that identifies them. The app uses anonymous sign-in (no name, email, or password) so progress can be saved on the device, plus a purchase manager (RevenueCat) to handle the one-time unlock. There is no analytics, no tracking, no advertising, and no database of personal child information.",
  },
  {
    q: "Does my child need an account or my email?",
    a: "No. There are no accounts and no email is required to play. Your child can use the whole free tier without entering any personal information at all.",
  },
  {
    q: "Is there a subscription?",
    a: "No. The app is free with no ads. The Full Lab Pass is a single one-time purchase — you pay once, it lasts forever, and there are no recurring charges.",
  },
  {
    q: "Are there ads or social features?",
    a: "No ads, no social feeds, no chat, no comments, and no user-generated content. There is nothing for your child to post and no strangers for them to encounter.",
  },
  {
    q: "How are purchases handled?",
    a: "The one-time Full Lab Pass is purchased and managed through Apple's App Store and RevenueCat. We never see or store your payment details.",
  },
  {
    q: "Is the science accurate?",
    a: "Yes. Every creature, fact, and figure is verified. Dr. Icky does not traffic in exaggeration — the real facts are already more than sufficient.",
  },
];

export default function ForParentsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ── HERO (calmer) ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16 md:py-20">
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-[1fr_auto]">
          <div>
            <SectionHeading
              eyebrow="For parents & educators"
              title="Gross for kids. Clean for parents."
              sub="Everything EWW-niverse is, what it does, and what it deliberately does not do — written plainly, and matching our Privacy Policy exactly."
            />
          </div>
          <div className="relative mx-auto w-40 sm:w-48">
            <div className="absolute inset-0 -z-10 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(141,231,28,0.22), transparent 70%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dr-icky-real/dr-icky-portrait.webp"
              alt="Dr. Icky"
              className="w-full rounded-2xl object-cover"
              style={{ border: "1px solid var(--color-lab-line)" }}
            />
          </div>
        </div>
      </section>

      {/* ── TRUST CARDS ────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((c) => (
              <div key={c.t} className="lab-panel p-5">
                <p className="text-base font-semibold text-[var(--color-neon)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{c.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-dim)]">{c.d}</p>
              </div>
            ))}
          </div>

          {/* What the app uses (matches privacy) */}
          <div className="lab-panel mt-6 p-6">
            <p className="lab-label text-[var(--color-neon)]">What the app actually uses</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-dim)]">
              Two services, nothing more: <span className="text-[var(--color-ink)]">Firebase anonymous authentication</span> (an
              anonymous ID so progress saves on the device — no personal login) and{" "}
              <span className="text-[var(--color-ink)]">RevenueCat</span> (to manage the one-time Full Lab Pass). No Firebase
              Analytics, no Firestore or Realtime Database, no ad networks, no third-party tracking. See the{" "}
              <Link href="/privacy" className="text-[var(--color-neon)] underline underline-offset-2">Privacy Policy</Link> and{" "}
              <Link href="/coppa" className="text-[var(--color-neon)] underline underline-offset-2">COPPA</Link> page.
            </p>
          </div>
        </div>
      </section>

      {/* ── AGE + FAQ ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="lab-panel mb-8 p-6">
            <h2 className="text-xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>Age appropriateness — built for ages 7+</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ageContent.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-ink-dim)]">
                  <span className="mt-0.5 flex-shrink-0 text-[var(--color-neon)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <SectionHeading eyebrow="The details" title="Frequently asked questions" />
          <div className="mt-6 flex flex-col gap-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="lab-panel p-5">
                <h3 className="text-sm font-semibold text-[var(--color-ink)]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-dim)]">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="lab-panel mt-8 p-6">
            <h3 className="text-lg text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>Still have questions?</h3>
            <p className="mt-1 text-sm text-[var(--color-ink-dim)]">
              Dr. Icky&apos;s lab is open to parent inquiries. Send a note below, or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-neon)] underline underline-offset-2">{CONTACT_EMAIL}</a>.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
