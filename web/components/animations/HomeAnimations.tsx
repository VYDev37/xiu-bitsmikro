'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const hero = document.getElementById('hero-content');
      if (hero) hero.style.opacity = '1';
      // Ensure scroll-triggered panels are also visible
      document.querySelectorAll('.wuxing-panel, .xiu-panel').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const hero = document.getElementById('hero-content');
      if (hero) {
        gsap.fromTo(hero,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 2.2, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Wuxing panels — use fromTo so final state is always guaranteed
      const wuxingSection = document.getElementById('wuxing');
      if (wuxingSection) {
        gsap.fromTo('.wuxing-panel',
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: wuxingSection,
              start: 'top 85%',
              once: true, // only play once, then release
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity', // hand back to CSS after animation
          }
        );
      }

      // Xiu panels — same fix
      const xiuSection = document.getElementById('xiu');
      if (xiuSection) {
        gsap.fromTo('.xiu-panel',
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: xiuSection,
              start: 'top 85%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      // Recalculate triggers after everything is set up.
      // This correctly handles the case where the browser restores scroll
      // position after a refresh (elements already past trigger → animate immediately).
      ScrollTrigger.refresh();
    });

    return () => ctx.revert(); // cleanup all GSAP animations on unmount
  }, []);

  return <div ref={containerRef} style={{ display: 'none' }} />;
}

