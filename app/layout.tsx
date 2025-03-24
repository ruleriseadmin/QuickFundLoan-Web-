import { Metadata } from "next";
import LayoutClient from "./layout.client";


export const metadata: Metadata = {
  title: "Get Instant Loan | Flexible Low Interest Loan & Fast Approval",
  description: "Get instant loans with low interest rates. Apply for quick personal and business loans online with fast approval and secure processing.",
  keywords: [
    "instant loan",
    "quick loan",
    "personal loan",
    "business loan",
    "online loan",
    "low-interest loan",
    "loan app",
    "credit",
    "financing",
    "interest",
    "fast loan approval",
    "secure loan application",
  ],
  authors: [{ name: "Quickfund" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://quickfund-web.vercel.app/",
    title: "Get Instant Loan | Flexible Low Interest Loan & Fast Approval",
    description: "Get instant loans with low interest rates. Apply for quick personal and business loans online with fast approval and secure processing.",
    images: [
      {
        url: "/images/icon.png",
        width: 1200,
        height: 630,
        alt: "Quickfund Logo",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
