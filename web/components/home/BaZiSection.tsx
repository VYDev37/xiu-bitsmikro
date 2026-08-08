import { CelestialOrbit } from '@/components/animations/LandingGraphics';

export function BaZiSection() {
  return (
    <section id="bazi" className="py-24 px-4 md:px-12 max-w-7xl mx-auto w-full relative z-10">
      <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row justify-between gap-12 items-center">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Four Pillars Architecture</div>
            <h2 className="text-4xl md:text-5xl serif font-bold mb-6">BaZi Chart Mapping <span className="chinese-font text-3xl font-normal text-blue-300">八字命盘</span></h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed mb-8">
              We calculate your chart using the exact solar calendar. Heavenly Stems (<span className="chinese-font">天干</span>) and Terrestrial Branches (<span className="chinese-font">地支</span>) shape your destiny.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xs font-mono text-blue-300 uppercase">Year Pillar (年柱)</div>
                <div className="text-lg font-bold mt-1">Ancestral & External</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xs font-mono text-blue-300 uppercase">Month Pillar (月柱)</div>
                <div className="text-lg font-bold mt-1">Career & Environment</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xs font-mono text-blue-300 uppercase">Day Pillar (日柱)</div>
                <div className="text-lg font-bold mt-1">Self & Inner Partner</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xs font-mono text-blue-300 uppercase">Hour Pillar (时柱)</div>
                <div className="text-lg font-bold mt-1">Subconscious & Ambition</div>
              </div>
            </div>
          </div>

          {/* Interactive Demo Pill Box */}
          <div className="w-full lg:w-96 flex flex-col gap-4 relative">
            <CelestialOrbit />
            <div className="text-xs uppercase tracking-widest text-gray-400 text-center font-mono relative z-10">Sample BaZi Energy Matrix</div>
            <div className="grid grid-cols-4 gap-2 text-center relative z-10">
              <div className="glass-panel p-4 rounded-xl border-emerald-500/30 bg-black/40 backdrop-blur-md">
                <div className="text-[10px] text-gray-500 font-mono">HOUR</div>
                <div className="chinese-font text-2xl font-bold text-emerald-400 my-1">甲</div>
                <div className="chinese-font text-xl text-cyan-300">辰</div>
                <div className="text-[10px] text-emerald-400/80 mt-1 font-mono">Wood Dragon</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border-slate-500/30 bg-black/40 backdrop-blur-md">
                <div className="text-[10px] text-gray-500 font-mono">DAY</div>
                <div className="chinese-font text-2xl font-bold text-rose-400 my-1">丙</div>
                <div className="chinese-font text-xl text-slate-300">午</div>
                <div className="text-[10px] text-rose-400/80 mt-1 font-mono">Fire Horse</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border-amber-500/30 bg-black/40 backdrop-blur-md">
                <div className="text-[10px] text-gray-500 font-mono">MONTH</div>
                <div className="chinese-font text-2xl font-bold text-amber-400 my-1">戊</div>
                <div className="chinese-font text-xl text-amber-300">申</div>
                <div className="text-[10px] text-amber-400/80 mt-1 font-mono">Earth Monkey</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border-blue-500/30 bg-black/40 backdrop-blur-md">
                <div className="text-[10px] text-gray-500 font-mono">YEAR</div>
                <div className="chinese-font text-2xl font-bold text-blue-400 my-1">壬</div>
                <div className="chinese-font text-xl text-blue-300">子</div>
                <div className="text-[10px] text-blue-400/80 mt-1 font-mono">Water Rat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
