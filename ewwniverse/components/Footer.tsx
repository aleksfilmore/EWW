import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EDE5CE] border-t border-[#C8B89A] mt-0">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand col */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[#1A3D0E] text-2xl"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              EWW-niverse
            </span>
            <p className="text-sm text-[#7A6652] leading-relaxed max-w-xs">
              Dr. Icky&apos;s collection of the grossest, weirdest, most revolting facts in the known universe. For kids who like facts too weird for normal science apps.
            </p>
          </div>

          {/* Links col */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A6652] mb-2">Explore</span>
            {[
              { href: "/books", label: "The Books" },
              { href: "/app", label: "The App" },
              { href: "/specimen-files", label: "Specimen Files" },
              { href: "/dr-icky", label: "About Dr. Icky" },
              { href: "/redeem", label: "Redeem a Code" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#3D2B1F] hover:text-[#5DB84A] transition-colors w-fit"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Dr. Icky image + parents link */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/dr-icky/Dr.%20Icky%20giving%20thumbs%20up.png"
              alt="Dr. Icky gives his approval"
              className="illustration w-28 object-contain"
            />
            <Link
              href="/for-parents"
              className="text-sm text-[#7A6652] hover:text-[#5DB84A] transition-colors underline underline-offset-2"
            >
              For Parents &amp; Educators
            </Link>
          </div>
        </div>

        <div className="border-t border-[#C8B89A] mt-10 pt-6 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p className="text-xs text-[#7A6652]">
            &copy; {new Date().getFullYear()} EWW-niverse. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-[#7A6652]">
            <Link href="/for-parents" className="hover:text-[#5DB84A] transition-colors">Privacy</Link>
            <Link href="/for-parents" className="hover:text-[#5DB84A] transition-colors">COPPA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
