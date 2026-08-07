'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiMouse, GiBullHorns, GiTigerHead, GiRabbit, GiDragonHead, GiSnake, GiHorseHead, GiGoat, GiMonkey, GiRooster, GiSittingDog, GiPig } from 'react-icons/gi';

// Zodiac Data with accurate Fengshui/Bazi Traits from prompt.txt
const zodiacs = [
  { id: 1, name: 'Tikus', char: '子', element: 'Air', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/40', glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]', Icon: GiMouse, sifat: 'Arus Bawah, Strategi, Kecerdasan', emosi: 'Kebijaksanaan / Ketakutan', energi: 'Air Yang' },
  { id: 2, name: 'Kerbau', char: '丑', element: 'Tanah', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiBullHorns, sifat: 'Inersia, Fondasi, Penyimpan Logam', emosi: 'Kestabilan / Kecemasan', energi: 'Tanah Yin' },
  { id: 3, name: 'Macan', char: '寅', element: 'Kayu', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.5)]', Icon: GiTigerHead, sifat: 'Ekspansi Kinetik, Direct Action', emosi: 'Amarah / Pertumbuhan', energi: 'Kayu Yang' },
  { id: 4, name: 'Kelinci', char: '卯', element: 'Kayu', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.5)]', Icon: GiRabbit, sifat: 'Pertumbuhan Fleksibel, Diplomasi', emosi: 'Amarah / Pertumbuhan', energi: 'Kayu Yin' },
  { id: 5, name: 'Naga', char: '辰', element: 'Tanah', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiDragonHead, sifat: 'Visi Besar, Otoritas, Penyimpan Air', emosi: 'Kestabilan / Kecemasan', energi: 'Tanah Yang' },
  { id: 6, name: 'Ular', char: '巳', element: 'Api', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-950/40', glow: 'shadow-[0_0_15px_rgba(251,113,133,0.5)]', Icon: GiSnake, sifat: 'Radiasi Termal, Kebijaksanaan, Visi', emosi: 'Kegembiraan / Volatilitas', energi: 'Api Yang' },
  { id: 7, name: 'Kuda', char: '午', element: 'Api', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-950/40', glow: 'shadow-[0_0_15px_rgba(251,113,133,0.5)]', Icon: GiHorseHead, sifat: 'Energi Meledak, Kecepatan, Gairah', emosi: 'Kegembiraan / Volatilitas', energi: 'Api Yin' },
  { id: 8, name: 'Kambing', char: '未', element: 'Tanah', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiGoat, sifat: 'Kelembutan, Penyimpan Kayu', emosi: 'Kestabilan / Kecemasan', energi: 'Tanah Yin' },
  { id: 9, name: 'Monyet', char: '申', element: 'Logam', color: 'text-slate-200', border: 'border-slate-300/50', bg: 'bg-slate-800/40', glow: 'shadow-[0_0_15px_rgba(226,232,240,0.5)]', Icon: GiMonkey, sifat: 'Struktur Rigid, Inovasi, Eksekusi', emosi: 'Ketegasan / Kesedihan', energi: 'Logam Yang' },
  { id: 10, name: 'Ayam', char: '酉', element: 'Logam', color: 'text-slate-200', border: 'border-slate-300/50', bg: 'bg-slate-800/40', glow: 'shadow-[0_0_15px_rgba(226,232,240,0.5)]', Icon: GiRooster, sifat: 'Ketelitian, Kualitas, Kritis', emosi: 'Ketegasan / Kesedihan', energi: 'Logam Yin' },
  { id: 11, name: 'Anjing', char: '戌', element: 'Tanah', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/40', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]', Icon: GiSittingDog, sifat: 'Protektif, Penyimpan Api', emosi: 'Kestabilan / Kecemasan', energi: 'Tanah Yang' },
  { id: 12, name: 'Babi', char: '亥', element: 'Air', color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/40', glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]', Icon: GiPig, sifat: 'Penyerapan, Adaptasi, Arus Deras', emosi: 'Kebijaksanaan / Ketakutan', energi: 'Air Yang' },
];

export default function ZodiacGrid() {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    // Toggle flip
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-16 perspective-1000">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {zodiacs.map((zodiac) => {
          const isFlipped = flippedId === zodiac.id;
          
          return (
            <div 
              key={zodiac.id} 
              className="relative w-full aspect-[3/4] cursor-pointer group"
              onClick={() => handleCardClick(zodiac.id)}
              style={{ perspective: '1000px' }}
            >
              {/* Card Inner Wrapper for 3D Transform */}
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* FRONT FACE (Mahjong Tile Style) */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 transition-all duration-300 ${zodiac.bg} ${zodiac.border} group-hover:${zodiac.glow} flex flex-col items-center justify-between p-4 bg-gradient-to-br from-white/[0.05] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_4px_4px_10px_rgba(0,0,0,0.5)]`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Top Left Element Indicator */}
                  <div className="w-full flex justify-start">
                    <span className={`text-[10px] uppercase font-bold tracking-widest ${zodiac.color} opacity-80`}>
                      {zodiac.element}
                    </span>
                  </div>

                  {/* Center Icon */}
                  <zodiac.Icon className={`text-6xl md:text-5xl lg:text-6xl ${zodiac.color} filter drop-shadow-[0_0_8px_currentColor]`} />

                  {/* Bottom Text & Char */}
                  <div className="w-full flex items-end justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
                      {zodiac.name}
                    </span>
                    <span className={`chinese-font text-2xl font-bold ${zodiac.color} opacity-90`}>
                      {zodiac.char}
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Details) */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 transition-all duration-300 bg-[#0a0f1c] ${zodiac.border} flex flex-col justify-start p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="border-b border-white/10 pb-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60 font-mono">Energi</span>
                      <span className={`text-xs font-bold ${zodiac.color}`}>{zodiac.energi}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Sifat & Karakter</div>
                      <p className="text-xs text-white/80 leading-relaxed font-light">
                        {zodiac.sifat}
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Emosi Inti</div>
                      <p className={`text-xs font-medium ${zodiac.color} opacity-90 leading-relaxed`}>
                        {zodiac.emosi}
                      </p>
                    </div>
                  </div>

                  {/* Return instruction */}
                  <div className="w-full text-center mt-auto pt-2 opacity-30">
                    <span className="text-[9px] uppercase tracking-widest">Click to Flip</span>
                  </div>
                </div>

              </motion.div>
            </div>
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
