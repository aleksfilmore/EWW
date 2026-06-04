// Single source of truth for product facts + links used across the site.
// Verified against the EWW-niverse app codebase (constants/game.ts, services/revenuecat.ts).

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/eww-niverse/id6773809027";

export const CONTACT_EMAIL = "hello@ewwniverse.com";

export const SITE_URL = "https://ewwniverse.com";

// Rights holder shown in copyright / IP notices. Change this if you register a
// company or want a different legal name on the notice.
export const COPYRIGHT_HOLDER = "Alex Filip";
export const RIGHTS_SINCE = 2026;

// Live product facts — keep in sync with the app.
export const PRODUCT = {
  // Specimen library: 75 creatures + 80 dinosaurs + 79 earth = 234 base specimens,
  // plus 15 special "Slime Surge" unlock specimens.
  totalSpecimens: 234,
  specialSpecimens: 15,
  freeSpecimens: 75, // full Creepy Creatures field guide, free forever
  fieldGuidesInApp: 3, // Creatures (free), Dinosaurs, Earth (Full Lab Pass)
  booksPublished: 6,
  stages: 5,
  price: "$3.99",
  // App Store US price. Apple shows local pricing per storefront, so marketing
  // copy qualifies the figure as US to stay accurate for European visitors.
  priceNote: "$3.99 in the US — local pricing may vary",
  priceLabel: "$3.99 in the US — one-time, lifetime access (local pricing may vary)",
  platform: "iPhone & iPad", // App Store live; Android not yet
  // Marketing age audience. Apple's technical rating is 4+ ("Made for 9–11"),
  // but the brand markets to curious kids 9–12. Keep this consistent everywhere.
  ageRange: "9–12",
} as const;
