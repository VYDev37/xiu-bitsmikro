'use client';
import { Card, CardContent } from '@/components/ui/card';
import type { LuckData } from '@/schemas/luck';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export function DailyLuckContent({ dailyLuck }: { dailyLuck: NonNullable<NonNullable<LuckData['result']>['daily_luck']> }) {
  const statusStr = String(dailyLuck.status);
  const scoreNum = Number(dailyLuck.luck_score);

  const statusColor = statusStr.includes('BAIK') ? 'text-emerald-400' :
    statusStr.includes('BENCANA') || statusStr.includes('HATI') ? 'text-rose-400' :
      'text-amber-400';

  const scoreColor = scoreNum >= 80 ? 'text-emerald-400' :
    scoreNum <= 40 ? 'text-rose-400' :
      'text-amber-400';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold font-mono">Today's Status</h4>
            <p className={`text-xl md:text-2xl font-serif font-semibold ${statusColor}`}>
              {dailyLuck.status}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold font-mono">Luck Score</h4>
            <p className={`text-xl md:text-2xl font-serif font-semibold ${scoreColor}`}>
              {dailyLuck.luck_score} / 100
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {dailyLuck.primary_warning && (
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-rose-500/20 bg-rose-500/5 overflow-hidden">
            <CardContent className="p-5">
              <h4 className="text-xs uppercase tracking-widest text-rose-400/80 mb-2 font-semibold font-mono">Warning</h4>
              <p className="text-lg text-rose-200 leading-relaxed font-serif">
                {dailyLuck.primary_warning}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {dailyLuck.physics_logic && (
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden">
            <CardContent className="p-5">
              <h4 className="text-xs uppercase tracking-widest text-blue-400/80 mb-2 font-semibold font-mono">Wuxing Physical Explanation</h4>
              <p className="text-lg text-slate-300 leading-relaxed font-serif">
                {dailyLuck.physics_logic}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {dailyLuck && (
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden relative group transition-all hover:bg-white/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardContent className="p-5 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-blue-400/80 mb-1 font-semibold font-mono">Deep Analysis</h4>
                <p className="text-sm text-slate-400">Ask the Celestial Engine AI for more.</p>
              </div>
              <Link
                href="/chat"
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 text-sm font-medium text-blue-300 transition-all hover:bg-blue-500/25 hover:text-blue-100 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              >
                <span className="flex items-center gap-2">
                  Launch Chat
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
