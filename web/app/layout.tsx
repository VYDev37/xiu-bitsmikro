import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Particles from "@/components/animations/Particles";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaZi AI Viewer",
  description: "Advanced Chinese Metaphysics — BaZi, Wuxing & Xiu Analysis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* Ambient layers */}
        <div className="caustics-overlay" />
        <Particles />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow pt-24 md:pt-28 pb-12 px-4 md:px-8 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
