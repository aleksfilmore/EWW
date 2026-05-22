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
      <section className="relative overflow-hidden bg-[#F7F2E4] min-h-[88vh] flex items-center">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        {/* Corner slime — top right */}
        <img src="/images/ui/Corner%20slime%20blob%20cluster.png" alt="" aria-hidden="true"
          className="illustration absolute top-0 right-0 w-48 md:w-64 pointer-events-none"
          style={{ transform: "scaleX(-1)" }} />
        {/* Slime splatter — bottom left */}
        <img src="/images/ui/Slime%20splatter%20cluster.png" alt="" aria-hidden="true"
          className="illustration absolute bottom-4 left-4 w-32 pointer-events-none opacity-70" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src="/images/icons/biohazard.svg" alt="" aria-hidden="true" className="w-5 h-5"
                style={{ filter: "invert(40%) sepia(80%) saturate(500%) hue-rotate(75deg)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">Dr. Icky&apos;s Laboratory</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#1A3D0E] leading-[1.05]">
              The<br />EWW-niverse
            </h1>

            <p className="text-lg text-[#7A6652] leading-relaxed max-w-md">
              For kids who like facts too weird for normal science apps. 75 creatures. Every one of them disgusting. Scientifically accurate. Approved by Dr. Icky.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/books" className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
                Explore the Books
              </Link>
              <Link href="/app" className="border-2 border-[#C8B89A] hover:border-[#5DB84A] text-[#3D2B1F] font-semibold px-6 py-3 rounded-full transition-colors text-sm">
                Get the App
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-4 pt-2">
              {[{ n: "6", label: "Books published" }, { n: "450", label: "Revolting entries" }, { n: "75", label: "App creatures" }].map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-10 bg-[#C8B89A]" />}
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-[#1A3D0E]" style={{ fontFamily: '"Cantora One", Georgia, serif' }}>{s.n}</span>
                    <span className="text-xs text-[#7A6652] uppercase tracking-wider">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dr. Icky holding EWW-meter */}
          <div className="flex justify-center md:justify-end items-end relative">
            <img src="/images/ui/Torn%20parchment%20rectangle.png" alt="" aria-hidden="true"
              className="illustration absolute bottom-0 right-4 w-48 opacity-50 pointer-events-none" />
            <img
              src="/images/ui/Dr.%20Icky%20holding%20EWW-meter.png"
              alt="Dr. Icky holding the EWW-meter"
              className="illustration relative w-72 md:w-96 lg:w-[420px] object-contain"
            />
          </div>
        </div>

        {/* Slime drip bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <img src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png" alt=""
            className="w-full" style={{ transform: "rotate(180deg)", display: "block", maxHeight: 48, objectFit: "cover" }} />
        </div>
      </section>

      {/* ── FEATURED CREATURES ───────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A32D2D] mb-1">⚠ Total Barf tier</p>
              <h2 className="text-3xl text-[#1A3D0E]">The Most Revolting</h2>
            </div>
            <Link href="/books" className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block">
              View all 75 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredCreatures.map((c) => (
              <CreatureCard key={c.name} creature={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKS ────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#F0EAD6" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover" }} />
        <img src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ maxHeight: 24, objectFit: "cover" }} />
        <div className="relative max-w-6xl mx-auto px-4 pt-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">The collection</p>
              <h2 className="text-3xl text-[#1A3D0E]">The Books</h2>
            </div>
            <Link href="/books" className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block">
              See all 6 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/books" className="border-2 border-[#5DB84A] text-[#1A3D0E] font-semibold px-6 py-3 rounded-full hover:bg-[#5DB84A] hover:text-white transition-colors text-sm">
              See all 6 books
            </Link>
          </div>
        </div>
      </section>

      {/* ── APP CTA — dark section ─────────────────────────────── */}
      <section className="dark-section bg-[#1A3D0E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Lab%20tile%20background.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }} />
        <img src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-40"
          style={{ maxHeight: 20, objectFit: "cover" }} />

        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">Coming soon — iOS &amp; Android</p>
            <h2 className="text-3xl md:text-4xl text-[#F7F2E4]">The EWW-niverse App</h2>
            <p className="text-[#8A9E86] leading-relaxed">
              75 creatures. A quiz that tests whether you can name a creature from its grossest fact. An EWW-meter that fills like a viscous arc. Daily engagement for kids who cannot get enough of disgusting science.
            </p>
            <Link href="/app" className="inline-block bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm w-fit">
              Learn more &amp; get notified
            </Link>
          </div>
          <div className="flex justify-center md:justify-end items-end gap-6">
            <div className="flex flex-col gap-3">
              <img src="/images/ui/EWW-meter%2060%25.png" alt="EWW-meter 60%" className="illustration w-32 object-contain" />
              <img src="/images/ui/EWW-meter%2080%25.png" alt="EWW-meter 80%" className="illustration w-32 object-contain" />
              <img src="/images/ui/EWW-meter%20100%25.png" alt="EWW-meter 100%" className="illustration w-32 object-contain" />
            </div>
            <img src="/images/ui/Dr.%20Icky%20holding%20specimen%20jar.png" alt="Dr. Icky with a specimen"
              className="illustration w-40 md:w-48 object-contain self-end" />
          </div>
        </div>
      </section>

      {/* ── SPECIMEN FILES ───────────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">From the field</p>
              <h2 className="text-3xl text-[#1A3D0E]">Specimen Files</h2>
            </div>
            <Link href="/specimen-files" className="text-sm font-semibold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block">
              All field reports &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specimenPosts.map((post) => (
              <Link key={post.slug} href={`/specimen-files/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#C8B89A] bg-[#F7F2E4] overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5DB84A]">
                    {categoryLabels[post.category]}
                  </span>
                  <h3 className="text-base text-[#1A3D0E] leading-snug group-hover:text-[#5DB84A] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#7A6652] leading-relaxed flex-1">{post.excerpt}</p>
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
      <section className="bg-[#EDE5CE] py-14 border-t border-[#C8B89A] relative overflow-hidden">
        <img src="/images/ui/Goo%20footprint%20trail.png" alt="" aria-hidden="true"
          className="illustration absolute left-0 top-0 h-full opacity-10 pointer-events-none"
          style={{ objectFit: "cover" }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <img src="/images/ui/Dr.%20Icky%20warning%20pose%20with%20raised%20finger.png" alt="Dr. Icky has an announcement"
            className="illustration w-24 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl text-[#1A3D0E] mb-3">Stay classified</h2>
          <p className="text-sm text-[#7A6652] mb-6 leading-relaxed">
            New specimen files, book news, and app launch updates. No spam. Dr. Icky does not tolerate spam.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
