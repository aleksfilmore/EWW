"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/books", label: "The Books" },
  { href: "/specimen-files", label: "Specimen Files" },
  { href: "/dr-icky", label: "About Dr. Icky" },
  { href: "/for-parents", label: "For Parents" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#1A3D0E] border-b-2 border-[#5DB84A]/30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/ui/slime%20splat.png"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 object-contain"
            style={{ mixBlendMode: "normal" }}
          />
          <span
            className="text-[#F7F2E4] text-xl leading-none font-creepster"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif" }}
          >
            EWW-niverse
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#5DB84A]"
                  : "text-[#8A9E86] hover:text-[#F7F2E4]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Get the App
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#F7F2E4] transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F2E4] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F2E4] transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#5DB84A]/30 bg-[#0D2007] px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#8A9E86] hover:text-[#F7F2E4] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="bg-[#5DB84A] text-white text-sm font-semibold px-4 py-2 rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Get the App
          </Link>
        </div>
      )}
    </header>
  );
}
