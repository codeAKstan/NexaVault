'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [investmentsOpen, setInvestmentsOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', icon: 'dashboard', path: '/admin/dashboard' },
    { name: 'User Management', icon: 'group', path: '/admin/users' },
    { name: 'Deposits', icon: 'account_balance_wallet', path: '/admin/deposits' },
    { name: 'Withdraws', icon: 'payments', path: '/admin/withdraws' },
    { name: 'Wallet Connects', icon: 'account_balance', path: '/admin/wallets' },
  ];

  const investmentItems = [
    { name: 'Investment Plans', path: '/admin/investments/plans' },
    { name: 'Active Investments', path: '/admin/investments/active' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div className={`w-64 bg-secondary dark:bg-slate-900 h-screen fixed left-0 top-0 flex flex-col justify-between border-r border-gray-800 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="overflow-y-auto">
          <div className="p-6 mb-6 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">shield_with_heart</span>
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">NexaVault</span>
            </Link>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => onClose()} // Close on mobile navigation
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.path
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}

            {/* Investments Dropdown */}
            <div>
              <button
                onClick={() => setInvestmentsOpen(!investmentsOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  pathname.startsWith('/admin/investments')
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">inventory_2</span>
                  <span className="text-sm">Investments</span>
                </div>
                <span className={`material-symbols-outlined text-sm transition-transform ${investmentsOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              
              {investmentsOpen && (
                <div className="mt-1 ml-4 pl-4 border-l border-gray-800 space-y-1">
                  {investmentItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      onClick={() => onClose()}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all text-sm ${
                        pathname === subItem.path
                          ? 'text-primary font-bold'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="pt-8 pb-4 px-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Administration</p>
              <Link
                href="/admin/settings"
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === '/admin/settings'
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm">Admin Settings</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="p-4 m-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Admin Status</span>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">VERIFIED</span>
          </div>
          <p className="font-bold text-white text-sm">Super Admin</p>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
