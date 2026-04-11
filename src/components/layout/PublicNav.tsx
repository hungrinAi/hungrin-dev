'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { Logo } from '../brand';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { label: 'Features',     href: '/#features' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Onboarding',   href: '/onboarding' },
  { label: 'Pricing',      href: '/pricing' },
];

interface PublicNavProps {
  /** Page-specific links to merge in (e.g. for Demo or Pricing pages) */
  extraLinks?: { label: string; href: string }[];
}

export function PublicNav({ extraLinks }: PublicNavProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('hungrinLoggedIn') === 'true');
    }
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const dashboardHref = loggedIn ? '/dashboard' : '/login';
  const allLinks = [...NAV_LINKS, ...(extraLinks ?? [])];

  return (
    <div ref={menuRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-light shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {allLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="relative px-4 py-2 text-sm font-semibold text-text-mid hover:text-g-dark transition-colors rounded-lg hover:bg-g-faint group"
            >
              {l.label}
              <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-g-dark rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop CTA */}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex gap-1.5 font-bold"
            onClick={() => router.push(dashboardHref)}
          >
            My Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-g-faint hover:bg-g-pale text-text-mid hover:text-g-dark transition-all active:scale-95"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen
              ? <X className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-border-light px-4 py-3 space-y-1 shadow-xl">
          {allLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-text-dark hover:bg-g-faint hover:text-g-dark transition-colors group"
            >
              {l.label}
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-g-dark transition-colors" />
            </Link>
          ))}
          <div className="pt-2 pb-1 border-t border-border-light mt-2 space-y-2">
            <Button
              className="w-full gap-2 justify-center"
              onClick={() => { router.push(dashboardHref); setMenuOpen(false); }}
            >
              My Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            <Link
              href="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-g-dark hover:underline"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
