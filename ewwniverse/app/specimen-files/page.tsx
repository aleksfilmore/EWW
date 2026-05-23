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

// EWW meter image per level
const ewwMeterImage: Record<number, string> = {
  60: "/images/ui/EWW-meter%2060%25.png",
  80: "/images/ui/EWW-meter%2080%25.png",
  100: "/images/ui/EWW-meter%20100%25.png",
};

// Map each post to its EWW level (matches data.ts)
const postEwwLevel: Record<string, 60 | 80 | 100> = {
  "zombie-ant-fungus": 100,
  "tongue-eating-louse": 100,
  "hagfish-slime": 100,
};

export default function SpecimenFilesPage() {
  return (
    <>
      {/* Header */}
      <section className="dark-section relative overflow-hidden py-16" style={{ backgroundColor: "#080808" }}>
        {/* Slime drip top */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/slime%20splat.png)",
            backgroundSize: "160px",
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
                  className="illustration w-14 h-14 object-contain"
                  style={{ mixBlendMode: "normal" }}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-[#5DB84A]">
                  From the field
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl mb-4 leading-tight"
                style={{ color: "#F4EED8" }}
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
                src="/images/dr-icky/Dr.%20Icky%20holding%20magnifying%20glass.png"
                alt="Dr. Icky investigating"
                className="illustration-character w-44 object-contain"
              />
            </div>
          </div>
        </div>
        {/* Slime drip bottom */}
        <img
          src="/images/ui/Slime%20drip%20bottom%20border.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover illustration"
          style={{ height: "40px", mixBlendMode: "normal" }}
        />
      </section>

      {/* Posts grid */}
      <section className="bg-[#F7F2E4] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specimenPosts.map((post) => {
              const ewwLevel = postEwwLevel[post.slug] ?? 60;
              const ewwConfig = ewwMeterLabels[ewwLevel];
              return (
                <Link
                  key={post.slug}
                  href={`/specimen-files/${post.slug}`}
                  className="group flex flex-col rounded-2xl border-2 border-[#C8B89A] bg-[#FDFAF3] overflow-hidden hover:border-[#5DB84A] hover:shadow-xl transition-all"
                >
                  {/* Creature image panel */}
                  <div className="relative bg-[#EDE5CE] flex items-center justify-center overflow-hidden h-52">
                    {/* Stained background texture */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
                        backgroundSize: "cover",
                      }}
                    />
                    <img
                      src={creatureImagePath(post.creatureName)}
                      alt={post.creatureName}
                      className="relative z-10 illustration w-40 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* EWW meter badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <img
                        src={ewwMeterImage[ewwLevel]}
                        alt={`EWW ${ewwLevel}%`}
                        className="illustration w-14 object-contain"
                      />
                    </div>
                    {/* Category tag */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1A3D0E] text-white px-2.5 py-1 rounded-full">
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <h2
                      className="text-lg text-[#1A3D0E] group-hover:text-[#5DB84A] transition-colors leading-snug"
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#7A6652] leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* EWW label strip */}
                    <div
                      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full w-fit"
                      style={{ color: ewwConfig.color, backgroundColor: ewwConfig.bg }}
                    >
                      <span>{ewwLevel} — {ewwConfig.label}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#C8B89A]">
                      <span className="text-xs text-[#7A6652]">
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
            <div className="flex flex-col rounded-2xl border-2 border-dashed border-[#C8B89A] bg-[#F7F2E4] overflow-hidden items-center justify-center p-8 gap-4 min-h-[320px]">
              <img
                src="/images/ui/Variable%20Locked%20sticker.png"
                alt=""
                aria-hidden="true"
                className="illustration w-16 object-contain opacity-60"
              />
              <p
                className="text-base text-[#1A3D0E] text-center"
              >
                Next specimen incoming
              </p>
              <p className="text-sm text-[#7A6652] text-center leading-relaxed">
                New files publish weekly. Subscribe below to get them first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="relative bg-[#EDE5CE] py-14 border-t border-[#C8B89A]">
        <img
          src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full illustration"
          style={{ height: "40px", objectFit: "cover", mixBlendMode: "multiply" }}
        />
        <div className="max-w-xl mx-auto px-4 text-center pt-4">
          <img
            src="/images/ui/Junior%20Grossologist%20badge.png"
            alt="Junior Grossologist"
            className="illustration w-20 mx-auto mb-4 object-contain"
          />
          <h2
            className="text-xl text-[#1A3D0E] mb-3"
          >
            Get specimen files by email
          </h2>
          <p className="text-sm text-[#7A6652] mb-5 leading-relaxed">
            Weekly. No filler. Gross guaranteed.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
