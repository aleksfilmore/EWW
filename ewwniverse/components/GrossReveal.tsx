"use client";

import { useState } from "react";

interface GrossRevealProps {
  fact: string;
}

export default function GrossReveal({ fact }: GrossRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative my-8">
      {/* Torn amber warning note background */}
      <div
        className="relative rounded-2xl overflow-hidden border-2 border-[#854F0B]"
        style={{ background: "#FAEEDA" }}
      >
        {/* Header bar */}
        <div className="bg-[#854F0B] px-5 py-2 flex items-center gap-3">
          <img
            src="/images/ui/hazard%20triangle.png"
            alt=""
            aria-hidden="true"
            className="illustration w-6 h-6 object-contain flex-shrink-0"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Gross Fact — Classified
          </span>
          <img
            src="/images/ui/hazard%20triangle.png"
            alt=""
            aria-hidden="true"
            className="illustration w-6 h-6 object-contain flex-shrink-0 ml-auto"
          />
        </div>

        <div className="px-5 py-5">
          {!revealed ? (
            /* Locked state */
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/ui/warning%20stamp.png"
                  alt=""
                  aria-hidden="true"
                  className="illustration w-12 h-12 object-contain"
                />
                <p className="text-sm font-semibold text-[#854F0B]">
                  This fact has been locked for your safety.
                </p>
              </div>
              <button
                onClick={() => setRevealed(true)}
                className="bg-[#854F0B] hover:bg-[#6B3F09] text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                I can handle it. Reveal the fact.
              </button>
            </div>
          ) : (
            /* Revealed state */
            <div className="flex gap-4 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dr-icky-real/dr-icky-avatar.webp"
                alt="Dr. Icky reacting"
                className="w-14 h-14 flex-shrink-0 rounded-xl object-cover"
                style={{ border: "1px solid #854F0B" }}
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#854F0B] mb-2">
                  You asked for it.
                </p>
                <p className="text-[#3D2B1F] text-base leading-relaxed font-medium">{fact}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
