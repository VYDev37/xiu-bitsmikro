'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        BaZi<span>AI</span>
      </Link>

      <ul className={`nav-links${isOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={pathname === href ? { color: 'var(--text-primary)' } : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
        {/* Mobile-only CTA inside menu */}
        <li className="block lg:hidden mt-4">
          <Link href="/login" className="nav-cta">
            Begin Dive
          </Link>
        </li>
      </ul>

      <Link href="/login" className="nav-cta nav-cta-desktop hidden lg:inline-flex">
        Begin Dive
      </Link>

      <button
        className={`nav-hamburger${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
