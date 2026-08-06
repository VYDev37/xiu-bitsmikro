'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 25;

function createParticle(container: HTMLDivElement) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  const size = Math.random() * 4 + 2; // 2-6px
  const x = Math.random() * 100;
  const duration = Math.random() * 20 + 15; // 15-35s
  const delay = Math.random() * 15;
  const opacity = Math.random() * 0.4 + 0.1;

  // Alternate between accent and teal
  const color = Math.random() > 0.5
    ? 'rgba(14, 165, 233, VAR)'.replace('VAR', String(opacity))
    : 'rgba(20, 184, 166, VAR)'.replace('VAR', String(opacity));

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}%;
    background: radial-gradient(circle, ${color}, transparent);
    box-shadow: 0 0 ${size * 3}px ${color};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  container.appendChild(particle);
}

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // --- 1. Background Floating Particles (CSS) ---
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      createParticle(container);
    }

    // --- 2. Interactive Cursor Bubbles (Canvas) ---
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    class Bubble {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // 1-4px
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5; // slight upward drift
        this.opacity = Math.random() * 0.5 + 0.3; // 0.3 - 0.8
        
        // Pick colors matching the oceanic theme
        const colors = [
          'rgba(14, 165, 233,', // Accent (Blue)
          'rgba(20, 184, 166,', // Teal
          'rgba(138, 180, 200,' // Text Secondary (Light blue)
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015; // Fade out
        this.size -= 0.02; // Shrink
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${Math.max(0, this.opacity)})`;
        ctx.fill();
      }
    }

    const bubbles: Bubble[] = [];
    let mouse = { x: -1000, y: -1000 };
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;
      
      // Spawn 1-2 bubbles on move
      const spawnCount = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < spawnCount; i++) {
        bubbles.push(new Bubble(
          mouse.x + (Math.random() * 10 - 5),
          mouse.y + (Math.random() * 10 - 5)
        ));
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].draw();

        // Remove dead bubbles
        if (bubbles[i].opacity <= 0 || bubbles[i].size <= 0) {
          bubbles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <>
      {/* Background CSS Particles */}
      <div ref={containerRef} className="particles-container" id="particles" />
      
      {/* Interactive Cursor Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          width: '100vw',
          height: '100vh',
        }}
      />
    </>
  );
}
