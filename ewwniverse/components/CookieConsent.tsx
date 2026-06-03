"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem("eww-cookie-consent");
      if (!choice) setVisible(true);
    } catch {
      // localStorage blocked (private mode, etc.) — don't show banner
    }
  }, []);

  function accept() {
    try { localStorage.setItem("eww-cookie-consent", "accepted"); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem("eww-cookie-consent", "declined"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-lab-line)]"
      style={{ backgroundColor: "rgba(12,7,24,0.96)", backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

        {/* Text */}
        <div className="flex items-center gap-3 flex-1">
          <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed">
            This website uses Google Analytics cookies to understand traffic. The EWW-niverse{" "}
            <span className="text-[var(--color-ink)]">app itself collects no data and does no tracking</span>.{" "}
            <Link href="/cookies" className="text-[var(--color-neon)] underline underline-offset-2 hover:opacity-80">
              Cookie policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-boogaloo), cursive",
              backgroundColor: "var(--color-neon)",
              boxShadow: "0 0 18px rgba(141,231,28,0.4)",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
