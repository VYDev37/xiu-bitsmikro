import type { Metadata } from "next";
import { Outfit, Cinzel, Noto_Serif_SC, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import DynamicStarrySky from '@/components/animations/DynamicStarrySky';
import AuthProvider from '@/components/providers/AuthProvider';
import { getSession } from '@/lib/auth';
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const notoSc = Noto_Serif_SC({
  variable: "--font-noto-sc",
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Aetheria Celestial | BaZi AI Viewer",
  description: "Celestial Engine for BaZi, Wuxing & 28 Xiu Mansions",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", outfit.variable, cinzel.variable, notoSc.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col relative selection:bg-blue-500/30 selection:text-blue-200">
        <AuthProvider>
          {/* Ambient layers */}
          <div className="noise-overlay" />

          {/* Global 3D Background */}
          <DynamicStarrySky />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className="flex-grow pt-24 md:pt-28 pb-12 px-4 md:px-8 flex flex-col relative z-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
