// Single source of truth for product facts + links used across the site.
// Verified against the EWW-niverse app codebase (constants/game.ts, services/revenuecat.ts)
// and the Slime or Bye app codebase (src/data/purchases.ts, app.json).

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/eww-niverse/id6773809027";

// Slime or Bye store links. Leave these EMPTY until each store goes live —
// the UI shows a "Coming soon" state automatically while a link is blank, then
// activates everywhere the moment you paste the real URL in. (iOS is live;
// Android is planned.)
export const SLIME_APP_STORE_URL = "https://apps.apple.com/us/app/slime-or-bye/id6780097924";
export const SLIME_PLAY_STORE_URL = "";

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

// Live product facts for the second app — keep in sync with the Slime or Bye app.
// Verified against the app codebase: progress is stored on-device (AsyncStorage),
// purchases run through RevenueCat, there is no Firebase, no analytics and no
// tracking. Designed for Families with a mandatory parent gate before any
// purchase. iOS + Android (iOS pending review, Android planned).
export const SLIME = {
  name: "Slime or Bye",
  tagline: "A Dr. Icky gross-science quiz show",
  // One-time, non-consumable unlocks (no subscriptions). Creepy Creatures is the
  // free pack; every other quiz pack is a one-time purchase, with an
  // "Unlock Everything" bundle covering all current and future packs.
  packPrice: "$4.99",
  bundlePrice: "$12.99",
  priceNote: "$4.99 per pack or $12.99 for everything, in the US — local pricing may vary",
  platform: "iPhone, iPad & Android",
  // Designed for Families / Kids category (Apple & Google), audience 7–12.
  ageRange: "7–12",
  // iOS is live; Android planned.
  status: "Live on App Store",
} as const;
