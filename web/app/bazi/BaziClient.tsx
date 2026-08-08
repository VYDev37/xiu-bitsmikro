'use client';
import { useEffect, useRef } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import DynamicStarrySky from '@/components/animations/DynamicStarrySky';
import { useBaziCalculator } from '@/hooks/useBaziCalculator';
import { BaziInputForm } from '@/components/features/bazi/BaziInputForm';
import { FourPillars } from '@/components/features/bazi/FourPillars';
import { ElementBalance } from '@/components/features/bazi/ElementBalance';
import { PersonalitySummary } from '@/components/features/bazi/PersonalitySummary';
import { motion, AnimatePresence } from 'framer-motion';
import { AIDisclaimer } from '@/components/ui/AIDisclaimer';
import { useUserStore } from '@/stores/useUserStore';

export default function BaziClient() {
  const { calculateBazi, loading, error, data } = useBaziCalculator();
  const baziData = data?.result?.bazi_chart;
  
  const user = useUserStore(state => state.user);
  const isUserLoading = useUserStore(state => state.isLoading);
  
  // Use a ref to prevent strict-mode double fetching in development
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we have user data, we haven't fetched yet, and it's not currently loading
    if (!isUserLoading && user && user.birthDate && user.birthTime && !data && !loading && !error && !hasFetched.current) {
      hasFetched.current = true;
      calculateBazi(user.name || 'Seeker', user.birthDate, user.birthTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUserLoading]);

  const handleSubmit = (nama: string, birthDate: string, birthTime: string) => {
    calculateBazi(nama, birthDate, birthTime);
  };

  const hasDefaultUser = !!(user && user.birthDate && user.birthTime);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <DynamicStarrySky />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4 mb-12">
          <div className="section-tag justify-center font-mono">
            <span>BaZi Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold glow-text tracking-tight">
            The 4 Pillars of Destiny
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover your elemental blueprint based on the ancient Chinese metaphysics system.
          </p>
        </div>

        {/* Show loading state while checking user session */}
        {isUserLoading && !baziData && (
          <div className="w-full flex justify-center py-10">
            <svg className="animate-spin h-8 w-8 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {/* Show form only if NO defaultUser AND NO data AND user state has loaded */}
        {!isUserLoading && !hasDefaultUser && !baziData && (
          <SpotlightCard className="w-full p-1 border-white/10 bg-slate-900/30">
            <div className="py-10">
              <BaziInputForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </SpotlightCard>
        )}

        {/* Show calculating state explicitly if auto-calculating for default user */}
        {hasDefaultUser && loading && !baziData && (
           <div className="w-full flex flex-col items-center justify-center py-20 space-y-6">
             <svg className="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             <p className="text-indigo-400 font-mono animate-pulse text-lg">Calculating Destiny for {user.name || 'Seeker'}...</p>
           </div>
        )}

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-center max-w-md mx-auto"
            >
              {error}
            </motion.div>
          )}

          {baziData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <FourPillars pillars={baziData.pillars} dayMaster={baziData.day_master} />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <ElementBalance 
                    balance={baziData.element_balance} 
                    dominant={baziData.dominant_element}
                    lacking={baziData.lacking_element}
                    lucky={baziData.lucky_elements}
                  />
                </div>
                <div className="lg:col-span-7">
                  <PersonalitySummary interpretation={baziData.interpretation} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-12">
          <AIDisclaimer />
        </div>
      </div>
    </div>
  );
}
