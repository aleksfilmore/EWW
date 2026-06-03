"use client";

import { useRef, useState } from "react";

/**
 * "Lab transmission" video block — real Dr. Icky footage framed like an
 * incoming feed from EWW-niverse Labs. Click-to-play, lazily loaded.
 */
export default function LabTransmission({
  src,
  poster,
  label = "Incoming transmission",
  caption,
  className = "",
}: {
  src: string;
  poster?: string;
  label?: string;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          border: "1px solid var(--color-lab-line-bright)",
          boxShadow: "0 0 0 1px rgba(141,231,28,0.18), 0 24px 60px -28px rgba(141,231,28,0.4)",
        }}
      >
        {/* transmission header bar */}
        <div className="flex items-center gap-2 bg-[var(--color-lab-panel-2)] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-danger)] animate-pulse" />
          <span className="lab-label text-[var(--color-neon)]">{label}</span>
          <span className="ml-auto lab-label text-[var(--color-ink-mute)]">EWW-NIVERSE LABS</span>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause transmission" : "Play transmission"}
          className="group relative block w-full bg-black"
        >
          <video
            ref={ref}
            src={src}
            poster={poster}
            preload="none"
            playsInline
            loop
            onEnded={() => setPlaying(false)}
            className="block w-full h-auto"
          />
          {!playing && (
            <span className="absolute inset-0 grid place-items-center bg-black/30 transition-colors group-hover:bg-black/15">
              <span
                className="grid h-16 w-16 place-items-center rounded-full text-black transition-transform group-hover:scale-110"
                style={{ backgroundColor: "var(--color-neon)", boxShadow: "0 0 30px rgba(141,231,28,0.6)" }}
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          )}
          {/* scanline overlay */}
          <span
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 2px, rgba(141,231,28,0.5) 2px 3px)",
            }}
          />
        </button>
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm text-[var(--color-ink-dim)]">{caption}</p>
      )}
    </div>
  );
}
