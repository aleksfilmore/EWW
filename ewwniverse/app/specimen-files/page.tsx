import type { Metadata } from "next";
import Link from "next/link";
import { specimenPosts } from "@/lib/data";
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

const categoryColors: Record<string, string> = {
  "specimen-of-the-week": "#5DB84A",
  "field-report": "#854F0B",
  "reader-submission": "#185FA5",
};

export default function SpecimenFilesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#F7F2E4] border-b border-[#C8B89A] py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              From the field
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#1A3D0E] mb-4"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Specimen Files
            </h1>
            <p className="text-[#7A6652] max-w-md leading-relaxed">
              Weekly dispatches from Dr. Icky&apos;s laboratory. Creature deep-dives, field reports from revolting places, and the occasional scientifically verified horror.
            </p>
          </div>
          <div className="flex justify-end">
            <img
              src="/images/dr-icky/Dr.%20Icky%20carrying%20evidence%20folder.png"
              alt="Dr. Icky carrying field notes"
              className="illustration w-40 md:w-48 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="bg-[#FDFAF3] border-b border-[#C8B89A] py-4 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-2">
          {["All", "Specimen of the Week", "Field Report", "Reader Submission"].map((f) => (
            <button
              key={f}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                f === "All"
                  ? "bg-[#1A3D0E] text-white border-[#1A3D0E]"
                  : "border-[#C8B89A] text-[#3D2B1F] hover:border-[#5DB84A] bg-[#F7F2E4]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="bg-[#F7F2E4] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specimenPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/specimen-files/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#C8B89A] bg-[#FDFAF3] overflow-hidden hover:shadow-md transition-all hover:border-[#5DB84A]"
              >
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: categoryColors[post.category] }}
                  >
                    {categoryLabels[post.category]}
                  </span>
                  <h2
                    className="text-lg text-[#1A3D0E] group-hover:text-[#5DB84A] transition-colors leading-snug"
                    style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#7A6652] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#7A6652] pt-1 border-t border-[#C8B89A]">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span>&middot;</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-10 rounded-xl border border-[#C8B89A] border-dashed bg-[#FDFAF3] p-8 text-center">
            <p className="text-sm text-[#7A6652] leading-relaxed">
              New specimen files publish weekly. Subscribe below to get them in your inbox before they hit the site.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-[#EDE5CE] py-12 border-t border-[#C8B89A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2
            className="text-xl text-[#1A3D0E] mb-3"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            Get specimen files by email
          </h2>
          <p className="text-sm text-[#7A6652] mb-5 leading-relaxed">
            Weekly. No filler.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}
