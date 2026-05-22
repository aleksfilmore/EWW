"use client";

import { useState } from "react";

export default function RedeemForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 text-center py-4">
        <p className="text-[#5DB84A] font-semibold text-sm">
          Code logged. Dr. Icky will verify it when the app launches.
        </p>
        <p className="text-xs text-[#7A6652]">
          You&apos;ll receive a confirmation email once the app is live.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label
          htmlFor="code"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1A3D0E] mb-2"
        >
          Bundle code
        </label>
        <input
          id="code"
          type="text"
          placeholder="e.g. EWWCC-XXXXX"
          required
          className="w-full px-4 py-3 rounded-xl border border-[#C8B89A] bg-[#F7F2E4] text-[#3D2B1F] text-sm focus:outline-none focus:border-[#5DB84A] transition-colors font-mono tracking-wider uppercase"
          maxLength={20}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1A3D0E] mb-2"
        >
          Your email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          className="w-full px-4 py-3 rounded-xl border border-[#C8B89A] bg-[#F7F2E4] text-[#3D2B1F] text-sm focus:outline-none focus:border-[#5DB84A] transition-colors"
        />
        <p className="text-xs text-[#7A6652] mt-1.5">
          We&apos;ll send your unlock confirmation here when the app launches.
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold py-3 rounded-full text-sm transition-colors mt-2"
      >
        Submit code
      </button>
    </form>
  );
}
