import Link from "next/link";

const footerLinks = [
  { href: "/books",          label: "The Books" },
  { href: "/specimen-files", label: "Specimen Files" },
  { href: "/app",            label: "The App" },
  { href: "/dr-icky",        label: "About Dr. Icky" },
  { href: "/for-parents",    label: "For Parents & Educators" },
  { href: "/redeem",         label: "Redeem a Code" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/coppa",   label: "COPPA" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#080808" }} className="relative overflow-hidden border-t border-[#5DB84A]/15">

      {/* Bug trail top decoration */}
      <div className="w-full overflow-hidden h-12 relative">
        <img
          src="/images/ui/Bug%20trail%20dotted%20path.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            {/* Custom logo */}
            <Link href="/">
              <img
                src="/images/ui/EWWniverse.png"
                alt="EWW-niverse"
                className="h-12 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Dr. Icky&apos;s collection of the grossest, weirdest, most revolting facts in the known universe.
              For kids who like facts too weird for normal science apps.
            </p>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-2">
            <span
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#5DB84A", fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
            >
              Explore
            </span>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/50 hover:text-[#5DB84A] transition-colors w-fit"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Dr. Icky column */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <img
              src="/images/ui/EWWniverse%20Dr%20Icky.png"
              alt="Dr. Icky — EWW-niverse"
              className="w-36 md:w-44 object-contain"
              style={{ mixBlendMode: "screen" }}
            />
            <div className="flex flex-col gap-2 md:items-end">
              <span className="text-xs text-white/30 uppercase tracking-widest">Approved by Dr. Icky</span>
              <img
                src="/images/ui/Dr.%20Icky%20Approved%20badge.png"
                alt="Approved by Dr. Icky"
                className="w-16 object-contain"
                style={{ mixBlendMode: "screen" }}
              />
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
              <Link key={l.href} href={l.href} className="hover:text-[#5DB84A] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
