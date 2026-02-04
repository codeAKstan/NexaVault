import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isMarkets = location.pathname === '/markets';
  const isVaults = location.pathname === '/vaults';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">shield_with_heart</span>
              </div>
              <span className="text-2xl font-display font-bold text-secondary dark:text-white">NexaVault</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/markets"
                className={`${isMarkets ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'} px-3 py-2 text-sm font-medium`}
              >
                Markets
              </Link>
              <Link
                to="/vaults"
                className={`${isVaults ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'} px-3 py-2 text-sm font-medium`}
              >
                Vaults
              </Link>
              <a className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium" href="#">Green Assets</a>
              <a className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 text-sm font-medium" href="#">Governance</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400"
            >
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            {isMarkets ? (
              <a className="hidden sm:inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-primary hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20" href="#">
                Connect Wallet
              </a>
            ) : (
              <Link to="/signup" className="hidden sm:inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-primary hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
