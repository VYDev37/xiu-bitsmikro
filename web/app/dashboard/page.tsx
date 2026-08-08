import LuckDisplay from '@/components/features/LuckDisplay';
import { AIDisclaimer } from '@/components/ui/AIDisclaimer';

export const metadata = {
  title: 'Xiu (宿) Celestial | Dashboard',
  robots: { index: false, follow: false }
};

export default async function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col items-center py-6 md:py-10 px-4 w-full">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <LuckDisplay />
        <AIDisclaimer />
      </div>
    </div>
  );
}
