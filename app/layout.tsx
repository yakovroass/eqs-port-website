import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const ogTitle = "EQS. PORT | Industrial Trade";
const ogDescription =
  "Multilingual. AI Insights. B2B Analytics.\n3,000+ Connections in 100+ Countries.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eqsport.io"),
  title: ogTitle,
  description: ogDescription,
  keywords: [
    "industrial trade",
    "AI procurement",
    "heavy equipment",
    "global trade platform",
    "B2B",
    "construction equipment",
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
        url: "/og-logo.png",
        alt: "EQS. PORT logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/og-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
