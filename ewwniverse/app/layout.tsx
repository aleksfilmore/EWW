import type { Metadata } from "next";
import Script from "next/script";
import { Creepster, Boogaloo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
    "The gross science app for weirdly curious kids. Scan strange specimens, reveal real disgusting science facts, survive the quiz, raise your EWW score, and master 234 specimens with Dr. Icky. Free to start on iPhone & iPad.",
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
  return (
    <html lang="en" className={`${creepster.variable} ${boogaloo.variable}`}>
      <body>
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
