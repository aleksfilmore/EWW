import type { Metadata } from "next";
import { books, bookCoverPath } from "@/lib/data";
import EmailSignupForm from "@/components/EmailSignupForm";

export const metadata: Metadata = {
  title: "The Books",
  description: "All 6 published EWW-niverse books by Dr. Icky. Creepy Creatures, Creepy Earth, Creepy Dinosaurs, Creepy Deep Sea, Creepy Skeletons, Creepy Tiny World.",
};

const bookDescriptions: Record<string, { age: string; entries: number; highlight: string }> = {
  "creepy-creatures": {
    age: "7+",
    entries: 75,
    highlight: "The flagship. Where it all started. The spider on the cover will haunt you.",
  },
  "creepy-earth": {
    age: "7+",
    entries: 75,
    highlight: "The planet is trying to kill you. This book explains how.",
  },
  "creepy-dinosaurs": {
    age: "7+",
    entries: 75,
    highlight: "Not the ones from the movies. The real, weirder ones.",
  },
  "creepy-deep-sea": {
    age: "7+",
    entries: 75,
    highlight: "Most of the ocean is uncharted. The part we've seen is already too much.",
  },
  "creepy-skeletons": {
    age: "7+",
    entries: 75,
    highlight: "Bones, exoskeletons, and the strange architecture underneath.",
  },
  "creepy-tiny-world": {
    age: "7+",
    entries: 75,
    highlight: "You are covered in things you cannot see. This book names them.",
  },
};

export default function BooksPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#F7F2E4] border-b border-[#C8B89A] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
            The collection
          </p>
          <h1
            className="text-4xl md:text-5xl text-[#1A3D0E] mb-4"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            The Books
          </h1>
          <p className="text-[#7A6652] max-w-xl leading-relaxed">
            Six books. 450 entries total. Every fact scientifically accurate. Every creature weirder than the last. Available everywhere books are sold.
          </p>
        </div>
      </section>

      {/* Books grid */}
      <section className="bg-[#FDFAF3] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-6">
            {books.map((book, i) => {
              const extra = bookDescriptions[book.id];
              const isV1 = book.id === "creepy-creatures";
              return (
                <div
                  key={book.id}
                  className={`flex flex-col sm:flex-row gap-0 rounded-2xl border overflow-hidden transition-shadow hover:shadow-lg ${
                    isV1 ? "border-[#5DB84A] border-2" : "border-[#C8B89A]"
                  } bg-[#F7F2E4]`}
                >
                  {/* Cover */}
                  <div className="sm:w-48 md:w-56 flex-shrink-0 bg-[#EDE5CE] flex items-center justify-center overflow-hidden">
                    <img
                      src={bookCoverPath(book.coverFile)}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {isV1 && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#5DB84A] text-white px-2.5 py-0.5 rounded-full">
                          App launch book
                        </span>
                      )}
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A6652] bg-[#EDE5CE] px-2.5 py-0.5 rounded-full">
                        Ages {extra?.age}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A6652] bg-[#EDE5CE] px-2.5 py-0.5 rounded-full">
                        {extra?.entries} entries
                      </span>
                    </div>

                    <h2
                      className="text-2xl text-[#1A3D0E]"
                      style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                    >
                      {book.title}
                    </h2>

                    <p className="text-[#7A6652] text-sm leading-relaxed">
                      {book.description}
                    </p>

                    {extra?.highlight && (
                      <p className="text-xs text-[#5DB84A] font-semibold italic">
                        &ldquo;{extra.highlight}&rdquo;
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-auto pt-2">
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Notebook coming soon */}
      <section className="bg-[#EDE5CE] py-12 border-t border-[#C8B89A]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/images/dr-icky/Dr.%20Icky%20holding%20a%20clipboard.png"
            alt="Dr. Icky with a clipboard"
            className="illustration-character w-28 object-contain"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#854F0B]">
              Coming next
            </span>
            <h3
              className="text-xl text-[#1A3D0E]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Lab Notebook — Book 7
            </h3>
            <p className="text-sm text-[#7A6652] leading-relaxed max-w-lg">
              The experiment-based companion volume. Hands-on, gross, and scientifically rigorous. Join the waitlist to get first access.
            </p>
            <div className="mt-2">
              <EmailSignupForm buttonText="Join waitlist" buttonVariant="dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
