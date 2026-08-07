'use client';

import SpotlightCard from '@/components/ui/SpotlightCard';
import DynamicStarrySky from '@/components/animations/DynamicStarrySky';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useLuckData } from '@/hooks/useLuckData';
import type { LuckData } from '@/schemas/luck';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function LuckSkeleton() {
  return (
    <SpotlightCard className="w-full p-6 md:p-10 relative overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <DynamicStarrySky />
      </div>
      <div className="relative z-10 flex flex-col h-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-6 w-32 bg-blue-900/20" />
          <Skeleton className="h-10 w-64 bg-blue-900/20" />
        </div>
        <div className="flex justify-center gap-3">
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
          <Skeleton className="h-8 w-24 rounded-full bg-blue-900/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full rounded-2xl bg-blue-900/20" />
          <Skeleton className="h-32 w-full rounded-2xl bg-blue-900/20" />
        </div>
      </div>
    </SpotlightCard>
  );
}

function LuckError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <SpotlightCard className="w-full p-8 text-center border-rose-500/20 bg-rose-500/5">
      <h3 className="text-rose-400 font-bold mb-2 text-xl">Connection Failed</h3>
      <p className="text-slate-300">{error}</p>
      <button
        onClick={onRetry}
        className="mt-6 px-6 py-2 bg-rose-500/10 hover:bg-slate-500/20 text-slate-300 rounded-full transition-colors border border-slate-500/30 text-sm font-semibold"
      >
        Try Again
      </button>
    </SpotlightCard>
  );
}

function BaziElements({ data }: { data: NonNullable<LuckData['data_extraction']> }) {
  const { user_a, current_date_shio } = data;

  if (!user_a && !current_date_shio) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {user_a?.pilar_tahun_shio && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Tahun: {user_a.pilar_tahun_shio}
        </span>
      )}
      {user_a?.pilar_jam_shio && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Jam: {user_a.pilar_jam_shio}
        </span>
      )}
      {user_a?.elemen_dominan && (
        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
          Elemen: {user_a.elemen_dominan}
        </span>
      )}
      {current_date_shio && (
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-mono">
          Hari Ini: {current_date_shio}
        </span>
      )}
    </div>
  );
}

function DailyLuckContent({ dailyLuck }: { dailyLuck: NonNullable<NonNullable<LuckData['result']>['daily_luck']> }) {
  const statusStr = String(dailyLuck.status);
  const scoreNum = Number(dailyLuck.luck_score);

  const statusColor = statusStr.includes('BAIK') ? 'text-emerald-400' :
    statusStr.includes('BENCANA') || statusStr.includes('HATI') ? 'text-rose-400' :
      'text-amber-400';

  const scoreColor = scoreNum >= 80 ? 'text-emerald-400' :
    scoreNum <= 40 ? 'text-rose-400' :
      'text-amber-400';

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold font-mono">Status Hari Ini</h4>
            <p className={`text-xl md:text-2xl font-serif font-semibold ${statusColor}`}>
              {dailyLuck.status}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/5 bg-white/[0.02] overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold font-mono">Skor Keberuntungan</h4>
            <p className={`text-xl md:text-2xl font-serif font-semibold ${scoreColor}`}>
              {dailyLuck.luck_score} / 100
            </p>
          </CardContent>
        </Card>
      </div>

      {dailyLuck.primary_warning && (
        <Card className="rounded-2xl border-rose-500/20 bg-rose-500/5 mt-4 overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-rose-400/80 mb-2 font-semibold font-mono">Peringatan Utama</h4>
            <p className="text-lg text-rose-200 leading-relaxed font-serif">
              {dailyLuck.primary_warning}
            </p>
          </CardContent>
        </Card>
      )}

      {dailyLuck.physics_logic && (
        <Card className="rounded-2xl border-white/5 bg-white/[0.02] mt-4 overflow-hidden">
          <CardContent className="p-5">
            <h4 className="text-xs uppercase tracking-widest text-blue-400/80 mb-2 font-semibold font-mono">Logika Fisika Wuxing</h4>
            <p className="text-lg text-slate-300 leading-relaxed font-serif">
              {dailyLuck.physics_logic}
            </p>
          </CardContent>
        </Card>
      )}

      {dailyLuck && (
        <Card className="rounded-2xl border-white/5 bg-white/[0.02] mt-4 overflow-hidden relative group transition-all hover:bg-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <CardContent className="p-5 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-blue-400/80 mb-1 font-semibold font-mono">Deep Analysis</h4>
              <p className="text-sm text-slate-400">Tanyakan lebih banyak kepada AI Celestial Engine.</p>
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
      )}
    </>
  );
}

export default function LuckDisplay() {
  const { luck, loading, error, refetch } = useLuckData();

  if (loading) {
    return <LuckSkeleton />;
  }

  if (error) {
    return <LuckError error={error} onRetry={refetch} />;
  }

  return (
    <SpotlightCard className="w-full p-6 md:p-10 relative overflow-hidden">
      <div className="section-tag justify-center mb-4 font-mono relative z-10">
        <span>Daily Reading</span>
      </div>
      <h2 className="section-title text-center text-3xl md:text-4xl mb-10 glow-text relative z-10">
        Today's Luck
      </h2>

      <div className="space-y-6 relative z-10">
        {luck?.data_extraction && (
          <BaziElements data={luck.data_extraction} />
        )}

        {luck?.result?.daily_luck ? (
          <DailyLuckContent dailyLuck={luck.result.daily_luck} />
        ) : (
          <div className="text-center text-slate-400 font-mono py-10">
            Format analisis tidak dikenali. Silakan coba lagi.
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
