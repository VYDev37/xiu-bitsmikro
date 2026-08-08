import SpotlightCard from '@/components/ui/SpotlightCard';

export function LuckError({ error, onRetry }: { error: string; onRetry: () => void }) {
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
