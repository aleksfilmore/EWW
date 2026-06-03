/**
 * iPhone-style bezel wrapping a real app screenshot.
 * The screenshots are 1242x2688 (≈19.5:9) — the frame matches that ratio.
 */
export default function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.2rem] p-[6px] ${className}`}
      style={{
        background: "linear-gradient(160deg,#2a2150,#0c0718)",
        boxShadow:
          "0 24px 60px -24px rgba(0,0,0,0.8), 0 0 0 1px rgba(141,231,28,0.12)",
      }}
    >
      {/* screen */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-black">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-4 w-[34%] -translate-x-1/2 rounded-full bg-black" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
