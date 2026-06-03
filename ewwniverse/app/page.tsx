import Link from "next/link";
import { books, specimenPosts, creatureImagePath, bookCoverPath } from "@/lib/data";
import { PRODUCT, APP_STORE_URL } from "@/lib/site";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import PhoneFrame from "@/components/PhoneFrame";
import LabTransmission from "@/components/LabTransmission";
import AppStoreButton from "@/components/AppStoreButton";
import CTABanner from "@/components/CTABanner";

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

const features = [
  { icon: "🔬", title: "Scan mystery specimens", desc: "Spend a scan to crack open a sealed specimen jar and reveal what's lurking inside.", accent: "#8DE71C" },
  { icon: "🤢", title: "Reveal gross facts", desc: "Every classified specimen unlocks a real — and genuinely disgusting — science fact.", accent: "#E8932E" },
  { icon: "❓", title: "Answer the lab quiz", desc: "Prove you actually understand the specimen by surviving Dr. Icky's questions.", accent: "#A78BFA" },
  { icon: "✅", title: "Master specimens", desc: "Ace the quiz to stamp a specimen MASTERED and earn bonus scans.", accent: "#3FB6F0" },
  { icon: "📈", title: "Raise your EWW score", desc: "Climb five stages — from Kinda Curious all the way to Full Dr. Icky.", accent: "#2BD4B0" },
  { icon: "🧪", title: "Unlock 100/100 finds", desc: "Hunt the Total Barf tier: the rarest, most revolting EWW-100 discoveries.", accent: "#E0403C" },
];

const screenshots = [
  { src: "/images/screenshots/shot-01.webp", alt: "Home screen with today's gross challenge", caption: "A fresh mystery jar every single day." },
  { src: "/images/screenshots/shot-02.webp", alt: "Classified specimen with EWW-meter and gross fact", caption: "Classified. EWW-meter maxed. Fact revealed." },
  { src: "/images/screenshots/shot-04.webp", alt: "Specimen Files grid across field guides", caption: "Collect all 234 across three field guides." },
  { src: "/images/screenshots/shot-05.webp", alt: "Recruit file with stage ladder", caption: "Your stage ladder, streaks and rewards." },
];

const appBookIds = new Set(["creepy-creatures", "creepy-dinosaurs", "creepy-earth"]);

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ── WHAT YOU DO IN THE LAB ─────────────────────────────────── */}
      <section id="inside" className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The gameplay loop"
            title="What you do in the lab"
            sub="Scan → classify → learn the gross fact → survive the quiz → master it → unlock more. Every loop raises your EWW score."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} accent={f.accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL DR. ICKY — LAB TRANSMISSION ───────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Direct from the lab"
              title="Dr. Icky has a verdict"
              sub="Professor Ignatius Icky — Chief Specimen Scientist and self-appointed keeper of gross facts. He personally inspected, sniffed, and documented every specimen in the EWW-niverse. His colleagues disagree that this is science."
            />
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AppStoreButton />
              <Link
                href="/dr-icky"
                className="rounded-full border border-[var(--color-lab-line-bright)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]"
              >
                Meet Dr. Icky
              </Link>
            </div>
          </div>
          <LabTransmission
            src="/videos/dr-icky-intro.mp4"
            poster="/videos/dr-icky-intro-poster.jpg"
            label="Incoming transmission"
            caption="A short transmission from EWW-niverse Labs."
          />
        </div>
      </section>

      {/* ── APP SCREENSHOTS ────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Inside the app"
            title="The product, not a promise"
            sub="Real screens from the live app — built like a lab interface, slimy enough for kids, clean enough for parents."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {screenshots.map((s, i) => (
              <div key={s.src} className="flex flex-col items-center gap-3">
                <PhoneFrame src={s.src} alt={s.alt} priority={i === 0} className="w-full max-w-[220px]" />
                <p className="max-w-[220px] text-center text-xs leading-relaxed text-[var(--color-ink-dim)]">
                  {s.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING — one free app, one optional unlock ────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Free to play"
            title="Free to download. No ads. Ever."
            sub="EWW-niverse is free for everyone — the full 75-specimen Creepy Creatures field guide, a new gross challenge every day, quizzes, mastery and stages, with zero ads and no sign-up. One optional unlock opens the whole lab, forever."
            align="center"
          />

          {/* Single product card: free app, then optional in-app unlock */}
          <div
            className="mt-10 overflow-hidden rounded-[1.5rem]"
            style={{ border: "1px solid var(--color-lab-line-bright)", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.7)" }}
          >
            {/* FREE — the whole app */}
            <div className="flex flex-col gap-6 bg-[var(--color-lab-panel)] p-7 sm:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="lab-label text-[var(--color-neon)]">The app — free for everyone</p>
                  <p
                    className="mt-2 font-creepster text-5xl text-[var(--color-ink)]"
                    style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                  >
                    Free
                  </p>
                </div>
                <AppStoreButton />
              </div>
              <ul className="grid grid-cols-1 gap-2.5 text-sm text-[var(--color-ink-dim)] sm:grid-cols-2">
                {[
                  "No ads — not a single one",
                  "No sign-up, no account, no tracking",
                  "All 75 Creepy Creatures specimens",
                  "A new Today's Gross Challenge daily",
                  "Lab quizzes, mastery and bonus scans",
                  "Stages 1–2: Kinda Curious → Properly Revolted",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-[var(--color-neon)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* OPTIONAL in-app unlock */}
            <div
              className="flex flex-col gap-5 p-7 sm:p-9"
              style={{
                background: "linear-gradient(165deg, var(--color-lab-panel-2), var(--color-lab-panel))",
                borderTop: "1px solid var(--color-neon)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="lab-label text-[var(--color-neon)]">Optional · one-time in-app unlock</p>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black"
                  style={{ backgroundColor: "var(--color-neon)" }}
                >
                  {PRODUCT.price} · lifetime
                </span>
              </div>
              <h3
                className="text-2xl text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-boogaloo), cursive" }}
              >
                Full Lab Pass — unlock the whole lab
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 text-sm text-[var(--color-ink-dim)] sm:grid-cols-2">
                {[
                  "All 234 specimens — Creatures, Dinosaurs & Earth",
                  "All 15 special Slime Surge unlocks",
                  "Stages 3–5: Super Slimy → Full Dr. Icky",
                  "One-time $3.99. No subscription, ever.",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-[var(--color-neon)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[var(--color-ink-mute)]">
                Unlock it from inside the free app whenever you&apos;re ready — it&apos;s a single purchase that lasts forever, on every device signed in to your Apple account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKS — FIELD GUIDES ───────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="The collection"
              title="The field guides behind the lab"
              sub="The EWW-niverse books are the printed field guides. The app turns the same gross-science universe into scans, quizzes, scores, and Dr. Icky's verdicts."
            />
            <Link
              href="/books"
              className="rounded-full bg-[var(--color-neon)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
            >
              View all {PRODUCT.booksPublished} books
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {books.map((book) => (
              <a
                key={book.id}
                href={book.amazonUrl}
                target="_blank"
                rel="noopener"
                className="lab-card group flex flex-col gap-2 overflow-hidden p-2.5"
              >
                <div className="relative overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bookCoverPath(book.coverFile)}
                    alt={`${book.title} book cover`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {appBookIds.has(book.id) && (
                    <span
                      className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: "var(--color-neon)" }}
                    >
                      In the app
                    </span>
                  )}
                </div>
                <p className="px-1 text-xs font-semibold leading-snug text-[var(--color-ink)]">{book.title}</p>
              </a>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-[var(--color-ink-mute)]">
            Read the field guides. Then classify the specimens in the app.
          </p>
        </div>
      </section>

      {/* ── PARENT TRUST ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="relative mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="For parents"
            title="Gross for kids. Clean for parents."
            sub="No ads. No tracking. No social feeds. No user-generated content. Just real science facts, strange creatures, creepy discoveries, and a one-time Full Lab Pass."
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "No ads, ever", d: "No banners, no pop-ups, no third-party ad networks." },
              { t: "No tracking", d: "No analytics SDKs, no advertising IDs, no behavioural profiling." },
              { t: "No accounts", d: "No sign-up, no email, no personal child data collected." },
              { t: "No social, no UGC", d: "No feeds, no chat, no comments — nothing user-generated to moderate." },
            ].map((c) => (
              <div key={c.t} className="lab-panel p-5">
                <p className="text-base font-semibold text-[var(--color-neon)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
                  {c.t}
                </p>
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

      {/* ── SPECIMEN FILES ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="From the field" title="Specimen Files" />
            <Link href="/specimen-files" className="text-sm font-bold uppercase tracking-wide text-[var(--color-neon)] hover:underline">
              All files →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {specimenPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/specimen-files/${post.slug}`}
                className="lab-card group flex flex-col overflow-hidden"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[var(--color-lab-void)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={creatureImagePath(post.creatureName)}
                    alt={post.creatureName}
                    loading="lazy"
                    className="h-28 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="lab-label text-[var(--color-neon)]">{categoryLabels[post.category]}</span>
                  <h3
                    className="text-base leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-neon)]"
                    style={{ fontFamily: "var(--font-boogaloo), cursive" }}
                  >
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--color-ink-dim)]">{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-[var(--color-lab-line)] pt-2">
                    <span className="text-xs text-[var(--color-ink-mute)]">{post.readTime} min read</span>
                    <span className="text-xs font-bold text-[var(--color-neon)] group-hover:underline">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--color-ink-mute)]">
            Want to classify specimens yourself?{" "}
            <a href={APP_STORE_URL} target="_blank" rel="noopener" className="font-semibold text-[var(--color-neon)] hover:underline">
              Get the app →
            </a>
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
