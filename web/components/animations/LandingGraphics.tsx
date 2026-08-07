'use client';

import React from 'react';

// ==========================================
// 1. Hero Luopan (Celestial Compass)
// ==========================================
export function HeroLuopan({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none opacity-[0.25] ${className}`}>
      <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin-slow">
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="340" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="2" />
        
        {/* Cardinal Lines */}
        <line x1="400" y1="20" x2="400" y2="780" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="400" x2="780" y2="400" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="131" y1="131" x2="669" y2="669" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="131" y1="669" x2="669" y2="131" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        
        {/* Inner Octagon */}
        <polygon points="400,200 541,259 600,400 541,541 400,600 259,541 200,400 259,259" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ==========================================
// 2. Bagua Grid (For Destiny Matrix Card)
// ==========================================
export function BaguaGrid({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none opacity-20 ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin-slow" style={{ animationDuration: '40s' }}>
        <polygon points="100,10 163,39 190,100 163,161 100,190 37,161 10,100 37,39" stroke="currentColor" strokeWidth="1" />
        <polygon points="100,30 149,51 170,100 149,149 100,170 51,149 30,100 51,51" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        
        {/* Trigram Lines (Simplified representation) */}
        <path d="M90,20 h20 M90,15 h20 M90,25 h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M90,175 h20 M90,180 h8 M102,180 h8 M90,185 h8 M102,185 h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ==========================================
// 3. Wuxing Watermarks
// ==========================================
export function WuxingWatermark({ element, className }: { element: 'wood' | 'fire' | 'earth' | 'metal' | 'water', className?: string }) {
  const commonClass = `pointer-events-none absolute right-0 bottom-0 opacity-20 w-48 h-48 translate-x-8 translate-y-8 ${className}`;
  
  switch (element) {
    case 'wood':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M50 90 Q 50 50 80 20 M50 90 Q 50 50 20 20 M50 90 L 50 10 M50 60 Q 70 50 85 45 M50 60 Q 30 50 15 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'fire':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M50 90 Q 20 90 20 60 Q 20 30 50 10 Q 60 40 80 50 Q 80 90 50 90 Z M50 80 Q 35 80 35 60 Q 35 45 50 30 Q 55 50 65 55 Q 65 80 50 80 Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'earth':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M10 80 L 90 80 L 70 50 L 50 80 L 40 60 L 20 80" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M30 65 L 50 30 L 70 65" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,30 70,50 50,70 30,50" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M10 50 Q 25 30 50 50 T 90 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 70 Q 25 50 50 70 T 90 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 30 Q 45 10 70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

// ==========================================
// 4. Celestial Orbit (For BaZi Pillars)
// ==========================================
export function CelestialOrbit({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-30 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M-100,100 C 100,200 300,0 500,100 C 700,200 900,0 1000,100" stroke="url(#orbit-grad)" strokeWidth="2" strokeDasharray="8 8" className="animate-pulse" />
        <path d="M-100,120 C 100,20 300,220 500,120 C 700,20 900,220 1000,120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <defs>
          <linearGradient id="orbit-grad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ==========================================
// 5. Xiu Constellations (For the 4 Beasts)
// ==========================================
export function XiuConstellation({ beast, className }: { beast: 'dragon' | 'bird' | 'tiger' | 'tortoise', className?: string }) {
  const commonClass = `pointer-events-none absolute top-0 right-0 w-full h-full opacity-30 ${className}`;
  
  switch (beast) {
    case 'dragon':
      // 7 Mansions of the Azure Dragon: Horn, Neck, Root, Room, Heart, Tail, Basket
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M20 160 L 50 130 L 80 140 L 120 110 L 130 80 L 160 50 L 180 20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="160" r="2.5" fill="currentColor" />
          <circle cx="50" cy="130" r="2" fill="currentColor" />
          <circle cx="80" cy="140" r="2.5" fill="currentColor" />
          <circle cx="120" cy="110" r="2" fill="currentColor" />
          <circle cx="130" cy="80" r="4" fill="currentColor" className="animate-pulse" />
          <circle cx="160" cy="50" r="2.5" fill="currentColor" />
          <circle cx="180" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case 'bird':
      // 7 Mansions of the Vermilion Bird
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M100 40 L 100 90 M 100 90 L 80 70 M 100 90 L 120 70 M 100 90 L 100 130 M 100 130 L 70 160 M 100 130 L 130 160" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="100" cy="40" r="2" fill="currentColor" />
          <circle cx="80" cy="70" r="2.5" fill="currentColor" />
          <circle cx="120" cy="70" r="2.5" fill="currentColor" />
          <circle cx="100" cy="90" r="4" fill="currentColor" className="animate-pulse" />
          <circle cx="100" cy="130" r="2" fill="currentColor" />
          <circle cx="70" cy="160" r="2.5" fill="currentColor" />
          <circle cx="130" cy="160" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'tiger':
      // 7 Mansions of the White Tiger
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M170 160 L 140 130 L 110 120 L 80 100 L 40 70 L 20 40 M 80 100 L 50 130" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="170" cy="160" r="2" fill="currentColor" />
          <circle cx="140" cy="130" r="2.5" fill="currentColor" />
          <circle cx="110" cy="120" r="2" fill="currentColor" />
          <circle cx="80" cy="100" r="3" fill="currentColor" />
          <circle cx="50" cy="130" r="2" fill="currentColor" />
          <circle cx="40" cy="70" r="2.5" fill="currentColor" />
          <circle cx="20" cy="40" r="4" fill="currentColor" className="animate-pulse" />
        </svg>
      );
    case 'tortoise':
      // 7 Mansions of the Black Tortoise
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
          <path d="M100 40 L 100 70 M 80 80 L 120 80 L 130 120 L 70 120 Z M 100 100 L 80 80 M 100 100 L 120 80 M 100 100 L 70 120 M 100 100 L 130 120 M 100 130 L 100 160" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="100" cy="40" r="2.5" fill="currentColor" />
          <circle cx="80" cy="80" r="2" fill="currentColor" />
          <circle cx="120" cy="80" r="2" fill="currentColor" />
          <circle cx="70" cy="120" r="2" fill="currentColor" />
          <circle cx="130" cy="120" r="2" fill="currentColor" />
          <circle cx="100" cy="100" r="4" fill="currentColor" className="animate-pulse" />
          <circle cx="100" cy="160" r="2.5" fill="currentColor" />
        </svg>
      );
  }
}
