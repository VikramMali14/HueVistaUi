'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { label: 'How it works', href: '/home#how-it-works' },
  { label: 'Features', href: '/home#features' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className={cn('font-bold text-lg transition-colors', scrolled ? 'text-stone-900' : 'text-white')}>
            HueVista
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-sm font-medium transition-colors hover:opacity-80',
                scrolled ? 'text-stone-600' : 'text-white/90'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              'text-sm font-medium transition-colors',
              scrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/90 hover:text-white'
            )}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Get started free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className={cn('md:hidden', scrolled ? 'text-stone-800' : 'text-white')}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-stone-700 font-medium py-2 hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" className="text-center py-2 text-stone-700 font-medium">
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-center py-2.5 rounded-lg bg-brand-600 text-white font-semibold"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
