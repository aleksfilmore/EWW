import type { Metadata } from "next";
import Script from "next/script";
import { Creepster, Boogaloo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { APP_STORE_URL, PRODUCT, SITE_URL, SLIME, SLIME_APP_STORE_URL, SLIME_PLAY_STORE_URL } from "@/lib/site";

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
  display: "swap",
});

const boogaloo = Boogaloo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-boogaloo",
  display: "swap",
});

const BASE_URL = "https://ewwniverse.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dr. Icky's EWW-niverse — The Gross Science App for Kids",
    template: "%s | EWW-niverse",
  },
  description:
    "Gross science for curious kids: scan strange specimens, uncover true facts, beat quizzes and raise your EWW score. Free to start on iPhone and iPad.",
  keywords: [
    "gross science app for kids",
    "science game for kids",
    "weird animal facts for kids",
    "Dr. Icky",
    "EWW-niverse",
    "creepy creatures",
    "gross facts for kids",
    "kids classification game",
  ],
  authors: [{ name: "Dr. Icky" }],
  creator: "EWW-niverse",
  publisher: "EWW-niverse",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: "EWW-niverse",
    type: "website",
    url: BASE_URL,
    title: "Dr. Icky's EWW-niverse — The Gross Science App for Kids",
    description:
      "Scan the specimen. Survive the quiz. Master the EWW-niverse. Real science facts as a creepy classification game.",
    images: [
      {
        url: "/images/og-eww.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Icky — Chief Specimen Scientist of the EWW-niverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Icky's EWW-niverse",
    description:
      "The gross science app for weirdly curious kids. Scan, classify, quiz, master.",
    images: ["/images/og-eww.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only advertise Slime or Bye to search engines once it has a real store
  // listing — until then we don't emit a MobileApplication with no install URL.
  const slimeInstallUrl = SLIME_APP_STORE_URL || SLIME_PLAY_STORE_URL;
  const slimeApp = slimeInstallUrl
    ? [
        {
          "@type": "MobileApplication",
          name: SLIME.name,
          applicationCategory: "GameApplication",
          operatingSystem: SLIME_PLAY_STORE_URL ? "iOS, iPadOS, Android" : "iOS, iPadOS",
          url: slimeInstallUrl,
          installUrl: slimeInstallUrl,
          description:
            "Dr. Icky's gross-science quiz show for kids. Answer the questions, survive the round, collect specimen cards and earn badges.",
          publisher: { "@id": `${SITE_URL}/#organization` },
          offers: [
            { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
            { "@type": "Offer", name: "Quiz pack (one-time)", price: SLIME.packPrice.replace("$", ""), priceCurrency: "USD" },
            { "@type": "Offer", name: "Unlock Everything (one-time)", price: SLIME.bundlePrice.replace("$", ""), priceCurrency: "USD" },
          ],
        },
      ]
    : [];
  return (
    <html lang="en" className={`${creepster.variable} ${boogaloo.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "EWW-niverse",
                url: SITE_URL,
                logo: `${SITE_URL}/images/ui/logo-main.png`,
                description:
                  "The gross science app and book universe for weirdly curious kids, hosted by Dr. Icky.",
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: "EWW-niverse",
                url: SITE_URL,
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
              {
                "@type": "MobileApplication",
                name: "EWW-niverse",
                applicationCategory: "EducationalApplication",
                operatingSystem: "iOS, iPadOS",
                url: APP_STORE_URL,
                installUrl: APP_STORE_URL,
                description:
                  "Scan the specimen, survive the quiz, master the EWW-niverse. A creepy classification game built on real science facts.",
                publisher: { "@id": `${SITE_URL}/#organization` },
                offers: [
                  { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
                  { "@type": "Offer", name: "Full Lab Pass (one-time)", price: PRODUCT.price.replace("$", ""), priceCurrency: "USD" },
                ],
              },
              ...slimeApp,
            ],
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DR7683Y874"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DR7683Y874');
          `}
        </Script>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
