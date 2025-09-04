import { Metadata } from "next";
import LayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Get Instant Loan | Flexible Low Interest Loan & Fast Approval",
  description:
    "Get instant loans with low interest rates. Apply for quick personal and business loans online with fast approval and secure processing.",
  keywords: [
    // Primary Keywords
    "quick loan in Nigeria",
    "online loan without collateral",
    "instant cash loan",
    "apply for loan online",
    "urgent loan Nigeria",
    "fast loan approval",
    "loan app Nigeria",
    "get loan without collateral",
    "low interest loan in Nigeria",
    "QuickFund loan app",

    // Secondary Keywords
    "best loan app in Nigeria 2025",
    "how to get loan in Nigeria",
    "trusted loan companies in Nigeria",
    "no collateral loan in Nigeria",
    "instant personal loan",
    "emergency cash loan",
    "same-day loan Nigeria",
    "quick loan for students in Nigeria",
    "salary advance loan",
    "small business loan Nigeria",

    // Educational Keywords
    "benefits of getting a loan",
    "how loan interest works in Nigeria",
    "loan repayment tips",
    "difference between secured and unsecured loan",
    "how to improve loan approval chances",
    "why your loan may be declined",
    "myths about taking loans in Nigeria",

    // App Store Optimization Keywords
    "best loan app Nigeria",
    "QuickCred app download",
    "secure loan apps Nigeria",
    "android loan app no collateral",
    "mobile loan Nigeria",
  ],
  authors: [{ name: "Quickfund" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.quickfund.com.ng/",
    title: "Get Instant Loan | Flexible Low Interest Loan & Fast Approval",
    description:
      "Get instant loans with low interest rates. Apply for quick personal and business loans online with fast approval and secure processing.",
    images: [
      {
        url: "/images/icon.png",
        width: 1200,
        height: 630,
        alt: "Quickfund Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Shows a large preview card
    site: "@QuickCredng", // Your brand’s Twitter handle
    creator: "@QuickCred_ng", // Content creator’s handle
    title: "Get Instant Loan | Flexible Low Interest Loan & Fast Approval",
    description:
      "Get instant loans with low interest rates. Apply for quick personal and business loans online with fast approval and secure processing.",
    images: ["/images/icon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
