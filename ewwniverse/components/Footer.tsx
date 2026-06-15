import Link from "next/link";
import AppStoreButton from "@/components/AppStoreButton";
import { COPYRIGHT_HOLDER, RIGHTS_SINCE } from "@/lib/site";

const footerLinks = [
  { href: "/apps",           label: "Our Apps" },
  { href: "/app",            label: "EWW-niverse App" },
  { href: "/slime-or-bye",   label: "Slime or Bye" },
  { href: "/books",          label: "The Books" },
  { href: "/specimen-files", label: "Specimen Files" },
  { href: "/dr-icky",        label: "About Dr. Icky" },
  { href: "/for-parents",    label: "For Parents & Educators" },
];

const legalLinks = [
  { href: "/privacy",   label: "Privacy" },
  { href: "/cookies",   label: "Cookies" },
  { href: "/coppa",     label: "COPPA" },
  { href: "/copyright", label: "Copyright" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const range = year > RIGHTS_SINCE ? `${RIGHTS_SINCE}–${year}` : `${RIGHTS_SINCE}`;

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#7FCD1B,#63A714)" }}>
      {/* slime drip transition from the dark body into the green footer */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-8"
        style={{
          backgroundColor: "var(--color-lab-void)",
          maskImage:
            "radial-gradient(12px 16px at 12px 0, #000 56%, transparent 58%) repeat-x",
          maskSize: "24px 32px",
          WebkitMaskImage:
            "radial-gradient(12px 16px at 12px 0, #000 56%, transparent 58%) repeat-x",
          WebkitMaskSize: "24px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 items-start">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit rounded-2xl bg-[#0C0718] px-4 py-2.5" style={{ border: "1px solid rgba(0,0,0,0.25)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ui/logo-main.png"
                alt="EWW-niverse"
                className="h-11 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#15300A]">
              The gross science app for weirdly curious kids. Scan specimens, survive the quiz, and
              master the EWW-niverse — backed by the printed field guides.
            </p>
            <div className="mt-1">
              <AppStoreButton size="md" />
            </div>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-2">
            <span className="lab-label mb-3 text-[#0C1F05]">Explore</span>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-sm font-medium text-[#16320B] transition-opacity hover:opacity-70"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Real Dr. Icky column */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dr-icky-real/dr-icky-portrait.webp"
              alt="Dr. Icky — Chief Specimen Scientist"
              className="w-28 rounded-2xl object-cover"
              style={{ border: "2px solid #0C1F05" }}
              loading="lazy"
            />
            <div className="flex flex-col gap-1 md:items-end">
              <span className="lab-label text-[#0C1F05]">Approved by Dr. Icky</span>
              <span className="text-xs text-[#1B3A0D]/80">Chief Specimen Scientist, EWW-niverse Labs</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#0C1F05]/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#15300A]">
            &copy; {range} {COPYRIGHT_HOLDER}. EWW-niverse&trade; &amp; Dr. Icky&trade;. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-[#16320B]">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="font-medium transition-opacity hover:opacity-70">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
