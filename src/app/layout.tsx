import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Attock VIP Rishta | Muslim Matchmaking in Attock",
    template: "%s | Attock VIP Rishta",
  },
  description:
    "A Muslim matchmaking platform coming soon to Attock city. Built for meaningful connections, family involvement, and privacy. Free at launch.",
  openGraph: {
    title: "Attock VIP Rishta",
    description:
      "Meaningful connections for the Muslim community of Attock. Free at launch, with privacy and consent at heart.",
    siteName: "Attock VIP Rishta",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
