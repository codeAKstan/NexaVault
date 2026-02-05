'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('Investments');

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Deposit', icon: 'account_balance', path: '/dashboard/deposit' },
    { name: 'Withdraw', icon: 'payments', path: '/dashboard/withdraw' },
    { 
      name: 'Investments', 
      icon: 'trending_up', 
      path: '#',
      submenu: [
        { name: 'Invest', path: '/dashboard/invest' },
        { name: 'My investments', path: '/dashboard/my-investments' }
      ]
    },
    { name: 'Transaction History', icon: 'history', path: '/dashboard/history' },
  ];

  return (
    <aside className="w-64 bg-secondary text-white hidden lg:flex flex-col fixed h-full z-20">
      <div className="h-20 flex items-center px-8 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">shield_with_heart</span>
          </div>
          <span className="text-xl font-display font-bold">NexaVault</span>
        </Link>
      </div>

      <div className="p-4 space-y-2 mt-4 flex-grow">
        {menuItems.map((item) => {
          if (item.submenu) {
            const isSubmenuOpen = openSubmenu === item.name;
            const isChildActive = item.submenu.some(sub => pathname === sub.path);
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isChildActive || isSubmenuOpen
                      ? 'text-emerald-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <span className={`material-symbols-outlined text-sm transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                {isSubmenuOpen && (
                  <div className="ml-4 pl-4 border-l border-gray-700 space-y-1 mt-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                          pathname === sub.path
                            ? 'text-white font-medium'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4">
        <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Account</p>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-gray-400 transition-all mb-4"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium text-sm">Log Out</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all text-emerald-400 border border-gray-700">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-medium text-sm">Connect Wallet</span>
        </button>
      </div>
      
      <div className="p-4 mt-auto border-t border-gray-800">
         <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
               <span className="text-xs text-gray-400">Sustainable Tier</span>
               <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase">Active</span>
            </div>
            <p className="font-bold text-white text-sm">Green Pro</p>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
