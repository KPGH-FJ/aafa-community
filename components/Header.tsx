'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navItems } from '@/data/nav';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-md border-b border-[#E5E2DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-[#2C2C2C]">AAFA</span>
            <span className="hidden sm:inline text-xs text-[#7A7670] tracking-wider">ANTI-AI FOR AGI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#5C5852] hover:text-[#C9A89A] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#C9A89A] rounded-full hover:bg-[#B89789] transition-colors duration-200"
            >
              加入社区
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#5C5852] hover:text-[#C9A89A]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#E5E2DE]">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-[#5C5852] hover:text-[#C9A89A] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/join"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#C9A89A] rounded-full hover:bg-[#B89789] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                加入社区
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
