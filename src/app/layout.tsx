import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import MyHeader from "@/components/layout/MyHeader";
import MyFooter from "@/components/layout/MyFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <MyHeader />
        <main className="mx-auto w-full bg-gray-300 dark:bg-gray-900 max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {children}
        </main>
        <MyFooter />
        <Toaster />
      </body>
    </html>
  );
}
