import { APP_STORE_URL } from "@/lib/site";

/**
 * Official-style "Download on the App Store" button.
 * size: "lg" for hero/primary CTAs, "md" elsewhere.
 */
export default function AppStoreButton({
  size = "lg",
  className = "",
}: {
  size?: "lg" | "md";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener"
      aria-label="Download EWW-niverse on the App Store"
      className={`group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black text-white transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-neon)] ${
        lg ? "px-6 py-3.5" : "px-5 py-3"
      } ${className}`}
      style={{ boxShadow: "0 10px 30px -12px rgba(141,231,28,0.4)" }}
    >
      <svg
        viewBox="0 0 384 512"
        aria-hidden="true"
        className={lg ? "w-7 h-7" : "w-6 h-6"}
        fill="currentColor"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={`uppercase tracking-wide text-white/70 ${lg ? "text-[10px]" : "text-[9px]"}`}>
          Download on the
        </span>
        <span className={`font-semibold ${lg ? "text-xl" : "text-lg"}`}>App Store</span>
      </span>
    </a>
  );
}
