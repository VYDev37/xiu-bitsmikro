'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({ 
  children, 
  className = '',
  spotlightColor = 'rgba(129,140,248,0.12)' 
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const spotlight = document.createElement('div');
    spotlight.classList.add('bento-card-spotlight');
    card.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      if (card.contains(spotlight)) {
        spotlight.remove();
      }
    };
  }, [spotlightColor]);

  return (
    <div ref={cardRef} className={`glass-panel ${className}`}>
      {children}
    </div>
  );
}
