import type { Metadata } from "next";
import Link from "next/link";
import { specimenPosts, ewwMeterLabels, creatureImagePath } from "@/lib/data";
import EmailSignupForm from "@/components/EmailSignupForm";

export const metadata: Metadata = {
  title: "Specimen Files",
  description: "Weekly creature features, field reports, and weird science from Dr. Icky's laboratory.",
};

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

const ewwMeterImage: Record<number, string> = {
  60:  "/images/ui/eww-meter-60.png",
  80:  "/images/ui/eww-meter-80.png",
  100: "/images/ui/eww-meter-100.png",
};

const postEwwLevel: Record<string, 60 | 80 | 100> = {
  "zombie-ant-fungus":    100,
  "tongue-eating-louse":  100,
  "hagfish-slime":        100,
};

export default function SpecimenFilesPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <section className="dark-section relative overflow-hidden py-16" style={{ backgroundColor: "#080808" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/Lab%20tile%20background.png)",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/ui/Classified%20stamp.png"
                  alt="Classified"
                  className="w-14 h-14 object-contain opacity-90"
                  style={{ mixBlendMode: "screen" }}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-[#5DB84A]">
                  From the field
                </span>
              </div>
              <h1
                className="font-creepster text-5xl md:text-6xl mb-4 leading-tight"
                style={{ color: "#F4EED8", fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Specimen Files
              </h1>
              <p className="text-[#8A9E86] max-w-md leading-relaxed">
                Deep-dives into the grossest creatures on the planet. Verified by Dr. Icky.
                Dangerous to read before lunch.
              </p>
            </div>
            <div className="flex justify-end items-end gap-4">
              <img
                src="/images/dr-icky/dr-icky-portrait.png"
                alt="Dr. Icky investigating"
                className="illustration-character w-44 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ─────────────────────────────────────────── */}
      <section className="py-14 border-t border-[#1A3D0E]" style={{ backgroundColor: "#0A1205" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specimenPosts.map((post) => {
              const ewwLevel = postEwwLevel[post.slug] ?? 60;
              const ewwConfig = ewwMeterLabels[ewwLevel];
              return (
                <Link
                  key={post.slug}
                  href={`/specimen-files/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-[#2A4020] overflow-hidden hover:border-[#5DB84A] hover:shadow-xl hover:shadow-[#5DB84A]/10 transition-all"
                  style={{ backgroundColor: "#0D1A06" }}
                >
                  {/* Creature image panel */}
                  <div
                    className="relative flex items-center justify-center overflow-hidden h-52"
                    style={{ backgroundColor: "#0A1205" }}
                  >
                    <img
                      src={creatureImagePath(post.creatureName)}
                      alt={post.creatureName}
                      className="relative z-10 w-40 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* EWW meter badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <img
                        src={ewwMeterImage[ewwLevel]}
                        alt={`EWW ${ewwLevel}%`}
                        className="w-14 object-contain"
                        style={{ mixBlendMode: "screen" }}
                      />
                    </div>
                    {/* Category tag */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1A3D0E] text-[#5DB84A] px-2.5 py-1 rounded-full border border-[#5DB84A]/30">
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <h2
                      className="font-creepster text-lg text-[#C8E8C4] group-hover:text-[#5DB84A] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6A9E66] leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* EWW label strip */}
                    <div
                      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full w-fit"
                      style={{ color: ewwConfig.color, backgroundColor: ewwConfig.bg }}
                    >
                      <span>{ewwLevel} — {ewwConfig.label}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1A3D0E]">
                      <span className="text-xs text-[#5A8A56]">
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {" · "}
                        {post.readTime} min read
                      </span>
                      <span className="text-xs font-semibold text-[#5DB84A] group-hover:underline">
                        Open file &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Coming soon card */}
            <div
              className="flex flex-col rounded-2xl border border-dashed border-[#2A4020] overflow-hidden items-center justify-center p-8 gap-4 min-h-[320px]"
              style={{ backgroundColor: "#0A1205" }}
            >
              <img
                src="/images/ui/Variable%20Locked%20sticker.png"
                alt=""
                aria-hidden="true"
                className="w-16 object-contain opacity-50"
                style={{ mixBlendMode: "screen" }}
              />
              <p className="font-creepster text-base text-[#5DB84A] text-center" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                Next specimen incoming
              </p>
              <p className="text-sm text-[#5A8A56] text-center leading-relaxed">
                New files publish weekly. Subscribe below to get them first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ──────────────────────────────────────────── */}
      <section className="relative py-14 border-t border-[#1A3D0E]" style={{ backgroundColor: "#0D1806" }}>
        <div className="max-w-xl mx-auto px-4 text-center">
          <img
            src="/images/dr-icky/dr-icky-warning.png"
            alt="Dr. Icky"
            className="illustration-character w-20 mx-auto mb-4 object-contain"
          />
          <h2
            className="font-creepster text-xl text-[#E8F5E2] mb-3"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            Get specimen files by email
          </h2>
          <p className="text-sm text-[#8AAE86] mb-5 leading-relaxed">
            Weekly. No filler. Gross guaranteed.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
