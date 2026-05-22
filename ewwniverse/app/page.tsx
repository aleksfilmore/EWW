import Link from "next/link";
import { books, creatures, specimenPosts, creatureImagePath } from "@/lib/data";
import BookCard from "@/components/BookCard";
import CreatureCard from "@/components/CreatureCard";
import EmailSignupForm from "@/components/EmailSignupForm";

const featuredCreatures = creatures.filter((c) => c.ewwMeter === 100).slice(0, 8);
const heroSpecimen = creatures.find((c) => c.name === "Tongue-Eating Louse") ?? creatures[0];

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F0EAD6] min-h-[90vh] flex items-center">
        {/* Notebook paper texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)", backgroundSize: "cover" }}
        />
        {/* Slime corner decorations */}
        <img src="/images/ui/Corner%20slime%20blob%20cluster.png" alt="" aria-hidden="true"
          className="illustration absolute top-0 right-0 w-52 md:w-72 pointer-events-none" style={{ transform: "scaleX(-1)" }} />
        <img src="/images/ui/Slime%20splatter%20cluster.png" alt="" aria-hidden="true"
          className="illustration absolute bottom-4 left-4 w-28 pointer-events-none opacity-60" />
        {/* Bug scatter */}
        <img src="/images/ui/bug.png" alt="" aria-hidden="true"
          className="illustration absolute top-20 left-8 w-8 pointer-events-none opacity-30 rotate-12" />
        <img src="/images/ui/fly.png" alt="" aria-hidden="true"
          className="illustration absolute bottom-32 right-12 w-6 pointer-events-none opacity-25 -rotate-20" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5DB84A]">☣ Dr. Icky&apos;s Laboratory</span>
            </div>

            {/* Hero headline — Creepster + outlined */}
            <h1
              className="font-creepster leading-[1.0] text-[#1A3D0E]"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
              }}
            >
              Nature is<br />
              <span
                style={{
                  color: "#5DB84A",
                  WebkitTextStroke: "2px #1A3D0E",
                  paintOrder: "stroke fill",
                }}
              >
                Disgusting.
              </span>
              <br />
              <span className="text-[#1A3D0E]">And we love it.</span>
            </h1>

            <p className="text-base text-[#7A6652] leading-relaxed max-w-md">
              Gross science books, weird facts, creepy creatures, and slime-soaked missions for curious kids.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/app"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide">
                Get the Free Lab Kit
              </Link>
              <Link href="/books"
                className="bg-[#6B3FD4] hover:bg-[#4E2EA8] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide">
                Explore the Books
              </Link>
            </div>

            {/* Trust stamps */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <img src="/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png" alt="Approved by Dr. Icky"
                className="illustration h-10 w-auto object-contain opacity-80" />
              <img src="/images/ui/Do%20Not%20Lick%20stamp.png" alt="Do not lick"
                className="illustration h-10 w-auto object-contain opacity-80" />
              <img src="/images/ui/Junior%20Grossologist%20badge.png" alt="Junior Grossologist badge"
                className="illustration h-10 w-auto object-contain opacity-80" />
            </div>
          </div>

          {/* Dr. Icky + floating card */}
          <div className="flex justify-center md:justify-end items-end relative gap-4">
            <img
              src="/images/ui/Dr.%20Icky%20holding%20EWW-meter.png"
              alt="Dr. Icky holding the EWW-meter"
              className="illustration-character relative w-56 md:w-72 lg:w-80 object-contain flex-shrink-0"
            />
            {/* Floating specimen card */}
            <div
              className="flex-shrink-0 w-36 rounded-2xl overflow-hidden shadow-2xl mb-10 rotate-3"
              style={{ border: "2px solid #E53535", backgroundColor: "#2A0A0A" }}
            >
              <div className="relative bg-[#EDE5CE] h-32 flex items-center justify-center overflow-hidden p-2"
                style={{
                  backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
                  backgroundSize: "cover",
                  backgroundBlendMode: "multiply",
                }}>
                <span className="absolute top-1 left-1 text-[8px] font-black uppercase tracking-wide bg-[#6B3FD4] text-white px-1.5 py-0.5 rounded-full z-10">
                  EPIC
                </span>
                <span className="absolute top-1 right-1 text-[8px] font-black uppercase tracking-wide bg-[#E53535] text-white px-1.5 py-0.5 rounded-full z-10">
                  EWW 100
                </span>
                <img src={creatureImagePath(heroSpecimen.name)} alt={heroSpecimen.name}
                  className="illustration w-full h-full object-contain relative z-0" />
              </div>
              <div className="p-2">
                <p className="font-creepster text-[#F7F2E4] text-xs leading-snug"
                  style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                  {heroSpecimen.name}
                </p>
                <p className="text-[8px] text-[#E53535] font-bold uppercase tracking-wider mt-0.5">Specimen #001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slime drip bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <img src="/images/ui/Slime%20drip%20bottom%20border.png" alt=""
            className="w-full block" style={{ maxHeight: 48, objectFit: "cover", objectPosition: "bottom" }} />
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────────────── */}
      <section className="bg-[#1A3D0E] py-8 border-y-2 border-[#5DB84A]/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "/images/ui/petri%20dish.png", color: "#5DB84A", bg: "#0D2007", label: "Gross Facts", desc: "Mind-blowing facts that are actually true (and totally gross)." },
              { icon: "/images/ui/magnifying%20glass.png", color: "#D48B1A", bg: "#1A1206", label: "Creepy Creatures", desc: "Meet the weirdest animals on Earth and beyond." },
              { icon: "/images/ui/microscope.png", color: "#6B3FD4", bg: "#110823", label: "Lab Missions", desc: "Experiments, codes, and slimey challenges." },
            ].map((p) => (
              <div key={p.label}
                className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                style={{ borderColor: p.color + "40", backgroundColor: p.bg }}>
                <img src={p.icon} alt="" aria-hidden="true"
                  className="w-10 h-10 object-contain flex-shrink-0"
                  style={{ mixBlendMode: "normal" }} />
                <div>
                  <p className="font-creepster text-base mb-0.5"
                    style={{ color: p.color, fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                    {p.label}
                  </p>
                  <p className="text-xs text-[#8A9E86] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIPE ──────────────────────────────────────────────── */}
      <section className="bg-[#0D2007] py-8 border-b border-[#1A3D0E]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-[#1A3D0E]">
            {[
              { n: "6", label: "Books published" },
              { n: "75", label: "Revolting creatures" },
              { n: "450", label: "Gross-out facts" },
              { n: "01", label: "Mad scientist" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center md:px-6">
                <span
                  className="font-creepster text-5xl leading-none"
                  style={{ color: "#5DB84A", fontFamily: "var(--font-creepster), 'Cantora One', serif", WebkitTextStroke: "1px #3D8C2A", paintOrder: "stroke fill" }}
                >
                  {s.n}
                </span>
                <span className="text-xs text-[#8A9E86] uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIMEN CARDS — collectible style ────────────────────────── */}
      <section
        className="py-16"
        style={{
          backgroundImage: "url(/images/ui/Graph%20paper%20texture.png)",
          backgroundSize: "cover",
          backgroundColor: "#F0EAD6",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/ui/Total%20Barf%20sticker.png" alt="Total Barf" className="illustration w-10 h-10 object-contain" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#A32D2D]">Total Barf tier — EWW 100</span>
              </div>
              <h2
                className="font-creepster text-4xl text-[#1A3D0E]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Unlock Specimen Files
              </h2>
              <p className="text-xs text-[#7A6652] mt-1 uppercase tracking-widest">Collect. Learn. Gross out.</p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span
                className="font-creepster text-6xl leading-none text-[#5DB84A]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >75</span>
              <span className="text-[10px] uppercase tracking-widest text-[#7A6652]">specimens total</span>
              <Link href="/specimen-files" className="text-xs font-bold text-[#5DB84A] hover:underline mt-1">Browse all →</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredCreatures.map((c) => (
              <CreatureCard key={c.name} creature={c} showFact />
            ))}
          </div>
        </div>
      </section>

      {/* Hazard tape divider */}
      <div className="w-full h-7 overflow-hidden">
        <img src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="w-full h-full object-cover illustration" style={{ mixBlendMode: "multiply" }} />
      </div>

      {/* ── BOOKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F2E4] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover" }}
        />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-2">The collection</p>
              <h2
                className="font-creepster text-4xl md:text-5xl text-[#1A3D0E]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Meet the Books
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <img src="/images/ui/Field%20Safe%20Copy%20stamp.png" alt="" aria-hidden="true"
                className="illustration w-12 h-12 object-contain" />
              <Link href="/books" className="bg-[#1A3D0E] hover:bg-[#5DB84A] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors uppercase tracking-wide">
                View All Books
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Link href="/books"
              className="border-2 border-[#5DB84A] text-[#1A3D0E] font-bold px-6 py-3 rounded-full hover:bg-[#5DB84A] hover:text-white transition-colors text-sm uppercase tracking-wide">
              See all 6 books
            </Link>
          </div>
        </div>
      </section>

      {/* Evidence tape divider */}
      <div className="w-full h-7 overflow-hidden">
        <img src="/images/ui/Evidence%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="w-full h-full object-cover illustration" style={{ mixBlendMode: "multiply" }} />
      </div>

      {/* ── APP — PURPLE SECTION ──────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#2A1A5E" }}>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Lab%20tile%20background.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }}
        />
        <img src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png" alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: 32, objectFit: "cover", objectPosition: "top", mixBlendMode: "soft-light" }} />

        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">Coming soon — iOS &amp; Android</p>
            <h2
              className="font-creepster leading-tight"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#F7F2E4",
              }}
            >
              The App is{" "}
              <span style={{ color: "#5DB84A", WebkitTextStroke: "1px #3D8C2A", paintOrder: "stroke fill" }}>
                Brewing
              </span>
            </h2>
            <p className="text-[#A78BFA] leading-relaxed text-sm">
              Games, missions, creature hunts, EWW-meter tracking, and badges that make bragging rights official.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/app"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide">
                Join the App Waitlist →
              </Link>
            </div>
            {/* App badges */}
            <div className="flex gap-3 mt-2">
              {[
                { img: "/images/ui/Mission%20Complete%20sticker.png", label: "Mission Complete" },
                { img: "/images/ui/Badge%20Unlocked%20sticker.png", label: "Badge Unlocked" },
                { img: "/images/ui/Junior%20Grossologist%20badge.png", label: "Junior Grossologist" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1">
                  <img src={b.img} alt={b.label}
                    className="illustration w-14 h-14 object-contain"
                    style={{ mixBlendMode: "normal" }} />
                  <span className="text-[8px] text-[#A78BFA] uppercase tracking-widest text-center leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EWW meters + Dr. Icky */}
          <div className="flex justify-center md:justify-end items-end gap-6">
            <div className="flex flex-col gap-3">
              {[60, 80, 100].map((pct) => (
                <img key={pct}
                  src={`/images/ui/EWW-meter%20${pct}%25.png`}
                  alt={`EWW-meter ${pct}%`}
                  className="illustration w-32 object-contain"
                  style={{ mixBlendMode: "normal" }} />
              ))}
            </div>
            <img src="/images/dr-icky/Dr.%20Icky%20shocked%20by%20gross%20goo.png"
              alt="Dr. Icky reacting"
              className="illustration-character w-40 md:w-48 object-contain self-end" />
          </div>
        </div>
      </section>

      {/* ── LAB KIT CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14"
        style={{
          backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
          backgroundSize: "cover",
          backgroundColor: "#F0EAD6",
        }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-2">Free download</p>
                <h2
                  className="font-creepster text-4xl md:text-5xl text-[#1A3D0E] leading-tight"
                  style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                >
                  Start Your<br />
                  <span style={{ color: "#5DB84A", WebkitTextStroke: "2px #1A3D0E", paintOrder: "stroke fill" }}>
                    Lab Training
                  </span>
                </h2>
              </div>
              <p className="text-[#7A6652] text-sm leading-relaxed max-w-md">
                Download your FREE Dr. Icky Lab Kit and become an official EWW-niverse recruit. Includes a recruit badge, printable activity sheet, and your personal EWW-meter tracker.
              </p>
              <div>
                <Link href="/app#notify"
                  className="inline-flex items-center gap-2 bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide">
                  Get the Free Lab Kit →
                </Link>
              </div>
              <p className="text-xs text-[#A89070]">No purchase required. PDF download. Ages 7+.</p>
            </div>

            {/* Kit components visual */}
            <div className="flex items-end justify-center md:justify-end gap-4">
              {[
                { img: "/images/ui/Access%20Granted%20%20Recruit%20File.png", label: "Recruit Badge" },
                { img: "/images/ui/Lab%20Safety%20Oath.png", label: "Printable Activity" },
                { img: "/images/ui/Round%20EWW%20gauge.png", label: "EWW-Meter Tracker" },
              ].map((k, i) => (
                <div key={k.label} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-xl border-2 border-[#C8B89A] bg-[#EDE5CE] overflow-hidden flex items-center justify-center p-3"
                    style={{ width: i === 1 ? "96px" : "80px", height: i === 1 ? "96px" : "80px" }}
                  >
                    <img src={k.img} alt={k.label}
                      className="illustration w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7A6652] text-center">{k.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center self-center ml-2">
                <img src="/images/dr-icky/Dr.%20Icky%20giving%20thumbs%20up.png"
                  alt="Dr. Icky approves"
                  className="illustration-character w-24 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIMEN FILES ─────────────────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-16 border-t border-[#C8B89A]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-1">From the field</p>
              <h2
                className="font-creepster text-3xl text-[#1A3D0E]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Specimen Files
              </h2>
            </div>
            <Link href="/specimen-files" className="text-sm font-bold text-[#5DB84A] hover:text-[#3D8C2A] transition-colors hidden sm:block uppercase tracking-wide">
              All files →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specimenPosts.map((post) => (
              <Link key={post.slug} href={`/specimen-files/${post.slug}`}
                className="group flex flex-col rounded-xl border-2 border-[#C8B89A] bg-[#F7F2E4] overflow-hidden hover:border-[#5DB84A] hover:shadow-lg transition-all">
                {/* Creature image */}
                <div className="relative bg-[#EDE5CE] h-36 flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                  }}>
                  <img src={creatureImagePath(post.creatureName)} alt={post.creatureName}
                    className="illustration h-28 object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5DB84A]">
                    {categoryLabels[post.category]}
                  </span>
                  <h3
                    className="font-creepster text-base text-[#1A3D0E] leading-snug group-hover:text-[#5DB84A] transition-colors"
                    style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#7A6652] leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#C8B89A]">
                    <span className="text-xs text-[#7A6652]">{post.readTime} min read</span>
                    <span className="text-xs font-bold text-[#5DB84A] group-hover:underline">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#1A3D0E] py-8 border-t-2 border-[#5DB84A]/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "/images/ui/Green%20Risk%20sticker.png", color: "#5DB84A", title: "Kid-Safe Gross Fun", desc: "Designed for curious kids. Approved by parents." },
              { icon: "/images/ui/petri%20dish.png", color: "#A78BFA", title: "STEM Curiosity", desc: "Sparks wonder through science and discovery." },
              { icon: "/images/ui/Lab%20Safety%20Oath.png", color: "#D48B1A", title: "Printable Activities", desc: "Fun worksheets and labs you can print anytime." },
            ].map((t) => (
              <div key={t.title} className="flex items-center gap-4">
                <img src={t.icon} alt="" aria-hidden="true"
                  className="illustration w-10 h-10 object-contain flex-shrink-0"
                  style={{ mixBlendMode: "normal" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: t.color }}>{t.title}</p>
                  <p className="text-xs text-[#8A9E86] leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ─────────────────────────────────────────────── */}
      <section className="bg-[#EDE5CE] py-14 border-t border-[#C8B89A] relative overflow-hidden">
        <img src="/images/ui/Goo%20footprint%20trail.png" alt="" aria-hidden="true"
          className="illustration absolute left-0 top-0 h-full opacity-10 pointer-events-none"
          style={{ objectFit: "cover" }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <img src="/images/dr-icky/Dr.%20Icky%20warning%20pose%20with%20raised%20finger.png"
            alt="Dr. Icky has an announcement"
            className="illustration-character w-24 mx-auto mb-4 object-contain" />
          <h2
            className="font-creepster text-3xl text-[#1A3D0E] mb-3"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            Stay Classified
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
