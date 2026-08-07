'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- AIChatSimulation ---
const prompts = [
  "Analyzing your Four Pillars...",
  "Calculating elemental balance for today.",
  "Your Wood energy is peaking.",
  "Checking Lunar Mansions alignment..."
];

export const AIChatSimulation = React.memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#030712]/50 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 h-32 justify-end overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="flex items-center gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
          </div>
          <p className="text-xs font-mono text-sky-200/90 whitespace-nowrap overflow-hidden">
            <TypewriterText text={prompts[index]} />
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
AIChatSimulation.displayName = 'AIChatSimulation';

// Internal typewriter helper
const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40); // typing speed

    return () => clearInterval(timer);
  }, [text]);

  return (
    <>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3 bg-sky-400 ml-1 align-middle"
      />
    </>
  );
};


// --- LuckBreathingStatus ---
export const LuckBreathingStatus = React.memo(() => {
  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      {/* Outer diffusion glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-blue-500/20 blur-md"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      {/* Inner core */}
      <div className="relative w-3 h-3 rounded-full bg-blue-400 border border-white/20 shadow-[0_0_10px_#60a5fa]" />
    </div>
  );
});
LuckBreathingStatus.displayName = 'LuckBreathingStatus';


// --- ConstellationCarousel ---
const constellations = [
  { name: "Azure Dragon", symbol: "青龙", element: "Wood", color: "text-sky-400", border: "border-sky-500/30" },
  { name: "Vermilion Bird", symbol: "朱雀", element: "Fire", color: "text-blue-400", border: "border-blue-500/30" },
  { name: "White Tiger", symbol: "白虎", element: "Metal", color: "text-slate-300", border: "border-slate-400/30" },
  { name: "Black Tortoise", symbol: "玄武", element: "Water", color: "text-cyan-400", border: "border-cyan-500/30" }
];

export const ConstellationCarousel = React.memo(() => {
  return (
    <div className="relative w-full overflow-hidden py-4 flex gap-4 mask-edges">
      {/* 
        We render two identical lists to create an infinite seamless marquee 
        using Framer Motion. 
      */}
      <motion.div
        className="flex gap-4 shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {constellations.map((c, i) => (
          <CarouselItem key={`a-${i}`} {...c} />
        ))}
        {constellations.map((c, i) => (
          <CarouselItem key={`b-${i}`} {...c} />
        ))}
      </motion.div>
    </div>
  );
});
ConstellationCarousel.displayName = 'ConstellationCarousel';

interface CarouselItemProps {
  name: string;
  symbol: string;
  element: string;
  color: string;
  border: string;
}

const CarouselItem = ({ name, symbol, element, color, border }: CarouselItemProps) => (
  <div className={`shrink-0 w-48 h-20 bg-white/[0.01] rounded-2xl border ${border} flex items-center justify-between p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}>
    <div className="flex flex-col">
      <span className="text-xs font-mono uppercase tracking-widest text-slate-400">{element}</span>
      <span className="text-sm font-semibold mt-1">{name}</span>
    </div>
    <span className={`chinese-font text-3xl opacity-80 ${color}`}>{symbol}</span>
  </div>
);
