import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { LenisProvider } from "./components/layout/LenisProvider";
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

const newTitle = localFont({
  src: "../public/fonts/NewTitle_Complete/Fonts/WEB/fonts/NewTitle-Variable.woff2",
  variable: "--font-newtitle",
});

export const metadata: Metadata = {
  title: "Clark Creative Group",
  description: "Personal Website for CCG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} ${satoshi.variable} ${newTitle.variable} antialiased overflow-clip`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
