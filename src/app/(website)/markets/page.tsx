'use client';

import React from 'react';
import Link from 'next/link';

export default function MarketsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-secondary dark:text-white mb-2">Market Overview</h1>
            <p className="text-gray-500 dark:text-gray-400">Track and manage your sustainable DeFi and RWA investments.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">24h Volume</p>
              <p className="text-xl font-bold text-secondary dark:text-white">$124.5M <span className="text-emerald-500 text-sm font-normal">+8.2%</span></p>
            </div>
            <div className="text-right border-l border-gray-200 dark:border-gray-800 pl-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Ecosystem TVL</p>
              <p className="text-xl font-bold text-secondary dark:text-white">$1.82B <span className="text-emerald-500 text-sm font-normal">+3.4%</span></p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">solar_power</span>
                </div>
                <div>
                  <h3 className="font-bold">Solar Yield Plus</h3>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Trending RWA</p>
                </div>
              </div>
              <span className="text-emerald-500 font-bold">14.2% APY</span>
            </div>
            <div className="h-16 flex items-end gap-1 mb-4">
              {[40, 60, 55, 75, 90, 85, 100].map((h, i) => (
                <div key={i} className={`flex-1 ${i >= 5 ? 'bg-primary' : 'bg-emerald-100 dark:bg-emerald-900/30'} rounded-t-sm`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Last 7 Days</span>
              <span className="text-primary font-medium">Top Performer</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500">waves</span>
                </div>
                <div>
                  <h3 className="font-bold">USDC Stable Max</h3>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Top Liquidity</p>
                </div>
              </div>
              <span className="text-blue-500 font-bold">8.4% APY</span>
            </div>
            <div className="h-16 flex items-end gap-1 mb-4">
              {[80, 85, 82, 88, 86, 92, 95].map((h, i) => (
                <div key={i} className={`flex-1 ${i >= 5 ? 'bg-blue-500' : 'bg-blue-100 dark:bg-blue-900/30'} rounded-t-sm`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Stability Index</span>
              <span className="text-blue-500 font-medium">99.8 Score</span>
            </div>
          </div>

          <div className="bg-secondary text-white p-6 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Carbon Neutral Offset</h3>
              <p className="text-3xl font-bold">248,502 <span className="text-sm font-medium text-primary">Tons</span></p>
              <p className="text-xs text-gray-500 mt-1">Cumulative impact since platform genesis</p>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">verified</span>
              <span className="text-xs font-semibold">Audited by Quantstamp & BlockSec</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">eco</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 w-full lg:max-w-md">
              <span className="material-symbols-outlined text-gray-400">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-400" placeholder="Search markets, assets or categories..." type="text" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-5 py-2 rounded-full bg-secondary text-white dark:bg-white dark:text-secondary text-sm font-bold">All Assets</button>
              <button className="px-5 py-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">DeFi</button>
              <button className="px-5 py-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">RWA</button>
              <button className="px-5 py-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">Renewables</button>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Filters
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/30 text-gray-500 dark:text-gray-400">
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">Asset</th>
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">Price/Value</th>
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">24h Change</th>
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">24h Volume</th>
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">TVL</th>
                  <th className="px-8 py-4 font-semibold text-xs uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { name: "SolarFarm #012", type: "Renewable RWA", price: "$1,452.80", change: "+4.2%", vol: "$842,000", tvl: "$12.4M", icon: "solar_power", path: "M0 35 Q10 32, 20 30 T40 25 T60 28 T80 15 T100 5", stroke: "#10b981", action: "Invest",
                    iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-500" },
                  { name: "Eth Liquidity Alpha", type: "DeFi Strategy", price: "$2,841.12", change: "-1.8%", vol: "$42.1M", tvl: "$158.4M", icon: "token", path: "M0 5 Q10 8, 20 12 T40 18 T60 15 T80 25 T100 35", stroke: "#ef4444", action: "Trade",
                    iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-500" },
                  { name: "Atlantic Wind III", type: "Infrastructure RWA", price: "$105.42", change: "+0.5%", vol: "$184k", tvl: "$85.2M", icon: "wind_power", path: "M0 25 Q10 24, 20 25 T40 23 T60 22 T80 21 T100 20", stroke: "#10b981", action: "Invest",
                    iconBg: "bg-amber-100 dark:bg-amber-900/30", iconColor: "text-amber-500" },
                  { name: "Green Estate Fund", type: "Property RWA", price: "$4,281.00", change: "+1.2%", vol: "$1.2M", tvl: "$42.8M", icon: "apartment", path: "M0 30 Q10 28, 20 25 T40 22 T60 24 T80 20 T100 15", stroke: "#10b981", action: "Invest",
                    iconBg: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-500" }
                ].map((asset, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${asset.iconBg} flex items-center justify-center`}>
                          <span className={`material-symbols-outlined ${asset.iconColor}`}>{asset.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold">{asset.name}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-tighter">{asset.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5"><p className="font-bold">{asset.price}</p></td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <span className={`${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'} font-semibold`}>{asset.change}</span>
                        <svg className="w-20 h-8 sparkline" viewBox="0 0 100 40">
                          <path d={asset.path} fill="none" stroke={asset.stroke}></path>
                        </svg>
                      </div>
                    </td>
                    <td className="px-8 py-5"><p className="text-sm font-medium">{asset.vol}</p></td>
                    <td className="px-8 py-5"><p className="text-sm font-medium">{asset.tvl}</p></td>
                    <td className="px-8 py-5 text-right">
                      <Link href="/login" className="inline-block bg-secondary text-white dark:bg-white dark:text-secondary px-6 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform">{asset.action}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-secondary dark:text-white">1-4</span> of <span className="font-semibold text-secondary dark:text-white">52</span> assets</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">1</button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">3</button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-6">Explore by Asset Class</h2>
          <div className="space-y-4">
            <div className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">energy_savings_leaf</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Renewable Energy</h4>
                  <p className="text-gray-500 text-sm">Fractionalized income from solar farms, wind turbines, and hydro projects. Stable, long-term yields.</p>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 shrink-0">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Institutional DeFi</h4>
                  <p className="text-gray-500 text-sm">High-yield strategies across blue-chip protocols with automated risk management and delta-neutral options.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-slate-800 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6">PLATFORM STATS</div>
            <h3 className="text-4xl font-display font-bold text-secondary dark:text-white mb-8">Built for transparency</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-primary">100%</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">On-chain Proof of Reserves</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary dark:text-white">2.4s</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">Avg. Settlement Time</p>
              </div>
            </div>
            <button className="mt-10 flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
              View Technical Audit Reports <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
