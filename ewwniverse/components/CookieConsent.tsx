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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#5DB84A]/20"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

        {/* Icon + text */}
        <div className="flex items-center gap-3 flex-1">
          <img
            src="/images/ui/petri%20dish.png"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 flex-shrink-0 object-contain"
            style={{ mixBlendMode: "screen" }}
          />
          <p className="text-xs text-white/55 leading-relaxed">
            This lab uses cookies to track scientific progress and improve your experience.{" "}
            <Link href="/cookies" className="text-[#5DB84A] underline underline-offset-2 hover:text-[#6ED44F]">
              Cookie policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-bold uppercase tracking-wide text-white px-5 py-2 rounded-full transition-colors border-2"
            style={{
              fontFamily: "var(--font-boogaloo), cursive",
              fontSize: "0.85rem",
              backgroundColor: "#5DB84A",
              borderColor: "#3D8C2A",
              boxShadow: "0 3px 0 #3D8C2A",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
