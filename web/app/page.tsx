'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const OceanCanvas = dynamic(() => import('@/components/animations/OceanCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-4 relative">
      {/* Three.js Ocean Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <OceanCanvas />
        {/* Overlay gradient for text readability — matches reference */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(90deg, rgba(6,14,26,0.95) 0%, rgba(6,14,26,0.4) 45%, transparent 100%),
              linear-gradient(180deg, transparent 70%, rgba(6,14,26,1) 100%)
            `,
            zIndex: 2,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section tag with teal line */}
        <div className="section-tag justify-center mb-6">
          <span>Discover Your Destiny</span>
        </div>

        <h1 className="section-title text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          Unveil Your<br />
          <em>BaZi Blueprint</em>
        </h1>

        <p
          className="text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light"
          style={{ color: 'var(--text-secondary)' }}
        >
          An immersive journey into Chinese metaphysics. Explore the harmony of
          Wuxing and the depth of your personal elemental chart.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="btn-primary px-8 py-4 flex items-center justify-center min-w-[200px]"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="nav-cta flex items-center justify-center min-w-[200px]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
