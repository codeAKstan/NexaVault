import React from 'react';
import Layout from '../layouts/Layout';

const GovernancePage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-slate-900/50 min-h-screen pb-20">
        <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>DAO</span>
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  <span className="text-primary font-medium">Governance Portal</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary dark:text-white">Community Governance</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                  Participate in NexaVault decisions. Your tokens represent your voice in steering sustainable capital toward real-world impact projects.
                </p>
              </div>
              <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-primary text-secondary dark:text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">add</span> Create Proposal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "YOUR VOTING POWER", value: "12,450.00", unit: "NEXA", sub: "≈ 0.045% of total supply" },
                { label: "ACTIVE PROPOSALS", value: "04", sub: "↗ High participation this week", subColor: "text-emerald-500" },
                { label: "IMPACT PROJECTS", value: "28", sub: "in 14 different countries" },
                { label: "TOTAL CO2 OFFSET", value: "14.2k", sub: "Metric tonnes per year", valueColor: "text-emerald-500" }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 tracking-wider mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className={`text-2xl font-bold ${stat.valueColor || 'text-secondary dark:text-white'}`}>{stat.value}</h3>
                    {stat.unit && <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">{stat.unit}</span>}
                  </div>
                  <p className={`text-xs ${stat.subColor || 'text-gray-500'}`}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Proposals */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-secondary dark:text-white">Active Proposals</h2>
                <button className="text-gray-500 hover:text-primary">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>

              {[
                { id: "NVP-042", status: "Active", title: "New Solar Farm Allocation - Minas Gerais, Brazil", desc: "Proposal to allocate $4.2M USD from the NexaVault Treasury to a 50MW solar farm development in Brazil. Expected annual carbon offset of 32,000 tonnes with a projected APY of 7.4% for token holders.", for: 74.2, against: 25.8, end: "2d 14h" },
                { id: "NVP-041", status: "Active", title: "Treasury Rebalancing: Increase RWA Exposure", desc: "Adjusting the portfolio target weighting for Real World Assets (RWA) from 45% to 60% of total AUM. This move aims to further reduce volatility relative to pure crypto-assets.", for: 89.1, against: 10.9, end: "5d 2h" }
              ].map((prop, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">{prop.id}</span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> {prop.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <span className="material-symbols-outlined text-sm">schedule</span> Ends in {prop.end}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-3 hover:text-primary cursor-pointer transition-colors">{prop.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {prop.desc}
                  </p>

                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span className="text-emerald-600 dark:text-emerald-400">For {prop.for}%</span>
                    <span className="text-gray-400">Against {prop.against}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6 flex">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${prop.for}%` }}></div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((avatar) => (
                        <div key={avatar} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-gray-500">
                          {avatar === 4 ? '+' : ''}
                        </div>
                      ))}
                    </div>
                    <button className="bg-secondary text-white dark:bg-white dark:text-secondary px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                      Vote Now
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 font-medium hover:border-primary hover:text-primary transition-colors">
                Load More Proposals
              </button>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-6">
              {/* Governance Health */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-emerald-500">health_and_safety</span>
                  <h3 className="font-bold text-secondary dark:text-white">Governance Health</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50">
                    <span className="text-sm text-gray-500">Quorum reached</span>
                    <span className="text-sm font-bold text-emerald-500">Yes (42.1%)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50">
                    <span className="text-sm text-gray-500">Avg. participation</span>
                    <span className="text-sm font-bold text-secondary dark:text-white">68.4%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">Voting cycle</span>
                    <span className="text-sm font-bold text-secondary dark:text-white">7 Days</span>
                  </div>
                </div>
              </div>

              {/* Recent History */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold text-secondary dark:text-white mb-6">Recent History</h3>
                <div className="space-y-6">
                  {[
                    { id: "NVP-040", status: "Passed", title: "Sustainable Supply Chain Grant", time: "Closed 2 days ago", icon: "check_circle", color: "text-emerald-500" },
                    { id: "NVP-039", status: "Rejected", title: "Protocol Fee Increase", time: "Closed 1 week ago", icon: "cancel", color: "text-red-500" },
                    { id: "NVP-038", status: "Passed", title: "Wind Farm Expansion - Scotland", time: "Closed 12 days ago", icon: "check_circle", color: "text-emerald-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`mt-1 ${item.color}`}>
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-secondary dark:text-white">{item.id} {item.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 text-sm text-emerald-500 font-bold hover:text-emerald-600">
                  View all history
                </button>
              </div>

              {/* Delegate Card */}
              <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20">
                <h3 className="font-bold text-lg mb-2">Can't vote regularly?</h3>
                <p className="text-emerald-50 text-sm mb-6 leading-relaxed">
                  Delegate your voting power to a trusted community member or professional steward to ensure your voice is heard.
                </p>
                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm">
                  Choose a Delegate
                </button>
              </div>
            </div>
          </div>

          {/* Transparency Section */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">Governance Transparency</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12">
              All decisions are recorded on-chain. We believe in radical transparency for capital that makes a difference.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "On-Chain Voting", desc: "Every vote is cryptographically verified and permanently stored on the Ethereum blockchain for public audit.", icon: "verified_user", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { title: "Open Discussion", desc: "Read full proposal details, expert reviews, and community debates on our forum before placing your vote.", icon: "forum", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                { title: "Impact Verification", desc: "Projects are monitored post-funding with real-time IoT sensors and third-party auditors to ensure results.", icon: "analytics", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" }
              ].map((feat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${feat.bg} flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined ${feat.color} text-3xl`}>{feat.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-secondary dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GovernancePage;
