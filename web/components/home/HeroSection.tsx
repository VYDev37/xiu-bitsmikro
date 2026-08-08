import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center text-center px-4 w-full relative overflow-hidden">
      {/* <HeroLuopan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-sky-400" />
       */}
      <div className="space-y-6 max-w-5xl opacity-0 mt-6 relative z-10" id="hero-content">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs tracking-[0.25em] uppercase mb-2">
          <span className="chinese-font">天人合一</span> • Chinese & Western Celestial Metaphysics
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wider glow-text leading-tight serif">
          Empirical Cosmos &<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-300">
            Four Pillars of Destiny
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-3xl mx-auto mt-6 leading-relaxed">
          Explore the 28 Lunar Mansions (<span className="chinese-font text-blue-300">二十八宿</span>),
          the Five Elemental Phases (<span className="chinese-font text-emerald-400">五</span><span className="chinese-font text-rose-400">行</span>),
          and Western Zodiacs in one celestial map.
        </p>

        <div className="pt-10 flex flex-wrap justify-center gap-5">
          <Link href="#bazi" className="glass-panel px-8 py-4 rounded-full uppercase tracking-widest text-xs hover:border-blue-400/50 transition-all duration-500 flex items-center gap-3 group text-gray-200 hover:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></span>
            Explore BaZi Alignment
          </Link>
          <Link href="#wuxing" className="glass-panel px-8 py-4 rounded-full uppercase tracking-widest text-xs hover:border-purple-400/50 transition-all duration-500 flex items-center gap-3 text-gray-200 hover:text-white">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]"></span>
            Wuxing Energies
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <div className="text-[10px] uppercase tracking-[0.3em] text-blue-300">Scroll to Explore</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-400 to-transparent"></div>
      </div>
    </section>
  );
}
