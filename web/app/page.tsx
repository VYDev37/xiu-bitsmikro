import HomeAnimations from '@/components/animations/HomeAnimations';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureBentoGridSection } from '@/components/home/FeatureBentoGridSection';
import { WuxingSection } from '@/components/home/WuxingSection';
import { ZodiacSection } from '@/components/home/ZodiacSection';
import { BaZiSection } from '@/components/home/BaZiSection';
import { XiuMansionsSection } from '@/components/home/XiuMansionsSection';

export default function HomePage() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      <HomeAnimations />
      <HeroSection />
      <FeatureBentoGridSection />
      <WuxingSection />
      <ZodiacSection />
      <BaZiSection />
      <XiuMansionsSection />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Xiu (宿) Celestial",
            "url": "https://xiu.celestial",
            "description": "Advanced AI Celestial Engine for BaZi, Wuxing & 28 Xiu Mansions Analysis",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
