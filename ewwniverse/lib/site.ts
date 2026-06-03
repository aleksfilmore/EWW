// Single source of truth for product facts + links used across the site.
// Verified against the EWW-niverse app codebase (constants/game.ts, services/revenuecat.ts).

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/eww-niverse/id6773809027";

export const CONTACT_EMAIL = "hello@ewwniverse.com";

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
  priceLabel: "$3.99 — one-time, lifetime access",
  platform: "iPhone & iPad", // App Store live; Android not yet
} as const;
