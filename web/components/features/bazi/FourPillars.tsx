'use client';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { getElementColor } from './utils';
import type { BaziChartData } from '@/schemas/bazi';

interface FourPillarsProps {
  pillars: BaziChartData['pillars'];
  dayMaster: BaziChartData['day_master'];
}

export function FourPillars({ pillars, dayMaster }: FourPillarsProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } }
  };

  const renderPillar = (title: string, data: typeof pillars.year, isDayMaster: boolean = false) => {
    const stemColor = getElementColor(data.heavenly_stem.element);
    const branchColor = getElementColor(data.earthly_branch.element);

    return (
      <motion.div variants={item} className="flex flex-col items-center gap-1.5 md:gap-2">
        <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-mono mb-1 md:mb-2 text-center w-full max-w-[4rem] md:max-w-none break-words leading-tight">{title}</h4>

        {/* Heavenly Stem */}
        <div className={`relative w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-xl flex flex-col items-center justify-center border-2 ${stemColor.border} ${stemColor.bg} transition-all duration-300 hover:scale-105 group`}>
          {isDayMaster && (
            <div className="absolute -top-3 md:-top-3 px-1.5 md:px-2 py-0.5 bg-indigo-500 rounded-full text-[8px] md:text-[10px] font-bold tracking-wider text-white uppercase shadow-[0_0_10px_rgba(99,102,241,0.5)] whitespace-nowrap">
              Day Master
            </div>
          )}
          <span className="text-xl sm:text-3xl md:text-4xl font-serif text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform">
            {data.heavenly_stem.chinese}
          </span>
          <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${stemColor.text}`}>
            {data.heavenly_stem.element}
          </span>
          <span className="text-[8px] md:text-[10px] text-slate-400 uppercase mt-0.5 md:mt-1">
            {data.heavenly_stem.polarity}
          </span>
        </div>

        {/* Earthly Branch */}
        <div className={`w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-xl flex flex-col items-center justify-center border-2 ${branchColor.border} ${branchColor.bg} transition-all duration-300 hover:scale-105 group`}>
          <span className="text-xl sm:text-xl md:text-4xl font-serif text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform">
            {data.earthly_branch.chinese}
          </span>
          <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${branchColor.text}`}>
            {data.earthly_branch.element}
          </span>
          <span className="text-[8px] md:text-[10px] text-slate-400 uppercase mt-0.5 md:mt-1">
            {data.earthly_branch.animal}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-md">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif text-white mb-2">The Four Pillars of Destiny</h3>
          <p className="text-sm text-slate-400">
            Day Master: <strong className="text-indigo-400">{dayMaster.element} {dayMaster.polarity}</strong> ({dayMaster.strength})
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-row-reverse flex-nowrap md:flex-wrap justify-between sm:justify-center gap-2 sm:gap-4 md:gap-8 overflow-x-auto pb-4 custom-scrollbar"
        >
          {/* BaZi is read from right to left traditionally (Year on right, Hour on left), but for Western audiences we often flip.
              Using flex-row-reverse to keep the DOM logical (Year, Month, Day, Hour) but visually Right-to-Left */}
          {renderPillar('Year', pillars.year)}
          {renderPillar('Month', pillars.month)}
          {renderPillar('Day', pillars.day, true)}
          {renderPillar('Hour', pillars.hour)}
        </motion.div>
      </CardContent>
    </Card>
  );
}
