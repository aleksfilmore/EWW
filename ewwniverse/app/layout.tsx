import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr. Icky's EWW-niverse",
    template: "%s | EWW-niverse",
  },
  description:
    "For kids who like facts too weird for normal science apps. 75 of nature's most revolting creatures — books, app, and more.",
  keywords: [
    "weird facts for kids",
    "gross science",
    "Dr. Icky",
    "creepy creatures",
    "science books for kids",
  ],
  openGraph: {
    siteName: "EWW-niverse",
    type: "website",
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
