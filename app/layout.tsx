import type { Metadata } from "next";
import { Heebo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

/** עברית: Inter לא כולל עברית — Heebo (סנס) לאחוד כותרות גרדיאנט וטקסט גוף */
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-heebo",
});

const ogTitle = "EQS. PORT | Industrial Trade";
const ogDescription =
  "B2B systems. AI insights. Analytics.\n3,000+ connections in 100+ countries.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eqsport.io"),
  title: ogTitle,
  description: ogDescription,
  keywords: [
    "industrial trade",
    "AI procurement",
    "heavy equipment",
    "used heavy equipment",
    "global trade platform",
    "B2B",
  ],
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: "https://www.eqsport.io",
    siteName: "EQS. PORT",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.eqsport.io/og-logo.png",
        alt: "EQS. PORT logo",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["https://www.eqsport.io/og-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`dark ${inter.variable} ${heebo.variable}`}>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
