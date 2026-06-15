"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// App-first navigation order.
const links = [
  { href: "/apps",           label: "Apps",      idleColor: "#8DE71C" },
  { href: "/books",          label: "Books",     idleColor: "#7CD93A" },
  { href: "/specimen-files", label: "Specimens", idleColor: "#E8932E" },
  { href: "/dr-icky",        label: "Dr. Icky",  idleColor: "#A78BFA" },
  { href: "/for-parents",    label: "Parents",   idleColor: "#B5A8DC" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-lab-line)]"
      style={{ backgroundColor: "rgba(12,7,24,0.92)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="max-w-6xl mx-auto px-4 flex items-center justify-between"
        style={{ height: "84px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" style={{ overflow: "visible" }}>
          <motion.img
            src="/images/ui/logo-main.png"
            alt="EWW-niverse"
            className="w-auto object-contain"
            style={{ height: "64px", rotate: -5, translateY: 2, transformOrigin: "left center" }}
            whileHover={{ rotate: -9, scale: 1.07, translateY: 0 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 12 }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            let active = pathname === l.href || pathname.startsWith(l.href + "/");
            // The "Apps" hub also represents the individual app pages.
            if (l.href === "/apps" && (pathname.startsWith("/app") || pathname.startsWith("/slime-or-bye"))) {
              active = true;
            }
            return (
              <Link key={l.href} href={l.href} className="relative group flex flex-col items-center">
                <span
                  className="transition-colors duration-150"
                  style={{
                    color: active ? "#A6F23C" : l.idleColor,
                    fontFamily: "var(--font-boogaloo), cursive",
                    fontSize: "1.05rem",
                    letterSpacing: "0.02em",
                    textShadow: active ? `0 0 12px ${l.idleColor}80` : `0 0 8px ${l.idleColor}30`,
                  }}
                >
                  {l.label}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#A6F23C" }}
                  initial={false}
                  animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                />
              </Link>
            );
          })}

          {/* Primary CTA */}
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 380, damping: 14 }}>
            <Link
              href="/apps"
              className="block rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black"
              style={{
                backgroundColor: "var(--color-neon)",
                boxShadow: "0 0 22px rgba(141,231,28,0.45)",
                fontFamily: "var(--font-boogaloo), cursive",
                letterSpacing: "0.04em",
              }}
            >
              Our Apps
            </Link>
          </motion.div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-[var(--color-lab-line)] px-5 py-5 flex flex-col gap-5"
            style={{ backgroundColor: "#0C0718" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xl transition-colors"
                style={{ fontFamily: "var(--font-boogaloo), cursive", color: l.idleColor, letterSpacing: "0.02em" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apps"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-black"
              style={{ backgroundColor: "var(--color-neon)", fontFamily: "var(--font-boogaloo), cursive" }}
            >
              Our Apps
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
