"use client";
import "@/assets/styles/globals.css";
import Script from "next/script";
import { Outfit, Comic_Neue, Patrick_Hand_SC, Roboto, Saira, Kumbh_Sans } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import WatsAppChatBot from "@/components/WatsAppChatBot";
import GoogleAnalytics from "./GoogleAnalytics";

config.autoAddCss = false;

// Initialize fonts
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300", "400", "500", "600", "700"], display: "swap" });
const comic = Comic_Neue({ subsets: ["latin"], variable: "--font-comic", weight: ["400", "700"], display: "swap" });
const patrick = Patrick_Hand_SC({ subsets: ["latin"], variable: "--font-patrick", weight: ["400"], display: "swap" });
const kumbh = Kumbh_Sans({ subsets: ["latin"], variable: "--font-kumbh", weight: ["300", "400", "500", "600", "700"], display: "swap" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700"], display: "swap" });
const saira = Saira({ subsets: ["latin"], variable: "--font-saira", weight: ["300", "400", "500", "700"], display: "swap" });

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* External Script inside <head> */}
        <Script 
          src="https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com/hyperverge-web-sdk@8.13.0/src/sdk.min.js"
          strategy="afterInteractive"
        />
        {/* Google Analytics inside <head> */}
        <GoogleAnalytics />
      </head>
      <body
        className={`bg-background ${outfit.variable} ${comic.variable} ${patrick.variable} ${kumbh.variable} ${roboto.variable} ${saira.variable}`}
      >
        <WatsAppChatBot />
        {children}
      </body>
    </html>
  );
}
