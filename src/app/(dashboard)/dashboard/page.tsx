'use client';

import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your sustainable DeFi portfolio is performing 12% above market average.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Account Balance", value: "$24,081.00", change: "+2.4%", icon: "account_balance_wallet", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Total Yield Earned", value: "$1,281.45", change: "+$412.00", icon: "savings", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Carbon Offset", value: "12.4 Tons", sub: "Real-time", icon: "eco", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "Active Investments", value: "8 Vaults", sub: "4 Platforms", icon: "layers", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
              </div>
              {stat.change && (
                <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">trending_up</span> {stat.change}
                </span>
              )}
              {stat.sub && <span className="text-gray-400 text-xs font-medium">{stat.sub}</span>}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Portfolio Growth</h3>
              <p className="text-sm text-gray-500">Historical yield performance</p>
            </div>
            <div className="flex bg-gray-50 dark:bg-slate-800 rounded-xl p-1">
              {['1Y', '6M', '3M', '1M'].map((period, i) => (
                <button key={period} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${i === 3 ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 relative group">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,90 C10,85 20,80 30,75 C40,70 50,55 60,60 C70,65 80,45 90,30 L100,25 L100,100 L0,100 Z"
                fill="url(#gradient)"
                className="opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]"
              />
              <path
                d="M0,90 C10,85 20,80 30,75 C40,70 50,55 60,60 C70,65 80,45 90,30 L100,25"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.8"
                strokeLinecap="round"
                className="[stroke-dasharray:300] [stroke-dashoffset:300] animate-[drawPath_2s_ease-out_forwards]"
              />
            </svg>
            <style jsx>{`
              @keyframes drawPath {
                to { stroke-dashoffset: 0; }
              }
              @keyframes fadeIn {
                to { opacity: 1; }
              }
            `}</style>
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Sustainability Impact</h3>
            <div className="space-y-6">
              {[
                { label: "Renewable Energy", value: "65%", color: "bg-emerald-500" },
                { label: "Ocean Cleanup", value: "20%", color: "bg-blue-500" },
                { label: "Reforestation", value: "15%", color: "bg-green-600" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                    <span className="text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl">
            <p className="text-sm text-emerald-800 dark:text-emerald-400 leading-relaxed">
              <span className="font-bold">Next Milestone:</span> Offset another 5 tons of CO2 to unlock "Earth Guardian" badge.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Transactions</h3>
            <button className="text-sm font-bold text-primary hover:text-emerald-600">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 text-xs uppercase text-gray-500 font-bold tracking-wider">
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Asset</th>
                  <th className="px-8 py-4">Type</th>
                  <th className="px-8 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { date: "Oct 24, 2023", asset: "ETH", type: "Yield", amount: "+$124.50", icon: "currency_bitcoin", color: "bg-blue-100 text-blue-600" },
                  { date: "Oct 22, 2023", asset: "USDC", type: "Deposit", amount: "$2,500.00", icon: "attach_money", color: "bg-green-100 text-green-600" },
                  { date: "Oct 18, 2023", asset: "SOL", type: "Stake", amount: "-$450.00", icon: "token", color: "bg-purple-100 text-purple-600" },
                ].map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5 text-sm text-gray-600 dark:text-gray-400">{tx.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${tx.color} bg-opacity-20 flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-sm">{tx.icon}</span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{tx.asset}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        tx.type === 'Yield' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        tx.type === 'Deposit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-8 py-5 text-right font-bold ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Vault Alerts */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Live Vault Alerts</h3>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                 <div className="flex justify-between mb-2">
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">Sustainable Yield</span>
                    <span className="text-gray-400 text-xs">2m ago</span>
                 </div>
                 <p className="font-bold text-gray-900 dark:text-white mb-1">APY increased to 12.4%</p>
                 <p className="text-xs text-gray-500">Green Energy Fund Vault #042</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                 <div className="flex justify-between mb-2">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Governance</span>
                    <span className="text-gray-400 text-xs">1h ago</span>
                 </div>
                 <p className="font-bold text-gray-900 dark:text-white mb-1">New Proposal: Ocean Clean...</p>
                 <p className="text-xs text-gray-500">Voting ends in 24 hours</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 opacity-60">
                 <div className="flex justify-between mb-2">
                    <span className="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">New Asset</span>
                    <span className="text-gray-400 text-xs">5h ago</span>
                 </div>
                 <p className="font-bold text-gray-900 dark:text-white mb-1">Solar Farm #09 Tokenized</p>
                 <p className="text-xs text-gray-500">Available for fractional investment</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
