import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://xiu.celestial'),
  title: {
    default: "Xiu (宿) Celestial | BaZi AI Engine",
    template: "%s | Xiu (宿) Celestial"
  },
  description: "Advanced AI Celestial Engine for BaZi, Wuxing & 28 Xiu Mansions Analysis",
  keywords: ["bazi", "four pillars of destiny", "wuxing", "chinese astrology", "ai astrology", "28 mansions"],
  authors: [{ name: "Xiu (宿) Team" }],
  creator: "Xiu (宿)",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Xiu (宿) Celestial | BaZi AI Engine",
    description: "Advanced AI Celestial Engine for BaZi, Wuxing & 28 Xiu Mansions Analysis",
    siteName: "Xiu (宿) Celestial",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xiu (宿) Celestial | BaZi AI Engine",
    description: "Advanced AI Celestial Engine for BaZi, Wuxing & 28 Xiu Mansions Analysis",
  },
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
