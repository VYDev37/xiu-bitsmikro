'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useLuckData } from '@/hooks/useLuckData';
import { useUserStore } from '@/stores/useUserStore';
import { MysteryRevealCard } from './luck/MysteryRevealCard';
import { LuckSkeleton } from './luck/LuckSkeleton';
import { LuckError } from './luck/LuckError';
import { BaziElements } from './luck/BaziElements';
import { DailyLuckContent } from './luck/DailyLuckContent';

export default function LuckDisplay() {
  const { luck, loading, error, refetch } = useLuckData();
  const [revealState, setRevealState] = useState<'ready' | 'revealed'>('ready');
  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (!user) return;
    // Check if the user has already revealed their luck today
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem(`luck_revealed_date_${user.id}`);
    if (savedDate === today) {
      setRevealState('revealed');
    }
  }, [user]);

  const handleReveal = () => {
    if (!user) return;
    setRevealState('revealed');
    // Save to local storage that they have revealed it today
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`luck_revealed_date_${user.id}`, today);
  };

  if (loading) {
    return <LuckSkeleton />;
  }

  if (error) {
    return <LuckError error={error} onRetry={refetch} />;
  }

  return (
    <SpotlightCard className="w-full p-6 md:p-10 relative overflow-hidden min-h-[500px]">
      <div className="section-tag justify-center mb-4 font-mono relative z-10">
        <span>Daily Reading</span>
      </div>
      <h2 className="section-title text-center text-3xl md:text-4xl mb-10 glow-text relative z-10">
        Today's Luck
      </h2>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {revealState === 'ready' ? (
            <motion.div
              key="mystery-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <MysteryRevealCard onReveal={handleReveal} />
            </motion.div>
          ) : (
            <motion.div
              key="revealed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {luck?.data_extraction && (
                <BaziElements data={luck.data_extraction} />
              )}

              {luck?.result?.daily_luck ? (
                <DailyLuckContent dailyLuck={luck.result.daily_luck} />
              ) : (
                <div className="text-center text-slate-400 font-mono py-10">
                  Unrecognized analysis format. Try again.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}
