'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We attach animations by querying DOM elements that are rendered by Server Components
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const hero = document.getElementById('hero-content');
      if (hero) hero.style.opacity = '1';
      return;
    }

    const hero = document.getElementById('hero-content');
    if (hero) {
      gsap.fromTo(hero, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 2.2, ease: "power3.out", delay: 0.2 }
      );
    }

    const wuxingSection = document.getElementById('wuxing');
    if (wuxingSection) {
      gsap.from(".wuxing-panel", {
        scrollTrigger: {
          trigger: wuxingSection,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
    
    const xiuSection = document.getElementById('xiu');
    if (xiuSection) {
      gsap.from(".xiu-panel", {
        scrollTrigger: {
          trigger: xiuSection,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, []);

  return <div ref={containerRef} style={{ display: 'none' }} />;
}
