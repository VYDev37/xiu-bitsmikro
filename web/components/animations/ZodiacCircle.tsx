'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiMouse, GiBullHorns, GiTigerHead, GiRabbit, GiDragonHead, GiSnake, GiHorseHead, GiGoat, GiMonkey, GiRooster, GiSittingDog, GiPig } from 'react-icons/gi';

const zodiacs = [
  { id: 1, name: 'Tikus', char: '子', element: 'Water', color: 'text-blue-400', glow: 'shadow-[0_0_25px_rgba(96,165,250,0.8)]', border: 'border-blue-500/50', bg: 'bg-blue-900/40', Icon: GiMouse },
  { id: 2, name: 'Kerbau', char: '丑', element: 'Earth', color: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', border: 'border-amber-500/50', bg: 'bg-amber-900/40', Icon: GiBullHorns },
  { id: 3, name: 'Macan', char: '寅', element: 'Wood', color: 'text-emerald-400', glow: 'shadow-[0_0_25px_rgba(52,211,153,0.8)]', border: 'border-emerald-500/50', bg: 'bg-emerald-900/40', Icon: GiTigerHead },
  { id: 4, name: 'Kelinci', char: '卯', element: 'Wood', color: 'text-emerald-400', glow: 'shadow-[0_0_25px_rgba(52,211,153,0.8)]', border: 'border-emerald-500/50', bg: 'bg-emerald-900/40', Icon: GiRabbit },
  { id: 5, name: 'Naga', char: '辰', element: 'Earth', color: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', border: 'border-amber-500/50', bg: 'bg-amber-900/40', Icon: GiDragonHead },
  { id: 6, name: 'Ular', char: '巳', element: 'Fire', color: 'text-rose-400', glow: 'shadow-[0_0_25px_rgba(251,113,133,0.8)]', border: 'border-rose-500/50', bg: 'bg-rose-900/40', Icon: GiSnake },
  { id: 7, name: 'Kuda', char: '午', element: 'Fire', color: 'text-rose-400', glow: 'shadow-[0_0_25px_rgba(251,113,133,0.8)]', border: 'border-rose-500/50', bg: 'bg-rose-900/40', Icon: GiHorseHead },
  { id: 8, name: 'Kambing', char: '未', element: 'Earth', color: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', border: 'border-amber-500/50', bg: 'bg-amber-900/40', Icon: GiGoat },
  { id: 9, name: 'Monyet', char: '申', element: 'Metal', color: 'text-slate-200', glow: 'shadow-[0_0_25px_rgba(226,232,240,0.8)]', border: 'border-slate-300/50', bg: 'bg-slate-700/40', Icon: GiMonkey },
  { id: 10, name: 'Ayam', char: '酉', element: 'Metal', color: 'text-slate-200', glow: 'shadow-[0_0_25px_rgba(226,232,240,0.8)]', border: 'border-slate-300/50', bg: 'bg-slate-700/40', Icon: GiRooster },
  { id: 11, name: 'Anjing', char: '戌', element: 'Earth', color: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', border: 'border-amber-500/50', bg: 'bg-amber-900/40', Icon: GiSittingDog },
  { id: 12, name: 'Babi', char: '亥', element: 'Water', color: 'text-blue-400', glow: 'shadow-[0_0_25px_rgba(96,165,250,0.8)]', border: 'border-blue-500/50', bg: 'bg-blue-900/40', Icon: GiPig },
];

const WoodParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-emerald-400/60 rounded-tl-full rounded-br-full"
        initial={{ x: '50%', y: '50%', scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          x: ['50%', `${Math.random() * 100}%`],
          y: ['50%', `${Math.random() * 100}%`],
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
          rotate: [0, 180],
        }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
      />
    ))}
  </div>
);

const FireParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-rose-400 rounded-full blur-[1px]"
        initial={{ x: '50%', y: '70%', scale: 0, opacity: 0 }}
        animate={{
          y: ['70%', '10%'],
          x: ['50%', `${40 + Math.random() * 20}%`],
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
      />
    ))}
  </div>
);

const EarthParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-amber-300 rounded-sm"
        initial={{ x: '50%', y: '50%', scale: 0, opacity: 0 }}
        animate={{
          x: ['50%', `${Math.random() * 100}%`],
          y: ['50%', `${Math.random() * 100}%`],
          scale: [0, 1, 0],
          opacity: [0, 0.7, 0],
          rotate: [0, 90]
        }}
        transition={{ duration: 2.5 + Math.random() * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      />
    ))}
  </div>
);

const MetalParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white shadow-[0_0_5px_#fff] rounded-full"
        initial={{ x: `${20 + Math.random() * 60}%`, y: `${20 + Math.random() * 60}%`, scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 1.2 + Math.random(), repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
      />
    ))}
  </div>
);

const WaterParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full flex items-center justify-center">
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full h-full border border-blue-400/40 rounded-full"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{
          scale: [0.2, 1.2],
          opacity: [1, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
      />
    ))}
  </div>
);

const ElementParticles = ({ element }: { element: string }) => {
  switch (element) {
    case 'Wood': return <WoodParticles />;
    case 'Fire': return <FireParticles />;
    case 'Earth': return <EarthParticles />;
    case 'Metal': return <MetalParticles />;
    case 'Water': return <WaterParticles />;
    default: return null;
  }
};

export default function ZodiacCircle() {
  const [hoveredZodiac, setHoveredZodiac] = useState<number | null>(null);

  const total = zodiacs.length;

  return (
    <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] mx-auto my-20 flex items-center justify-center zodiac-container">
      
      {/* Central Label */}
      <div className="absolute z-0 w-24 h-24 md:w-36 md:h-36 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="text-center">
          <div className="chinese-font text-3xl md:text-5xl text-white/80">十二</div>
          <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mt-1 md:mt-2 font-mono">Zodiac</div>
        </div>
      </div>

      {/* Rotating Ring */}
      <div className="absolute inset-0 w-full h-full rounded-full zodiac-ring animate-spin-slow group-hover:pause">
        
        {zodiacs.map((zodiac, index) => {
          const angle = (360 / total) * index;
          const isHovered = hoveredZodiac === zodiac.id;
          
          return (
            <div
              key={zodiac.id}
              className="absolute top-1/2 left-1/2 w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8"
              style={{
                // Move out by 50% of the container
                transform: `rotate(${angle}deg) translateY(-160px) md:translateY(-250px)`,
              }}
            >
              {/* Counter-rotation to keep icons upright */}
              <div 
                className="w-full h-full zodiac-item-counter animate-spin-slow-reverse group-hover:pause" 
                onMouseEnter={() => setHoveredZodiac(zodiac.id)}
                onMouseLeave={() => setHoveredZodiac(null)}
              >
                <motion.div
                  className={`relative w-full h-full rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md border transition-all duration-300 ${isHovered ? zodiac.glow : 'shadow-lg'} ${isHovered ? zodiac.bg : 'bg-black/40'} ${isHovered ? zodiac.border : 'border-white/10'}`}
                  animate={{
                    scale: isHovered ? 1.5 : 1,
                    zIndex: isHovered ? 50 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <ElementParticles element={zodiac.element} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <zodiac.Icon className={`text-2xl md:text-4xl ${isHovered ? zodiac.color : 'text-white/40'} transition-colors duration-300 relative z-10`} />
                  
                  <span className={`chinese-font absolute top-1 right-2 text-xs md:text-sm ${isHovered ? zodiac.color : 'text-white/20'} transition-colors duration-300 z-10 font-bold opacity-70`}>
                    {zodiac.char}
                  </span>
                </motion.div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-white/20 px-3 py-1.5 rounded-full pointer-events-none z-50 backdrop-blur-md"
                    >
                      <span className={`text-[9px] md:text-[10px] uppercase font-bold tracking-widest ${zodiac.color}`}>
                        {zodiac.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Global styles block just for hover pause if it's easier, or tailwind arbitrary values */}
      <style dangerouslySetInnerHTML={{__html: `
        .zodiac-container:hover .zodiac-ring,
        .zodiac-container:hover .zodiac-item-counter {
          animation-play-state: paused !important;
        }
        @media (min-width: 768px) {
          .zodiac-ring > div {
            transform: rotate(var(--angle)) translateY(-250px);
          }
        }
        @media (max-width: 767px) {
          .zodiac-ring > div {
            transform: rotate(var(--angle)) translateY(-160px);
          }
        }
      `}} />
    </div>
  );
}
