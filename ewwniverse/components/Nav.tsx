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
    <header className="sticky top-0 z-50 border-b border-[#5DB84A]/20" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo — custom illustration */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
          <img
            src="/images/ui/EWWniverse.png"
            alt="EWW-niverse"
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: "screen" }}
          />
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
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors uppercase tracking-wide"
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
          <span className={`block w-5 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#5DB84A]/20 px-4 py-4 flex flex-col gap-4" style={{ backgroundColor: "#0A0A0A" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="bg-[#5DB84A] text-white text-sm font-bold px-5 py-2.5 rounded-full text-center uppercase tracking-wide"
            onClick={() => setOpen(false)}
          >
            Get the App
          </Link>
        </div>
      )}
    </header>
  );
}
