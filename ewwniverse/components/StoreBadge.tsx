/**
 * Generic store badge — Apple App Store or Google Play.
 *
 * Pass an empty `href` to render a non-clickable "Coming soon" state. This lets
 * the Slime or Bye links sit dormant until each store goes live; once you paste
 * the real URL into lib/site.ts they activate automatically.
 */
const APPLE_PATH =
  "M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z";

export default function StoreBadge({
  store,
  href,
  size = "lg",
  className = "",
}: {
  store: "apple" | "google";
  href?: string;
  size?: "lg" | "md";
  className?: string;
}) {
  const lg = size === "lg";
  const live = Boolean(href);
  const isApple = store === "apple";

  const topLabel = live
    ? isApple
      ? "Download on the"
      : "Get it on"
    : "Coming soon to";
  const mainLabel = isApple ? "App Store" : "Google Play";

  const Icon = isApple ? (
    <svg viewBox="0 0 384 512" aria-hidden="true" className={lg ? "h-7 w-7" : "h-6 w-6"} fill="currentColor">
      <path d={APPLE_PATH} />
    </svg>
  ) : (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={lg ? "h-6 w-6" : "h-5 w-5"}>
      <path fill="#00d2ff" d="M48 59.49v393a4.33 4.33 0 0 0 7.37 3.07L260 256 55.37 56.42A4.33 4.33 0 0 0 48 59.49z" />
      <path fill="#00f076" d="M345.8 174 89.22 32.64l-.16-.09c-4.42-2.4-8.62 3.58-5 7.06l201.13 192.32z" />
      <path fill="#ffce00" d="M449.55 218.42 393 187.26 322.85 256 393 324.74l56.55-31.16c19.27-10.61 19.27-64.55 0-75.16z" />
      <path fill="#ff3d44" d="M89.06 479.45c-3.62 3.48.58 9.46 5 7.06l.16-.09L345.8 338l-60.61-57.95z" />
    </svg>
  );

  const inner = (
    <>
      <span className={lg ? "text-[var(--color-neon)]" : "text-[var(--color-neon)]"}>{Icon}</span>
      <span className="flex flex-col items-start leading-none">
        <span className={`uppercase tracking-wide text-white/70 ${lg ? "text-[10px]" : "text-[9px]"}`}>
          {topLabel}
        </span>
        <span className={`font-semibold ${lg ? "text-xl" : "text-lg"}`}>{mainLabel}</span>
      </span>
    </>
  );

  const base = `group inline-flex items-center gap-3 rounded-2xl border bg-black text-white ${
    lg ? "px-6 py-3.5" : "px-5 py-3"
  } ${className}`;

  if (!live) {
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-default border-white/10 opacity-55`}
        title="Coming soon"
      >
        {inner}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`Get ${mainLabel === "App Store" ? "on the App Store" : "it on Google Play"}`}
      className={`${base} border-white/15 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-neon)]`}
      style={{ boxShadow: "0 10px 30px -12px rgba(141,231,28,0.4)" }}
    >
      {inner}
    </a>
  );
}
