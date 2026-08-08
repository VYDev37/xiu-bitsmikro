import { WuxingWatermark } from '@/components/animations/LandingGraphics';

export function WuxingSection() {
  return (
    <section id="wuxing" className="py-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Fundamental Elemental Cycles</div>
        <h2 className="text-4xl md:text-5xl serif font-bold">
          Wuxing Five Phases <span className="chinese-font text-3xl font-normal text-gray-400">五行</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm font-light">
          Wood, Fire, Earth, Metal, and Water cycle continuously to shape cosmic balance and your luck.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Wood */}
        <div className="glass-panel wuxing-panel rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-500 group relative overflow-hidden">
          <WuxingWatermark element="wood" className="text-emerald-400" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="chinese-font text-3xl font-bold text-emerald-400">木</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">01 / Wood</span>
          </div>
          <h3 className="serif text-xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors relative z-10">Growth & Vitality</h3>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10">Associated with East, Spring, Azure Dragon (青龙). Represents expansion and creative drive.</p>
        </div>

        {/* Fire */}
        <div className="glass-panel wuxing-panel rounded-2xl p-6 hover:border-rose-500/50 transition-all duration-500 group relative overflow-hidden">
          <WuxingWatermark element="fire" className="text-rose-400" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="chinese-font text-3xl font-bold text-rose-400">火</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">02 / Fire</span>
          </div>
          <h3 className="serif text-xl font-semibold mb-2 group-hover:text-slate-300 transition-colors relative z-10">Climax & Passion</h3>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10">Associated with South, Summer, Vermilion Bird (朱雀). Represents illumination and transformation.</p>
        </div>

        {/* Earth */}
        <div className="glass-panel wuxing-panel rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-500 group relative overflow-hidden">
          <WuxingWatermark element="earth" className="text-amber-400" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="chinese-font text-3xl font-bold text-amber-400">土</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">03 / Earth</span>
          </div>
          <h3 className="serif text-xl font-semibold mb-2 group-hover:text-amber-300 transition-colors relative z-10">Balance & Grounding</h3>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10">Associated with Center, Transitions, Yellow Dragon (黄龙). Represents stability and nourishment.</p>
        </div>

        {/* Metal */}
        <div className="glass-panel wuxing-panel rounded-2xl p-6 hover:border-slate-300/50 transition-all duration-500 group relative overflow-hidden">
          <WuxingWatermark element="metal" className="text-slate-200" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="chinese-font text-3xl font-bold text-slate-200">金</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">04 / Metal</span>
          </div>
          <h3 className="serif text-xl font-semibold mb-2 group-hover:text-slate-100 transition-colors relative z-10">Harvest & Structure</h3>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10">Associated with West, Autumn, White Tiger (白虎). Represents refinement, clarity, and precision.</p>
        </div>

        {/* Water */}
        <div className="glass-panel wuxing-panel rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden">
          <WuxingWatermark element="water" className="text-blue-400" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="chinese-font text-3xl font-bold text-blue-400">水</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">05 / Water</span>
          </div>
          <h3 className="serif text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors relative z-10">Wisdom & Storage</h3>
          <p className="text-xs text-gray-400 leading-relaxed relative z-10">Associated with North, Winter, Black Tortoise (玄武). Represents intuition and potential.</p>
        </div>
      </div>
    </section>
  );
}
