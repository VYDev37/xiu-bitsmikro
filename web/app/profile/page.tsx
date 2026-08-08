import type { Metadata } from 'next';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: "Xiu (宿) Celestial | Profile",
  description: "Update your BaZi profile data.",
  robots: { index: false, follow: false }
};

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center flex-1 px-4 relative z-10">
      <SpotlightCard className="w-full max-w-lg p-6 md:p-10">
        {/* Heading */}
        <div className="section-tag justify-center mb-2 font-mono">
          <span>Your Destiny Data</span>
        </div>
        <h2 className="section-title text-center text-3xl md:text-4xl mb-2 glow-text">
          Your Profile
        </h2>
        <p className="text-center text-sm mb-8 text-slate-400">
          Update your BaZi data to calculate your destiny accurately.
        </p>

        {/* Client-side Component that uses Zustand */}
        <ProfileClient />
      </SpotlightCard>
    </div>
  );
}
