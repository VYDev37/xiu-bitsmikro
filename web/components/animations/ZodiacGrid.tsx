'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiMouse, GiBullHorns, GiTigerHead, GiRabbit, GiDragonHead, GiSnake, GiHorseHead, GiGoat, GiMonkey, GiRooster, GiSittingDog, GiPig } from 'react-icons/gi';

// Zodiac Data with accurate Fengshui/Bazi Traits from prompt.txt
const zodiacs = [
  { id: 1, name: 'Rat', char: '子', element: 'Water', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/40', glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]', Icon: GiMouse, sifat: 'Undercurrent, Strategy, Intelligence', emosi: 'Wisdom / Fear', energi: 'Yang Water' },
  { id: 2, name: 'Ox', char: '丑', element: 'Earth', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiBullHorns, sifat: 'Inertia, Foundation, Metal Storage', emosi: 'Stability / Anxiety', energi: 'Yin Earth' },
  { id: 3, name: 'Tiger', char: '寅', element: 'Wood', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.5)]', Icon: GiTigerHead, sifat: 'Kinetic Expansion, Direct Action', emosi: 'Anger / Growth', energi: 'Yang Wood' },
  { id: 4, name: 'Rabbit', char: '卯', element: 'Wood', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.5)]', Icon: GiRabbit, sifat: 'Flexible Growth, Diplomacy', emosi: 'Anger / Growth', energi: 'Yin Wood' },
  { id: 5, name: 'Dragon', char: '辰', element: 'Earth', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiDragonHead, sifat: 'Grand Vision, Authority, Water Storage', emosi: 'Stability / Anxiety', energi: 'Yang Earth' },
  { id: 6, name: 'Snake', char: '巳', element: 'Fire', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-950/40', glow: 'shadow-[0_0_15px_rgba(251,113,133,0.5)]', Icon: GiSnake, sifat: 'Thermal Radiation, Wisdom, Vision', emosi: 'Joy / Volatility', energi: 'Yang Fire' },
  { id: 7, name: 'Horse', char: '午', element: 'Fire', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-950/40', glow: 'shadow-[0_0_15px_rgba(251,113,133,0.5)]', Icon: GiHorseHead, sifat: 'Explosive Energy, Speed, Passion', emosi: 'Joy / Volatility', energi: 'Yin Fire' },
  { id: 8, name: 'Goat', char: '未', element: 'Earth', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiGoat, sifat: 'Gentleness, Wood Storage', emosi: 'Stability / Anxiety', energi: 'Yin Earth' },
  { id: 9, name: 'Monkey', char: '申', element: 'Metal', color: 'text-slate-200', border: 'border-slate-300/50', bg: 'bg-slate-800/40', glow: 'shadow-[0_0_15px_rgba(226,232,240,0.5)]', Icon: GiMonkey, sifat: 'Rigid Structure, Innovation, Execution', emosi: 'Decisiveness / Grief', energi: 'Yang Metal' },
  { id: 10, name: 'Rooster', char: '酉', element: 'Metal', color: 'text-slate-200', border: 'border-slate-300/50', bg: 'bg-slate-800/40', glow: 'shadow-[0_0_15px_rgba(226,232,240,0.5)]', Icon: GiRooster, sifat: 'Precision, Quality, Critical', emosi: 'Decisiveness / Grief', energi: 'Yin Metal' },
  { id: 11, name: 'Dog', char: '戌', element: 'Earth', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiSittingDog, sifat: 'Protective, Fire Storage', emosi: 'Stability / Anxiety', energi: 'Yang Earth' },
  { id: 12, name: 'Pig', char: '亥', element: 'Water', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/40', glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]', Icon: GiPig, sifat: 'Absorption, Adaptation, Torrential Flow', emosi: 'Wisdom / Fear', energi: 'Yang Water' },
];

export default function ZodiacGrid() {
  const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set());
  
  // Ref to track swipe state
  const isPointerDown = useRef(false);
  const swipedInThisStroke = useRef<Set<number>>(new Set());

  const toggleFlip = (id: number) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const handleGlobalUp = () => {
      isPointerDown.current = false;
      swipedInThisStroke.current.clear();
    };
    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('pointercancel', handleGlobalUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('pointercancel', handleGlobalUp);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto my-16 perspective-1000 select-none">
      
      <div 
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 touch-pan-y"
        onPointerDown={(e) => {
          const cardEl = (e.target as HTMLElement).closest('[data-zodiac-id]');
          if (cardEl) {
            isPointerDown.current = true;
            swipedInThisStroke.current.clear();
            const id = parseInt(cardEl.getAttribute('data-zodiac-id') || '0', 10);
            swipedInThisStroke.current.add(id);
            toggleFlip(id);
          }
        }}
        onPointerMove={(e) => {
          if (!isPointerDown.current) return;
          // Avoid default behavior to make swiping smoother on some devices
          // Use elementFromPoint because pointer might move over other elements 
          // while still captured by the original element
          const element = document.elementFromPoint(e.clientX, e.clientY);
          if (!element) return;
          const cardEl = element.closest('[data-zodiac-id]');
          if (cardEl) {
            const id = parseInt(cardEl.getAttribute('data-zodiac-id') || '0', 10);
            if (id && !swipedInThisStroke.current.has(id)) {
              swipedInThisStroke.current.add(id);
              toggleFlip(id);
            }
          }
        }}
        onPointerUp={() => {
          isPointerDown.current = false;
          swipedInThisStroke.current.clear();
        }}
        onPointerCancel={() => {
          isPointerDown.current = false;
          swipedInThisStroke.current.clear();
        }}
      >
        {zodiacs.map((zodiac, index) => {
          const isFlipped = flippedIds.has(zodiac.id);
          
          return (
            <motion.div 
              key={zodiac.id} 
              data-zodiac-id={zodiac.id}
              className="relative w-full aspect-[3/4] cursor-pointer group antialiased"
              style={{ perspective: '1000px' }}
              initial={{ 
                opacity: 0, 
                x: (index % 3 === 0) ? 100 : (index % 3 === 2) ? -100 : 0,
                y: index < 4 ? 150 : index > 7 ? -150 : 0,
                scale: 0.2, 
                rotateZ: (index % 2 === 0 ? 1 : -1) * (90 + index * 15) 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateZ: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.06, 
                type: 'spring', 
                damping: 15, 
                stiffness: 100 
              }}
            >
              {/* Card Inner Wrapper for 3D Transform */}
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* FRONT FACE (Mahjong Tile Style) */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 transition-all duration-300 ${zodiac.bg} ${zodiac.border} group-hover:${zodiac.glow} flex flex-col items-center justify-between p-1.5 md:p-4 overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.5)]`}
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(1px)', WebkitFontSmoothing: 'antialiased' }}
                >
                  {/* Top Left Element Indicator */}
                  <div className="w-full flex justify-start">
                    <span className={`text-[7px] md:text-[10px] uppercase font-bold tracking-widest ${zodiac.color} opacity-80`}>
                      {zodiac.element}
                    </span>
                  </div>

                  {/* Center Icon */}
                  <zodiac.Icon className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${zodiac.color} filter drop-shadow-[0_0_8px_currentColor]`} />

                  {/* Bottom Text & Char */}
                  <div className="w-full flex items-end justify-between">
                    <span className="text-[8px] md:text-sm font-semibold uppercase tracking-wider text-white/90">
                      {zodiac.name}
                    </span>
                    <span className={`chinese-font text-base md:text-2xl font-bold ${zodiac.color} opacity-90`}>
                      {zodiac.char}
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Details) */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 transition-all duration-300 bg-[#0a0f1c] ${zodiac.border} flex flex-col justify-start p-1.5 md:p-4 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)', WebkitFontSmoothing: 'antialiased' }}
                >
                  <div className="border-b border-white/10 pb-1 md:pb-2 mb-1.5 md:mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] md:text-xs text-white/60 font-mono">Energy</span>
                      <span className={`text-[8px] md:text-xs font-bold ${zodiac.color}`}>{zodiac.energi}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5 md:gap-3">
                    <div>
                      <div className="text-[7px] md:text-[10px] uppercase tracking-wide md:tracking-widest text-white/40 mb-0.5 md:mb-1">Nature & Character</div>
                      <p className="text-[8px] md:text-xs text-white/80 leading-tight md:leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                        {zodiac.sifat}
                      </p>
                    </div>

                    <div>
                      <div className="text-[7px] md:text-[10px] uppercase tracking-wide md:tracking-widest text-white/40 mb-0.5 md:mb-1">Core Emotion</div>
                      <p className={`text-[8px] md:text-xs font-medium ${zodiac.color} opacity-90 leading-tight md:leading-relaxed`}>
                        {zodiac.emosi}
                      </p>
                    </div>
                  </div>

                  {/* Return instruction */}
                  <div className="w-full text-center mt-auto pt-1 opacity-30">
                    <span className="text-[6px] md:text-[9px] uppercase tracking-widest">Swipe / Tap to Flip</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Utility Styles for 3D Flip */}
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
}
