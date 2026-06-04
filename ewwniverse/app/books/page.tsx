import type { Metadata } from "next";
import { books, bookCoverPath } from "@/lib/data";
import { PRODUCT, SITE_URL } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Books",
  description:
    "The 6 published EWW-niverse field guides by Dr. Icky — Creepy Creatures, Earth, Dinosaurs, Deep Sea, Skeletons and Tiny World. Read the field guides, then classify the specimens in the app.",
  alternates: { canonical: "/books" },
};

// Specimen counts verified for the three guides that power the app.
const appBooks: Record<string, number> = {
  "creepy-creatures": 75,
  "creepy-dinosaurs": 80,
  "creepy-earth": 79,
};

const highlights: Record<string, string> = {
  "creepy-creatures": "The flagship. Where it all started. The spider on the cover will haunt you.",
  "creepy-earth": "The planet is trying to kill you. This book explains how.",
  "creepy-dinosaurs": "Not the ones from the movies. The real, weirder ones.",
  "creepy-deep-sea": "Most of the ocean is uncharted. The part we've seen is already too much.",
  "creepy-skeletons": "Bones, exoskeletons, and the strange architecture underneath.",
  "creepy-tiny-world": "You are covered in things you cannot see. This book names them.",
};

export default function BooksPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "The EWW-niverse books by Dr. Icky",
          itemListElement: books.map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Book",
              name: book.title,
              author: { "@type": "Person", name: "Dr. Icky" },
              publisher: { "@type": "Organization", name: "EWW-niverse" },
              url: book.amazonUrl,
              image: `${SITE_URL}${bookCoverPath(book.coverFile)}`,
              bookFormat: "https://schema.org/Paperback",
              description: book.description,
            },
          })),
        }}
      />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16 md:py-20">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The collection"
            title="The field guides behind the lab"
            sub={`${PRODUCT.booksPublished} printed field guides to the revolting natural world. Three of them power the app today — read the field guide, then classify the specimens in the app.`}
          />
        </div>
      </section>

      {/* ── BOOKS ──────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          {books.map((book, i) => {
            const inApp = appBooks[book.id];
            return (
              <div key={book.id} className="lab-card flex flex-col gap-0 overflow-hidden sm:flex-row">
                {/* Cover */}
                <div className="flex flex-shrink-0 items-center justify-center bg-[var(--color-lab-void)] sm:w-48 md:w-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bookCoverPath(book.coverFile)}
                    alt={`${book.title} book cover`}
                    className="h-full w-full object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>
                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {inApp ? (
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black" style={{ backgroundColor: "var(--color-neon)" }}>
                        In the app · {inApp} specimens
                      </span>
                    ) : (
                      <span className="rounded-full border border-[var(--color-lab-line-bright)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-mute)]">
                        Print field guide
                      </span>
                    )}
                    <span className="rounded-full border border-[var(--color-lab-line)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-mute)]">
                      Ages 9–12
                    </span>
                  </div>
                  <h2 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{book.title}</h2>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{book.description}</p>
                  {highlights[book.id] && (
                    <p className="text-xs font-semibold italic text-[var(--color-neon)]">&ldquo;{highlights[book.id]}&rdquo;</p>
                  )}
                  <div className="mt-auto pt-2">
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-[var(--color-neon)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
                    >
                      Buy on Amazon
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW BOOKS CONNECT TO THE APP ───────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-lab-void)] py-16">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="Books × app" title="Read it. Then classify it." align="center" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { n: "01", t: "Read the field guide", d: "Each printed book is a complete, illustrated field guide to one corner of the gross natural world." },
              { n: "02", t: "Open the free app", d: "Creepy Creatures, Dinosaurs and Earth are built into the app as scannable specimens." },
              { n: "03", t: "Classify & master", d: "Scan the specimens you read about, survive the quiz, and raise your EWW score." },
            ].map((s) => (
              <div key={s.n} className="lab-panel flex flex-col gap-2 p-5">
                <span className="font-creepster text-2xl text-[var(--color-neon)]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>{s.n}</span>
                <p className="text-base text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{s.t}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Bring the books to life." sub="Download the free app and classify the specimens from the field guides yourself." />
    </>
  );
}
