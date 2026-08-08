'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { BaziChartData } from '@/schemas/bazi';

interface PersonalitySummaryProps {
  interpretation: BaziChartData['interpretation'];
}

export function PersonalitySummary({ interpretation }: PersonalitySummaryProps) {
  if (!interpretation.personality && !interpretation.life_theme) return null;

  return (
    <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-md">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <h3 className="text-xl font-serif text-white">Destiny Reading</h3>
        </div>

        <div className="space-y-6">
          {interpretation.personality && (
            <div>
              <p className="text-slate-300 leading-relaxed font-serif text-lg italic">
                "{interpretation.personality}"
              </p>
            </div>
          )}

          {interpretation.life_theme && (
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <span className="block text-xs uppercase tracking-widest text-indigo-400 font-mono mb-2">Life Theme</span>
              <p className="text-indigo-100 leading-relaxed">
                {interpretation.life_theme}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {interpretation.strengths && interpretation.strengths.length > 0 && (
              <div>
                <span className="block text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">Core Strengths</span>
                <ul className="space-y-2">
                  {interpretation.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-500 mt-0.5">✦</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {interpretation.weaknesses && interpretation.weaknesses.length > 0 && (
              <div>
                <span className="block text-xs uppercase tracking-widest text-rose-400 font-mono mb-3">Growth Areas</span>
                <ul className="space-y-2">
                  {interpretation.weaknesses.map((wk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-rose-500 mt-0.5">✦</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
