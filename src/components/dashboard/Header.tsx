'use client';

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 ml-0 lg:ml-64">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-primary dark:text-gray-400 transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="hidden lg:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search markets, vaults or transactions..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 transition-colors"
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">@{user?.username || 'Username'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden">
             <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=10b981&color=fff`} alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
