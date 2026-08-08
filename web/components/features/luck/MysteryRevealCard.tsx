'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MysteryRevealCard({ onReveal }: { onReveal: () => void }) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleReveal = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      onReveal();
    }, 1200); // 1.2s to wait for the flip and fade animation
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12" style={{ perspective: 1500 }}>
      <motion.div
        className="relative w-64 h-96 cursor-pointer group"
        onClick={handleReveal}
        animate={isFlipping ? {
          rotateY: 180,
          scale: [1, 1.1, 1.2],
          y: [0, -20, -30],
          opacity: [1, 1, 0],
          filter: ["brightness(1)", "brightness(1.5)", "brightness(3)"]
        } : {
          y: [0, -10, 0],
        }}
        transition={isFlipping ? {
          duration: 1.2,
          ease: "easeInOut"
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of the Tarot Card (Closed state) */}
        <div
          className="absolute inset-0 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:border-amber-500/60 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
        >
          {/* Card texture & borders */}
          <div className="absolute inset-2 border-2 border-amber-500/20 rounded-xl"></div>
          <div className="absolute inset-4 border border-amber-500/10 rounded-lg"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

          {/* Mystical Pattern */}
          <div className="w-24 h-24 border-2 border-amber-500/40 rotate-45 flex items-center justify-center mt-[-20px]">
            <div className="w-20 h-20 border border-amber-500/30 rotate-45 flex items-center justify-center">
              <span className="text-5xl -rotate-90 opacity-80">命</span>
            </div>
          </div>

          <h3 className="text-amber-200/80 font-serif font-bold text-center text-xl mt-12 tracking-widest uppercase">Destiny Card</h3>

          <div className="mt-8 relative z-10 h-8 flex items-center justify-center">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold font-mono text-center"
            >
              Tap to Reveal
            </motion.p>
          </div>
        </div>

        {/* Back of the Tarot Card (Revealing state / Bright light burst) */}
        <div
          className="absolute inset-0 rounded-2xl bg-amber-100 flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-100 to-amber-300 animate-pulse"></div>
          <span className="text-6xl relative z-10">✨</span>
        </div>
      </motion.div>
    </div>
  );
}
