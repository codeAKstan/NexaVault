'use client';

import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-500">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +1.2%
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Platform TVL</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$128,492,001.40</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +84
            </span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Active Investors</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">14,208</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <span className="text-xs text-gray-400">Annual</span>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Carbon Offset</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,842.5 Tons</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-amber-100 dark:border-amber-900/30 ring-1 ring-amber-500/10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          </div>
          <p className="text-amber-600/70 dark:text-amber-500/70 text-xs font-bold uppercase tracking-wider mb-1">Pending KYC</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">248</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Platform Liquidity & Volume</h3>
              <p className="text-sm text-gray-500">24h performance across all vaults</p>
            </div>
            <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
              <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded shadow-sm">Live</button>
              <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-slate-900 dark:hover:text-white">24H</button>
              <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-slate-900 dark:hover:text-white">7D</button>
            </div>
          </div>
          
          <div className="h-64 w-full relative">
             <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                 </linearGradient>
               </defs>
               <path 
                 d="M0,40 C10,35 20,35 30,40 C40,45 45,20 50,10 C55,0 60,35 70,40 C80,45 90,10 100,25" 
                 fill="none" 
                 stroke="#10B981" 
                 strokeWidth="1.5"
                 strokeLinecap="round"
               />
               <path 
                 d="M0,40 C10,35 20,35 30,40 C40,45 45,20 50,10 C55,0 60,35 70,40 C80,45 90,10 100,25 V50 H0 Z" 
                 fill="url(#liquidityGradient)" 
                 stroke="none"
               />
             </svg>
             <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-gray-400 font-medium pt-2">
               <span>00:00</span>
               <span>06:00</span>
               <span>12:00</span>
               <span>18:00</span>
               <span>NOW</span>
             </div>
          </div>
        </div>

        {/* Project Funding */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sustainability Project Funding</h3>
          <p className="text-sm text-gray-500 mb-8">Capital allocation across global green projects</p>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-500 text-sm">forest</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Reforestation</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">$12.4M</h4>
              <div className="w-full bg-emerald-200 dark:bg-emerald-900/30 h-1.5 rounded-full mt-3">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]"></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-blue-500 text-sm">water_drop</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Ocean Cleanup</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">$8.1M</h4>
              <div className="w-full bg-blue-200 dark:bg-blue-900/30 h-1.5 rounded-full mt-3">
                <div className="bg-blue-500 h-1.5 rounded-full w-[45%]"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30">
                 <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-orange-500 text-sm">solar_power</span>
                  <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">Renewables</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">$15.8M</h4>
                <div className="w-full bg-orange-200 dark:bg-orange-900/30 h-1.5 rounded-full mt-3">
                  <div className="bg-orange-500 h-1.5 rounded-full w-[60%]"></div>
                </div>
              </div>

               <div className="flex-1 p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                 <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-purple-500 text-sm">science</span>
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Green Tech</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">$4.2M</h4>
                <div className="w-full bg-purple-200 dark:bg-purple-900/30 h-1.5 rounded-full mt-3">
                  <div className="bg-purple-500 h-1.5 rounded-full w-[25%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Activity Log */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Activity Log</h3>
            <button className="text-emerald-500 text-sm font-bold hover:underline">Download Report</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-4">User</th>
                  <th className="pb-4">Action</th>
                  <th className="pb-4">Vault/Asset</th>
                  <th className="pb-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { user: 'Jason Statham', initials: 'JS', action: 'Deposit', type: 'VAULT', asset: 'Solar Fund #02', time: '2 mins ago' },
                  { user: 'New User', initials: 'NU', icon: 'person_add', action: 'Registration', type: 'ONBOARDING', asset: 'Standard Profile', time: '14 mins ago' },
                  { user: 'Elena Marks', initials: 'EM', action: 'Withdraw', type: 'WITHDRAWAL', asset: 'ETH Liquidity Pool', time: '42 mins ago' },
                ].map((item, i) => (
                  <tr key={i}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${item.icon ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.icon ? <span className="material-symbols-outlined text-sm">{item.icon}</span> : item.initials}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{item.user}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        item.type === 'VAULT' ? 'bg-emerald-100 text-emerald-600' :
                        item.type === 'ONBOARDING' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {item.type}
                      </span>
                      <div className="text-xs font-bold text-slate-700 dark:text-gray-300 mt-1">{item.action}</div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{item.asset}</td>
                    <td className="py-4 text-right text-xs text-gray-400 font-medium">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Health</h3>
            <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">Operational</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-emerald-500">hub</span>
                 <span className="font-bold text-slate-900 dark:text-white text-sm">Mainnet Nodes</span>
               </div>
               <span className="text-emerald-500 font-bold text-sm">99.9%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-amber-500">verified</span>
                 <span className="font-bold text-slate-900 dark:text-white text-sm">Contract Audit</span>
               </div>
               <span className="text-amber-600 font-bold text-xs uppercase">Certified</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-emerald-500">speed</span>
                 <span className="font-bold text-slate-900 dark:text-white text-sm">API Latency</span>
               </div>
               <span className="text-emerald-500 font-bold text-sm">24ms</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Security Alerts</p>
            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-start gap-3">
               <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
               <div>
                 <h4 className="font-bold text-red-600 dark:text-red-400 text-sm">Failed Admin Login</h4>
                 <p className="text-red-500/80 text-xs mt-1">IP 192.168.1.42 attempted access 3 times.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
