import Link from "next/link";
import AppStoreButton from "@/components/AppStoreButton";

const footerLinks = [
  { href: "/app",            label: "The App" },
  { href: "/books",          label: "The Books" },
  { href: "/specimen-files", label: "Specimen Files" },
  { href: "/dr-icky",        label: "About Dr. Icky" },
  { href: "/for-parents",    label: "For Parents & Educators" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/coppa",   label: "COPPA" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0C0718" }} className="relative overflow-hidden border-t border-[var(--color-lab-line)]">
      {/* hazard accent strip */}
      <div className="hazard-stripe h-2 w-full opacity-70" />

      <div className="max-w-6xl mx-auto px-4 pb-10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ui/logo-main.png"
                alt="EWW-niverse"
                className="h-12 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              The gross science app for weirdly curious kids. Scan specimens, survive the quiz, and
              master the EWW-niverse — backed by the printed field guides.
            </p>
            <div className="mt-1">
              <AppStoreButton size="md" />
            </div>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-2">
            <span
              className="lab-label mb-3 text-[var(--color-neon)]"
              style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
            >
              Explore
            </span>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/50 hover:text-[var(--color-neon)] transition-colors w-fit"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Real Dr. Icky column */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dr-icky-real/dr-icky-portrait.webp"
              alt="Dr. Icky — Chief Specimen Scientist"
              className="w-28 rounded-2xl object-cover"
              style={{ border: "1px solid var(--color-lab-line)" }}
              loading="lazy"
            />
            <div className="flex flex-col gap-1 md:items-end">
              <span className="lab-label text-[var(--color-neon)]">Approved by Dr. Icky</span>
              <span className="text-xs text-white/30">Chief Specimen Scientist, EWW-niverse Labs</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} EWW-niverse. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/30">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--color-neon)] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
