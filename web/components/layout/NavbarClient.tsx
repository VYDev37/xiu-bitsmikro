'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const NAV_ITEMS = [
  { href: '/#bazi', label: 'BaZi 四柱', isPrivate: false },
  { href: '/#wuxing', label: 'Wuxing 五行', isPrivate: false },
  { href: '/#xiu', label: '28 Xiu 二十八宿', isPrivate: false },
  { href: '/dashboard', label: 'Today\'s Luck 運勢', isPrivate: true },
  { href: '/chat', label: 'Chat 聊天', isPrivate: true },
];

export default function NavbarClient({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleScroll]);

  // Close menus on route change
  useEffect(() => {
    // Avoid calling setState synchronously
    const timer = setTimeout(() => {
      setIsOpen(false);
      setIsProfileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setIsProfileOpen(false);
        }
      }
    } else {
      setIsOpen(false);
      setIsProfileOpen(false);
    }
  };

  const logout = useUserStore(state => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      setIsProfileOpen(false);
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${isOpen ? ' menu-open' : ''}`}>
      <Link href="/" className="flex items-center gap-3 decoration-transparent">
        <span className="chinese-font text-blue-400 font-bold text-xl drop-shadow-md">星宿</span>
        <span className="serif text-xl tracking-widest font-bold uppercase border-l border-white/20 pl-3 drop-shadow-md text-white">
          Aetheria Celestial
        </span>
      </Link>

      <ul className={`nav-links${isOpen ? ' open' : ''}`}>
        {NAV_ITEMS.filter(item => !item.isPrivate || isLoggedIn).map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </Link>
          </li>
        ))}

        {/* Mobile-only CTA inside menu */}
        <li className="block lg:hidden mt-4">
          {!isLoggedIn ? (
            <Link href="/login" className="nav-cta" onClick={() => setIsOpen(false)}>
              Calculate BaZi Chart
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/profile" className="nav-cta bg-white/5 border-white/10 hover:bg-white/10 text-center" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>
              <button onClick={handleLogout} className="nav-cta bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30 w-full text-center">
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>

      {!isLoggedIn ? (
        <Link href="/login" className="nav-cta nav-cta-desktop hidden lg:inline-flex">
          Calculate BaZi Chart
        </Link>
      ) : (
        <div className="relative hidden lg:block" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`nav-cta nav-cta-desktop bg-white/5 border-white/10 hover:bg-white/10 flex items-center gap-2 transition-all ${isProfileOpen ? 'ring-2 ring-blue-500/50' : ''}`}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span>Account</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 top-full mt-3 w-48 rounded-xl border border-white/10 bg-[#020617]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-1.5 flex flex-col transition-all duration-200 origin-top-right ${isProfileOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}
          >
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              onClick={() => setIsProfileOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </Link>
            <div className="h-px bg-white/10 my-1 mx-2" />
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-sky-200 hover:bg-slate-500/20 transition-colors text-left flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      )}

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
