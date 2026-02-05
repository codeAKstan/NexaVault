import React from 'react';
import Layout from '../layouts/Layout';

const VaultsPage: React.FC = () => {
  const vaults = [
    {
      name: "Solar Farm Alpha",
      description: "Decentralized Energy Production",
      apy: "18.4%",
      apyType: "Real-Yield",
      risk: "Low Risk",
      riskColor: "blue",
      chain: "Ethereum",
      chainIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFbC7uFFHjuOwr8toLMv7oskxeLT-C5fCncBA0OOYP-oX05OSGJlP_iVVPnjkqvaWhFaWW777V1r9_UDETFYBw6ynzA0DYSBtyxzocdiFpahTi14ABIWv2yqJqKV2xdG4RVl_YwPN_xe_lmpyqMGcj0Zo3Wf239O1R-mafqmgMvizx1C7S930iHSVeAk_OdH-XQHLFeU2d68gxL-7-Cftrz5jQWLc4elBVLnQ4sWq-5fxTTwVKdegyE0Tf1GGIpQPLKmOIn9qVrqg",
      impact: 98,
      icon: "wb_sunny",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600"
    },
    {
      name: "London PropTech II",
      description: "Commercial Real Estate RWA",
      apy: "12.2%",
      apyType: "Rent-Backed",
      risk: "Med Risk",
      riskColor: "yellow",
      chain: "Polygon",
      chainIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkfn95NGxz6lpE_ALot8oL-lxx162jzPsC5LKibuULprjjEpeF16SpFZMKJYA7ztXJ1afrKUcUABpDs3RXMyIfmf1vIqoFeYcYsRkcwVVcGzKhRY2fOOnq_Kf2hIfLtIEOYLcuNhT4DW3C45OOuGMD3fxHb6wEhOkYHups7I5Dj-iHPiSPV6MOxsDQx9FgzSK-NJThVj5Clna67kPAOlgqswdgdFxDfNMWJ2IDDqy3byXTen421hbrQlEE4iqEjMtngkKxZQNWiUw",
      impact: 84,
      icon: "apartment",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600"
    },
    {
      name: "Amazon Reforestation",
      description: "Carbon Credit Derivatives",
      apy: "24.5%",
      apyType: "Incentivized",
      risk: "High Risk",
      riskColor: "red",
      chain: "Arbitrum",
      chainIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2R3kD1zCKeQVD5jC7St11YClus2LlytPy9sG8__I4OBxYlcFjag_F1RiBm_1OVLbrLTMZmew5aUoV1UvdXfjl8ZWA48LfaYeUBx2iWrlIXhXLFLgAKLubFDC4pLK8KHiVmLmdk68gXZGP3HY9O4R696zY9fSmYWikOkiUHXEQIjK6c3fib5qOD8nHGPQCl7N9iUBZ_zJhNUPlFIGkYPicqZkNyIOn8oN7kbiXJXt-pDl4Fa7NbLpVStx76aJ4E_UURM2XHFrE3v0",
      impact: 100,
      icon: "forest",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600"
    },
    {
      name: "Hydro Harvest Pro",
      description: "Water Infrastructure Token",
      apy: "9.8%",
      apyType: "Stable",
      risk: "Low Risk",
      riskColor: "blue",
      chain: "Ethereum",
      chainIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyJ1wfvE-MUmDGVQEl5grNBdKcp8q7nyI7p97-0LMHgEIRYlzVe4fohI7cW_MfYjr2BiMfDCdeEUtL7ROArKqJAwX9r_CluQaY5cO5VOszyNvdY1HZozcBlNZDZ-vfuLvqBQrx2l_kowbrQDgwY25QW5pMkla81tefWyTgVfYujT-Mzo7lvChkCfTFWiC-EW-INQBrnbwqeGbMZsjFun6RBIQURNKPOTMN9IEscwyVsCS8ZNoq_HHUpEAigENDCYjdVEzL_DgntHY",
      impact: 92,
      icon: "water_drop",
      iconBg: "bg-slate-100 dark:bg-slate-800",
      iconColor: "text-slate-600 dark:text-slate-400"
    }
  ];

  const getRiskBadgeClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/50';
      case 'red':
        return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-900/50';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Sustainable Finance</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment Vaults</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Maximize your returns with our curated selection of tokenized real-world assets and yield-bearing protocols, all focused on long-term sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Value Locked</p>
            <div className="text-3xl font-display font-bold text-secondary dark:text-white">$142.8M</div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12.4% MoM</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Average APY</p>
            <div className="text-3xl font-display font-bold text-secondary dark:text-white">14.2%</div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Real-Yield Powered</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Carbon Offset</p>
            <div className="text-3xl font-display font-bold text-secondary dark:text-white">2.4k Tons</div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">eco</span>
              <span>Verified ESG Impact</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">All Assets</button>
              <button className="px-4 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors whitespace-nowrap">Solar Energy</button>
              <button className="px-4 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors whitespace-nowrap">Real Estate</button>
              <button className="px-4 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors whitespace-nowrap">Stablecoins</button>
            </div>
            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                placeholder="Search vaults..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Vault Name</th>
                  <th className="px-6 py-4">APY %</th>
                  <th className="px-6 py-4">Risk Level</th>
                  <th className="px-6 py-4">Chain</th>
                  <th className="px-6 py-4">Impact Score</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {vaults.map((vault, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${vault.iconBg} rounded-full flex items-center justify-center ${vault.iconColor}`}>
                          <span className="material-symbols-outlined">{vault.icon}</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{vault.name}</div>
                          <div className="text-xs text-slate-500">{vault.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-primary font-bold text-lg">{vault.apy}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{vault.apyType}</div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRiskBadgeClass(vault.riskColor)}`}>
                        {vault.risk}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <img alt={vault.chain} className="w-5 h-5 opacity-80" src={vault.chainIcon} />
                        <span className="text-sm font-medium">{vault.chain}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-500 font-bold">{vault.impact}</span>
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${vault.impact}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="bg-primary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-emerald-500/10">
                        View Vault
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 font-medium">
            <div>Showing 4 of 28 active vaults</div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VaultsPage;
