import Link from 'next/link';
import HomeAnimations from '@/components/animations/HomeAnimations';
import { AIChatSimulation, LuckBreathingStatus, ConstellationCarousel } from '@/components/animations/BentoMicroInteractions';
import { HeroLuopan, BaguaGrid, WuxingWatermark, CelestialOrbit, XiuConstellation } from '@/components/animations/LandingGraphics';
import ZodiacGrid from '@/components/animations/ZodiacGrid';

export default function HomePage() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      <HomeAnimations />

      {/* Hero Section */}
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
            Unifying the 28 Chinese Lunar Mansions (<span className="chinese-font text-blue-300">二十八宿</span>),
            the Five Elemental Phases (<span className="chinese-font text-emerald-400">五</span><span className="chinese-font text-rose-400">行</span>),
            and Western Zodiac Alignment under a high-definition crystal night sky.
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

      {/* Feature Bento Grid */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-[220px]">

          {/* Card 1: AI Chat (Col span 2, Row span 2) */}
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:border-sky-500/30 transition-all duration-500 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-sky-400 font-mono mb-3">Core Intelligence</div>
              <h3 className="text-3xl font-bold serif mb-2 text-white">Celestial Engine AI</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                A personalized, interactive oracle that interprets your Four Pillars, Elemental balance, and Zodiac alignment in real time.
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
              <p className="text-xs text-gray-400 font-light">Your precise BaZi pillar calculations mapped dynamically.</p>
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

      {/* Wuxing 5 Elements */}
      <section id="wuxing" className="py-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Fundamental Elemental Cycles</div>
          <h2 className="text-4xl md:text-5xl serif font-bold">
            Wuxing Five Phases <span className="chinese-font text-3xl font-normal text-gray-400">五行</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm font-light">
            The perpetual transformational flow of Wood, Fire, Earth, Metal, and Water governing cosmic balance and individual luck.
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

      {/* Zodiac Circle */}
      <section className="py-24 px-4 md:px-12 w-full relative z-10 overflow-hidden">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Cosmic Cards</div>
          <h2 className="text-4xl md:text-5xl serif font-bold">
            The 12 Zodiacs <span className="chinese-font text-3xl font-normal text-gray-400">十二生肖</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm font-light">
            Interactive representation of the 12 Earthly Branches mapped to their fundamental Wuxing elements. Click on any card to flip and reveal its inherent traits and emotional energy.
          </p>
        </div>
        
        <ZodiacGrid />
      </section>

      {/* BaZi 4 Pillars Interactive Showcase */}
      <section id="bazi" className="py-24 px-4 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row justify-between gap-12 items-center">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Four Pillars Architecture</div>
              <h2 className="text-4xl md:text-5xl serif font-bold mb-6">BaZi Chart Mapping <span className="chinese-font text-3xl font-normal text-blue-300">八字命盘</span></h2>
              <p className="text-gray-300 text-sm font-light leading-relaxed mb-8">
                Calculated using the exact solar calendar (Winter Solstice Dongzhi calibration). Every individual is governed by Heavenly Stems (<span className="chinese-font">天干</span>) and Terrestrial Branches (<span className="chinese-font">地支</span>).
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

      {/* 28 Xiu Mansions & Western Zodiac Bento Grid */}
      <section id="xiu" className="py-24 px-4 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Celestial Sphere Quadrants</div>
            <h2 className="text-4xl md:text-5xl serif font-bold">28 Xiu & Zodiac Constellations</h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm font-light">
            Mapping the 28 Lunar Mansions (<span className="chinese-font text-blue-300">二十八宿</span>) across the 4 cardinal celestial symbols and 12 zodiac houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {/* Azure Dragon Quadrant */}
          <div className="glass-panel xiu-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/40 transition-colors relative overflow-hidden">
            <XiuConstellation beast="dragon" className="text-sky-300" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400">East Quadrant</span>
                <h3 className="serif text-xl font-bold mt-1">Azure Dragon <span className="chinese-font font-normal text-cyan-300">青龙</span></h3>
              </div>
              <span className="chinese-font text-2xl text-emerald-400">角</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-gray-400">Jiao (Horn), Kang (Neck), Di (Root), Fang (Room), Xin (Heart), Wei (Tail), Ji (Winnowing Basket).</p>
              <div className="text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3 mt-3">Spring Mansions • Wood Phase</div>
            </div>
          </div>

          {/* Vermilion Bird Quadrant */}
          <div className="glass-panel xiu-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-rose-500/40 transition-colors relative overflow-hidden">
            <XiuConstellation beast="bird" className="text-sky-300" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] uppercase font-mono text-rose-400">South Quadrant</span>
                <h3 className="serif text-xl font-bold mt-1">Vermilion Bird <span className="chinese-font font-normal text-slate-300">朱雀</span></h3>
              </div>
              <span className="chinese-font text-2xl text-rose-400">井</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-gray-400">Jing (Well), Gui (Ghost), Liu (Willow), Xing (Star), Zhang (Extended Net), Yi (Wings), Zhen (Chariot).</p>
              <div className="text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3 mt-3">Summer Mansions • Fire Phase</div>
            </div>
          </div>

          {/* White Tiger Quadrant */}
          <div className="glass-panel xiu-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-slate-300/40 transition-colors relative overflow-hidden">
            <XiuConstellation beast="tiger" className="text-sky-300" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-300">West Quadrant</span>
                <h3 className="serif text-xl font-bold mt-1">White Tiger <span className="chinese-font font-normal text-slate-200">白虎</span></h3>
              </div>
              <span className="chinese-font text-2xl text-slate-200">奎</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-gray-400">Kui (Legs), Lou (Bond), Wei (Stomach), Mao (Hairy Head), Bi (Net), Zi (Turtle Beak), Shen (Three Stars).</p>
              <div className="text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3 mt-3">Autumn Mansions • Metal Phase</div>
            </div>
          </div>

          {/* Black Tortoise Quadrant */}
          <div className="glass-panel xiu-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/40 transition-colors relative overflow-hidden">
            <XiuConstellation beast="tortoise" className="text-sky-300" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] uppercase font-mono text-blue-400">North Quadrant</span>
                <h3 className="serif text-xl font-bold mt-1">Black Tortoise <span className="chinese-font font-normal text-blue-300">玄武</span></h3>
              </div>
              <span className="chinese-font text-2xl text-blue-400">斗</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-gray-400">Dou (Dipper), Niu (Ox), Nu (Girl), Xu (Emptiness), Wei (Rooftree), Shi (Encampment), Bi (Wall).</p>
              <div className="text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3 mt-3">Winter Mansions • Water Phase</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
