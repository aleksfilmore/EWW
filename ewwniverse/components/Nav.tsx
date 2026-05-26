"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/books",          label: "Books",     idleColor: "#5DB84A" },
  { href: "/specimen-files", label: "Specimens", idleColor: "#D48B1A" },
  { href: "/dr-icky",        label: "Dr. Icky",  idleColor: "#A78BFA" },
  { href: "/app",            label: "App",       idleColor: "#E86C5D" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#5DB84A]/20"
      style={{ backgroundColor: "#080808" }}
    >
      <div
        className="max-w-6xl mx-auto px-4 flex items-center justify-between"
        style={{ height: "88px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" style={{ overflow: "visible" }}>
          <motion.img
            src="/images/ui/logo-main.png"
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
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative group flex flex-col items-center"
              >
                <span
                  className="transition-colors duration-150"
                  style={{
                    color: active ? "#6ED44F" : l.idleColor,
                    fontFamily: "var(--font-boogaloo), cursive",
                    fontSize: "1.05rem",
                    letterSpacing: "0.02em",
                    textShadow: active
                      ? `0 0 12px ${l.idleColor}80`
                      : `0 0 8px ${l.idleColor}40`,
                  }}
                >
                  {l.label}
                </span>
                {/* Slime underline indicator */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#6ED44F" }}
                  initial={false}
                  animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                />
                {/* Hover underline (non-active) */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#5DB84A" }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={!active ? { scaleX: 1, opacity: 0.6 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                />
              </Link>
            );
          })}

          {/* Flask CTA icon */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: -8 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 12 }}
          >
            <Link
              href="/app"
              aria-label="Get the App"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#5DB84A]/60 hover:border-[#6ED44F] transition-colors"
              style={{ backgroundColor: "#0D2007" }}
            >
              <img
                src="/images/ui/EWW%20gross.png"
                alt="Lab"
                className="w-7 h-7 object-contain"
                style={{ mixBlendMode: "screen" }}
              />
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
            className="md:hidden border-t border-[#5DB84A]/20 px-5 py-5 flex flex-col gap-5"
            style={{ backgroundColor: "#090909" }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
