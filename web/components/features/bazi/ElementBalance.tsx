'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { BaziChartData } from '@/schemas/bazi';

interface ElementBalanceProps {
  balance: BaziChartData['element_balance'];
  dominant: string | null;
  lacking: string | null;
  lucky: string[] | null;
}

export function ElementBalance({ balance, dominant, lacking, lucky }: ElementBalanceProps) {
  const elements = [
    { name: 'Wood', value: balance.Wood, color: 'bg-emerald-500', text: 'text-emerald-400' },
    { name: 'Fire', value: balance.Fire, color: 'bg-rose-500', text: 'text-rose-400' },
    { name: 'Earth', value: balance.Earth, color: 'bg-amber-600', text: 'text-amber-500' },
    { name: 'Metal', value: balance.Metal, color: 'bg-slate-300', text: 'text-slate-300' },
    { name: 'Water', value: balance.Water, color: 'bg-blue-500', text: 'text-blue-400' },
  ];

  const total = Object.values(balance).reduce((a, b) => a + b, 0);
  const max = Math.max(...Object.values(balance));

  return (
    <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-md">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-serif text-white mb-1">Elemental Balance</h3>
          <p className="text-xs text-slate-400 font-mono">DISTRIBUTION OF WUXING ENERGIES</p>
        </div>

        <div className="space-y-4 mb-8">
          {elements.map((el) => {
            const percentage = total > 0 ? (el.value / total) * 100 : 0;
            const isDominant = el.value === max && max > 0;
            
            return (
              <div key={el.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className={`font-medium ${el.text} uppercase tracking-wider text-xs`}>
                    {el.name} {isDominant && <span className="ml-1 text-[10px] text-white/50">(Dominant)</span>}
                  </span>
                  <span className="text-slate-400 text-xs">{el.value} ({percentage.toFixed(0)}%)</span>
                </div>
                <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`h-full ${el.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm bg-black/20 p-4 rounded-xl border border-white/5">
          <div>
            <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Dominant</span>
            <span className="font-semibold text-white">{dominant || '-'}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Lacking</span>
            <span className="font-semibold text-white">{lacking || '-'}</span>
          </div>
          <div className="col-span-2 mt-2 pt-3 border-t border-white/5">
            <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Favorable Elements</span>
            <div className="flex gap-2 flex-wrap mt-2">
              {lucky && lucky.length > 0 ? lucky.map(l => (
                <span key={l} className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs border border-white/10">
                  {l}
                </span>
              )) : (
                <span className="text-slate-400">None specified</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
