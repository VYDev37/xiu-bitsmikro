import ZodiacGrid from '@/components/animations/ZodiacGrid';

export function ZodiacSection() {
  return (
    <section className="py-24 px-4 md:px-12 w-full relative z-10 overflow-hidden">
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-2">Cosmic Cards</div>
        <h2 className="text-4xl md:text-5xl serif font-bold">
          The 12 Zodiacs <span className="chinese-font text-3xl font-normal text-gray-400">十二生肖</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm font-light">
          Explore the 12 Earthly Branches and their Wuxing elements. Click any card to reveal its traits and emotional energy.
        </p>
      </div>
      
      <ZodiacGrid />
    </section>
  );
}
