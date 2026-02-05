'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isMarkets = pathname === '/markets';
  const isVaults = pathname === '/vaults';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">shield_with_heart</span>
              </div>
              <span className="text-2xl font-display font-bold text-secondary dark:text-white">NexaVault</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/"
                className={`${pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'} px-3 py-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/markets"
                className={`${isMarkets ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'} px-3 py-2 text-sm font-medium`}
              >
                Markets
              </Link>
              <Link
                href="/vaults"
                className={`${isVaults ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'} px-3 py-2 text-sm font-medium`}
              >
                Vaults
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium">About Us</Link>
              <Link href="/support" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium">Support</Link>
              <Link href="/governance" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium">Governance</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400"
            >
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <Link href="/signup" className="hidden sm:inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-primary hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20">
              Get Started
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 md:hidden"
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              href="/markets"
              onClick={() => setIsMenuOpen(false)}
              className={`${isMarkets ? 'text-primary bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-600 dark:text-gray-300'} block px-3 py-3 rounded-xl text-base font-medium`}
            >
              Markets
            </Link>
            <Link
              href="/vaults"
              onClick={() => setIsMenuOpen(false)}
              className={`${isVaults ? 'text-primary bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-600 dark:text-gray-300'} block px-3 py-3 rounded-xl text-base font-medium`}
            >
              Vaults
            </Link>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 block px-3 py-3 rounded-xl text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Green Assets
            </a>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 block px-3 py-3 rounded-xl text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/support"
              className="text-gray-600 dark:text-gray-300 block px-3 py-3 rounded-xl text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/governance"
              className="text-gray-600 dark:text-gray-300 block px-3 py-3 rounded-xl text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Governance
            </Link>
            <div className="pt-4 px-3">
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-primary hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
