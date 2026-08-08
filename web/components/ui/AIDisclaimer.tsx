import { AlertCircle } from 'lucide-react';

export function AIDisclaimer() {
  return (
    <div className="w-full flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 text-slate-400 text-xs md:text-sm backdrop-blur-sm">
      <AlertCircle className="w-5 h-5 text-indigo-500/70 shrink-0 mt-0.5" />
      <div>
        <strong className="text-slate-300">Celestial Engine (AI) Disclaimer:</strong> This AI applies Chinese metaphysics (BaZi & Wuxing) to your profile. Results differ from human readings. Use for entertainment and self-reflection, not medical or financial decisions.
      </div>
    </div>
  );
}
