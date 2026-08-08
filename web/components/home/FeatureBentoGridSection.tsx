import { AIChatSimulation, LuckBreathingStatus, ConstellationCarousel } from '@/components/animations/BentoMicroInteractions';
import { BaguaGrid } from '@/components/animations/LandingGraphics';

export function FeatureBentoGridSection() {
  return (
    <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-[220px]">
        {/* Card 1: AI Chat (Col span 2, Row span 2) */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:border-sky-500/30 transition-all duration-500 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-sky-400 font-mono mb-3">Core Intelligence</div>
            <h3 className="text-3xl font-bold serif mb-2 text-white">Celestial Engine AI</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
              Chat with an AI that reads your Four Pillars, Elemental balance, and Zodiac alignment instantly.
            </p>
          </div>
          <div className="mt-8">
            <AIChatSimulation />
          </div>
        </div>

        {/* Card 2: Today's Luck (Col 1, Row 1) */}
        <div className="glass-panel rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-blue-400/30 transition-all duration-500">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
              <LuckBreathingStatus />
            </div>
            <span className="text-[10px] uppercase font-mono text-blue-400 border border-blue-400/20 px-2 py-1 rounded-full bg-blue-400/5">Live Sync</span>
          </div>
          <div>
            <h3 className="text-xl font-bold serif text-white mb-1">Today's Luck</h3>
            <p className="text-xs text-gray-400 font-light">Real-time daily elemental phases and fortune scoring.</p>
          </div>
        </div>

        {/* Card 3: Destiny Matrix (Col 1, Row 1) */}
        <div className="glass-panel rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-blue-400/30 transition-all duration-500 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <span className="chinese-font text-4xl text-blue-400/80 group-hover:text-blue-300 transition-colors">命</span>
          </div>
          <BaguaGrid className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-blue-300" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold serif text-white mb-1">Destiny Matrix</h3>
            <p className="text-xs text-gray-400 font-light">View your exact BaZi pillar calculations.</p>
          </div>
        </div>

        {/* Card 4: Lunar Mansions (Col span 2, Row span 1) */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:col-span-2 flex flex-col justify-center overflow-hidden relative group hover:border-cyan-500/30 transition-all duration-500">
          <div className="flex items-end justify-between mb-4 px-2 z-10">
            <div>
              <h3 className="text-xl font-bold serif text-white mb-1">28 Lunar Mansions</h3>
              <p className="text-xs text-gray-400 font-light">Continuous astronomical alignment tracking.</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest hidden sm:block">Real-time Orbit</span>
          </div>
          <ConstellationCarousel />
        </div>
      </div>
    </section>
  );
}
