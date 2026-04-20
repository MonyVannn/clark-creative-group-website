import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { LenisProvider } from "./components/layout/LenisProvider";
import TransitionProvider from "./components/transitions/TransitionProvider";
import LoadingScreen from "./components/LoadingScreen";
import { PreloaderProvider } from "./components/PreloaderContext";
import JsonLd from "./components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
});

const satoshi = localFont({
  src: "../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clarkcreativegroup.com"),
  title: {
    default: "Clark Creative Group",
    template: "%s | Clark Creative Group",
  },
  description:
    "A creative advisory for founders. We design brands, build business systems, and connect the whole picture, Space, Story, System.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Clark Creative Group",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} ${satoshi.variable} antialiased`}
      >
        <JsonLd />
        <LenisProvider>
          <PreloaderProvider>
            <LoadingScreen>
              <TransitionProvider>{children}</TransitionProvider>
            </LoadingScreen>
          </PreloaderProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
