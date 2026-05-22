import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE_URL = "https://ewwniverse.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dr. Icky's EWW-niverse — Gross Science Books & App for Kids",
    template: "%s | EWW-niverse",
  },
  description:
    "75 of nature's most revolting creatures — scientifically accurate, grotesquely rated, and approved by Dr. Icky. Books, app, and field reports for kids who love weird science.",
  keywords: [
    "gross science books for kids",
    "weird animal facts for kids",
    "Dr. Icky",
    "EWW-niverse",
    "creepy creatures book",
    "children's science books",
    "gross facts for kids",
    "science app for kids",
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
    title: "Dr. Icky's EWW-niverse — Gross Science Books & App for Kids",
    description:
      "75 of nature's most revolting creatures — scientifically accurate, grotesquely rated, and approved by Dr. Icky.",
    images: [
      {
        url: "/images/ui/Dr. Icky holding EWW-meter.png",
        width: 800,
        alt: "Dr. Icky holding the EWW-meter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Icky's EWW-niverse",
    description:
      "75 of nature's most revolting creatures — books, app, and more.",
    images: ["/images/ui/Dr. Icky holding EWW-meter.png"],
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
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
