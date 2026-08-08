import { XiuConstellation } from '@/components/animations/LandingGraphics';

export function XiuMansionsSection() {
  return (
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
  );
}
