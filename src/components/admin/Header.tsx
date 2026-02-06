'use client';

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const AdminHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-xl">search</span>
          <input
            type="text"
            placeholder="Global admin search (Users, TXIDs, Contracts)..."
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-xl">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        
        <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:text-primary transition-colors relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">Admin Panel</p>
            <p className="text-xs text-gray-400">ID: NV-0882</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center overflow-hidden border-2 border-emerald-500/20">
             <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
               alt="Admin"
               className="w-full h-full object-cover" 
             />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
