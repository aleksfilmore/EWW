"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: "88px" }}>

        {/* Logo — custom illustration, tilted + spring jiggle on hover */}
        <Link href="/" className="flex items-center flex-shrink-0" style={{ overflow: "visible" }}>
          <motion.img
            src="/images/ui/EWWniverse.png"
            alt="EWW-niverse"
            className="w-auto object-contain"
            style={{
              mixBlendMode: "screen",
              height: "72px",
              rotate: -5,
              translateY: 2,
              transformOrigin: "left center",
            }}
            whileHover={{ rotate: -9, scale: 1.07, translateY: 0 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 12 }}
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
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            <Link
              href="/app"
              className="inline-block bg-[#5DB84A] hover:bg-[#3D8C2A] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors uppercase tracking-wide"
            >
              Get the App
            </Link>
          </motion.div>
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
