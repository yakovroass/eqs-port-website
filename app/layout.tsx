import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eqsport.io"),
  title: "EQS.PORT | AI-Powered Global Industrial Trade",
  description:
    "Multilingual Platforms. AI-Driven Insights. Market-Scale Analytics. B2B AI powering global industrial trade with 3,000+ connections in 100+ countries.",
  keywords: [
    "industrial trade",
    "AI procurement",
    "heavy equipment",
    "global trade platform",
    "B2B",
    "construction equipment",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.pathname==="/"&&!location.search.includes("_"))location.replace("/?_="+Date.now());`,
          }}
        />
        {/* כותרות גרדיאנט — inline כדי שלא יישמרו ממטמון (WhatsApp/דפדפן) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `.gradient-text{color:transparent;-webkit-text-fill-color:transparent;background:linear-gradient(90deg,#e0f2fe 0%,#bae6fd 35%,#7dd3fc 70%,#a5f3fc 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;}@media(max-width:768px){.gradient-text{color:transparent!important;-webkit-text-fill-color:transparent!important;background:linear-gradient(90deg,#e0f2fe 0%,#bae6fd 35%,#7dd3fc 70%,#a5f3fc 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;}main section.relative{padding-top:4rem!important;padding-bottom:4rem!important;}}`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
