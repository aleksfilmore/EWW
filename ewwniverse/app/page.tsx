import Link from "next/link";
import { books, creatures, specimenPosts } from "@/lib/data";
import BookCard from "@/components/BookCard";
import CreatureCard from "@/components/CreatureCard";
import EmailSignupForm from "@/components/EmailSignupForm";

const featuredCreatures = creatures.filter((c) => c.ewwMeter === 100).slice(0, 8);

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F7F2E4] min-h-[85vh] flex items-center">
        {/* Parchment texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)",
            backgroundSize: "cover",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src="/images/ui/Green%20Risk%20sticker.png" alt="" aria-hidden="true" className="w-10 h-10 object-contain" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">
                Dr. Icky&apos;s Laboratory
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl text-[#1A3D0E] leading-[1.05]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              The
              <br />
              EWW-niverse
            </h1>

            <p className="text-lg text-[#7A6652] leading-relaxed max-w-md">
              For kids who like facts too weird for normal science apps. 75 creatures. Every one of them disgusting. Scientifically accurate. Approved by Dr. Icky.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/books"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Explore the Books
              </Link>
              <Link
                href="/app"
                className="border-2 border-[#C8B89A] hover:border-[#5DB84A] text-[#3D2B1F] font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Get the App
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/images/ui/Dr.%20Icky%20Approved%20badge.png"
                alt="Approved by Dr. Icky"
                className="w-14 h-14 object-contain"
              />
              <div>
                <p className="text-xs font-semibold text-[#1A3D0E]">6 books published</p>
                <p className="text-xs text-[#7A6652]">450 revolting entries and counting</p>
              </div>
            </div>
          </div>

          {/* Dr. Icky hero illustration */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20magnifying%20glass.png"
              alt="Dr. Icky examining something revolting"
              className="w-72 md:w-96 lg:w-[420px] object-contain drop-shadow-xl"
              priority-hint="high"
            />
          </div>
        </div>

        {/* Slime drip bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <img
            src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
            alt=""
            className="w-full rotate-180"
            style={{ maxHeight: 40, objectFit: "cover" }}
          />
        </div>
      </section>

      {/* ── FEATURED CREATURES ───────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">
                Classified specimens
              </p>
              <h2
                className="text-3xl text-[#1A3D0E]"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                Total Barf Tier
              </h2>
            </div>
            <Link
              href="/books"
              className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block"
            >
              View all 75 creatures &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredCreatures.map((c) => (
              <CreatureCard key={c.name} creature={c} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/books"
              className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors"
            >
              View all 75 creatures &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOKS ────────────────────────────────────────────────── */}
      <section className="bg-[#F7F2E4] py-16 relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover" }}
        />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">
                The collection
              </p>
              <h2
                className="text-3xl text-[#1A3D0E]"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                The Books
              </h2>
            </div>
            <Link
              href="/books"
              className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block"
            >
              See all books &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/books"
              className="border-2 border-[#5DB84A] text-[#1A3D0E] font-semibold px-6 py-3 rounded-full hover:bg-[#5DB84A] hover:text-white transition-colors text-sm"
            >
              See all 6 books
            </Link>
          </div>
        </div>
      </section>

      {/* ── APP CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#1A3D0E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/slime%20splat.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">
              Coming soon
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#F7F2E4]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              The EWW-niverse App
            </h2>
            <p className="text-[#8A9E86] leading-relaxed">
              75 creatures. A quiz that tests whether you can name a creature from its grossest fact. An EWW-meter that fills like a viscous arc. Daily engagement for kids who cannot get enough of disgusting science.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/app"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Learn more &amp; get notified
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end gap-4">
            <div className="flex flex-col gap-3">
              {[60, 80, 100].map((pct) => (
                <img
                  key={pct}
                  src={`/images/ui/EWW-meter%20${pct}%25.png`}
                  alt={`EWW-meter at ${pct}%`}
                  className="w-32 object-contain"
                />
              ))}
            </div>
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20specimen%20jar.png"
              alt="Dr. Icky with a specimen"
              className="w-40 md:w-48 object-contain self-end"
            />
          </div>
        </div>
      </section>

      {/* ── SPECIMEN FILES ───────────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">
                From the field
              </p>
              <h2
                className="text-3xl text-[#1A3D0E]"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                Specimen Files
              </h2>
            </div>
            <Link
              href="/specimen-files"
              className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block"
            >
              All field reports &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specimenPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/specimen-files/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#C8B89A] bg-[#F7F2E4] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5DB84A]">
                    {categoryLabels[post.category]}
                  </span>
                  <h3
                    className="text-base text-[#1A3D0E] leading-snug group-hover:text-[#5DB84A] transition-colors"
                    style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#7A6652] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#7A6652]">
                    <span>{post.readTime} min read</span>
                    <span>&middot;</span>
                    <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────── */}
      <section className="bg-[#EDE5CE] py-14 border-t border-[#C8B89A]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/images/dr-icky/Dr.%20Icky%20warning%20pose%20with%20raised%20finger.png"
            alt="Dr. Icky has an announcement"
            className="w-24 mx-auto mb-4 object-contain"
          />
          <h2
            className="text-2xl text-[#1A3D0E] mb-3"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            Stay classified
          </h2>
          <p className="text-sm text-[#7A6652] mb-6 leading-relaxed">
            New specimen files, book news, and app launch updates. No spam. Dr. Icky does not tolerate spam.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
