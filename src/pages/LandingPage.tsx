import React from 'react';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <header className="relative overflow-hidden pt-16 pb-24 sm:pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-6">
                <span className="flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                DeFi Reimagined for Sustainability
              </div>
              <h1 className="text-5xl font-display font-bold tracking-tight text-secondary dark:text-white sm:text-6xl md:text-7xl">
                Empowering a <span className="gradient-text">decentralized future</span> of wealth.
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Securely invest in tokenized real-world assets and high-yield DeFi vaults. NexaVault bridges traditional finance with blockchain sustainability.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link to="/signup" className="bg-secondary text-white dark:bg-white dark:text-secondary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  Get Started <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link to="/markets" className="bg-white dark:bg-slate-800 text-secondary dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  Explore Assets
                </Link>
              </div>
            </div>
            <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative w-full">
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="glass-card p-6 rounded-3xl shadow-xl transform hover:-translate-y-2 transition-transform">
                    <span className="material-symbols-outlined text-primary text-4xl mb-4">account_balance_wallet</span>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Value Locked</h3>
                    <p className="text-3xl font-bold mt-1">$428.5M</p>
                    <div className="mt-2 text-emerald-500 text-sm font-medium flex items-center">
                      <span className="material-symbols-outlined text-sm">trending_up</span> +12.5%
                    </div>
                  </div>
                  <div className="glass-card p-6 rounded-3xl shadow-xl transform translate-y-12 hover:-translate-y-2 transition-all">
                    <span className="material-symbols-outlined text-accent text-4xl mb-4">eco</span>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Carbon Offset</h3>
                    <p className="text-3xl font-bold mt-1">12.4k Tons</p>
                    <div className="mt-2 text-primary text-sm font-medium">Sustainable Growth</div>
                  </div>
                  <div className="glass-card p-6 rounded-3xl shadow-xl transform -translate-y-8 hover:-translate-y-12 transition-all">
                    <span className="material-symbols-outlined text-blue-500 text-4xl mb-4">rocket_launch</span>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. APY</h3>
                    <p className="text-3xl font-bold mt-1">18.2%</p>
                    <div className="mt-2 text-emerald-500 text-sm font-medium">High Yield</div>
                  </div>
                  <div className="glass-card p-6 rounded-3xl shadow-xl transform translate-y-4 hover:-translate-y-2 transition-all">
                    <span className="material-symbols-outlined text-purple-500 text-4xl mb-4">public</span>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Nodes</h3>
                    <p className="text-3xl font-bold mt-1">2,841</p>
                    <div className="mt-2 text-gray-500 text-sm">Global Network</div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12 bg-white/50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">Integrated with Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">currency_bitcoin</span>
              <span className="font-bold text-xl">Bitcoin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">token</span>
              <span className="font-bold text-xl">Ethereum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">layers</span>
              <span className="font-bold text-xl">Polygon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">cloud</span>
              <span className="font-bold text-xl">Avalanche</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">hub</span>
              <span className="font-bold text-xl">Cosmos</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Our Services</h2>
            <h3 className="text-4xl font-display font-bold text-secondary dark:text-white mb-6">Invest in the assets of tomorrow</h3>
            <p className="text-gray-600 dark:text-gray-400">Maximize your returns through curated DeFi strategies and fractionalized real-world assets that make a positive impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "DeFi Yield Vaults", desc: "Automated yield farming across multiple chains. We find the best risk-adjusted returns for your stablecoins.", icon: "account_tree",
                bgColor: "bg-emerald-50 dark:bg-emerald-900/20", textColor: "text-emerald-500" },
              { title: "Green Tokenization", desc: "Fractionalized ownership of solar farms and wind energy projects. Earn dividends while saving the planet.", icon: "solar_power",
                bgColor: "bg-blue-50 dark:bg-blue-900/20", textColor: "text-blue-500" },
              { title: "RWA Assurance", desc: "Every real-world asset is backed by legal documentation and physical audits verified on-chain via zk-proofs.", icon: "verified_user",
                bgColor: "bg-amber-50 dark:bg-amber-900/20", textColor: "text-amber-500" }
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${service.textColor} text-3xl`}>{service.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
                <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all" href="#">Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Real-time Performance</h2>
              <h3 className="text-4xl font-display font-bold text-secondary dark:text-white">Live Vault Performance</h3>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 font-medium text-sm">All Assets</button>
              <button className="px-6 py-2 rounded-full bg-primary text-white font-medium text-sm">Sustainability</button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="px-8 py-5 font-semibold text-sm">Vault Name</th>
                    <th className="px-8 py-5 font-semibold text-sm">Category</th>
                    <th className="px-8 py-5 font-semibold text-sm">APY</th>
                    <th className="px-8 py-5 font-semibold text-sm">Risk Score</th>
                    <th className="px-8 py-5 font-semibold text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { name: "Solar Harvest II", cat: "Renewables", apy: "12.4%", icon: "solar_power", risk: 2,
                      iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-500",
                      badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
                    { name: "USDC Alpha Vault", cat: "Stablecoins", apy: "18.2%", icon: "waves", risk: 3,
                      iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-500",
                      badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
                    { name: "Eth-Eco Property", cat: "Real Estate", apy: "9.5%", icon: "apartment", risk: 1,
                      iconBg: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-500",
                      badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" }
                  ].map((vault, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${vault.iconColor}`}>{vault.icon}</span>
                          </div>
                          <div>
                            <p className="font-bold">{vault.name}</p>
                            <p className="text-xs text-gray-500">Real World Asset</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 ${vault.badgeClass} rounded-full text-xs font-bold`}>{vault.cat}</span>
                      </td>
                      <td className="px-8 py-6 font-bold text-emerald-500">{vault.apy}</td>
                      <td className="px-8 py-6">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((s) => (
                            <div key={s} className={`w-3 h-1.5 rounded-full ${s <= vault.risk ? (vault.risk >= 3 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="bg-secondary text-white dark:bg-white dark:text-secondary px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">Invest</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button className="text-gray-500 font-semibold flex items-center gap-2 hover:text-primary transition-colors">
              View all 14 available vaults <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Seamless Experience</h2>
              <h3 className="text-4xl font-display font-bold text-secondary dark:text-white mb-8">Start your sustainable wealth journey in 3 steps</h3>
              <div className="space-y-10">
                {[
                  { step: 1, title: "Connect your Wallet", desc: "Securely link your MetaMask, Phantom or Ledger. We never store your private keys.", color: "bg-secondary" },
                  { step: 2, title: "Select a Strategy", desc: "Choose from DeFi yield farming or tokenized green assets based on your risk profile.", color: "bg-primary" },
                  { step: 3, title: "Earn & Track", desc: "Watch your rewards accrue in real-time. Withdraw your capital and profits anytime.", color: "bg-accent text-secondary" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${item.color} ${!item.color.includes('text-') ? 'text-white' : ''} flex items-center justify-center font-bold text-xl`}>{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-tr from-primary to-blue-500 rounded-[3rem] p-1 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 w-full h-full rounded-[2.8rem] p-8 flex flex-col justify-center items-center text-center">
                  <div className="mb-8 p-6 bg-gray-50 dark:bg-slate-800 rounded-3xl">
                    <span className="material-symbols-outlined text-8xl text-primary animate-pulse">payments</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">Yields Paid Daily</p>
                  <p className="text-gray-500">Join 250k+ users already earning with NexaVault.</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-primary font-bold text-sm uppercase tracking-widest mb-16">Trusted by the community</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Marcus Chen", role: "Early Adopter & ESG Investor", quote: "NexaVault changed how I think about crypto. It's not just about speculation anymore; I can actually see the real-world impact of my investments in green energy.", color: "from-primary to-blue-500" },
              { name: "Sarah Williams", role: "Institutional Portfolio Manager", quote: "The interface is miles ahead of any other DeFi protocol I've used. Professional, secure, and transparent. The RWA verification process is industry-leading.", color: "from-purple-500 to-pink-500" }
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
                <span className="material-symbols-outlined text-primary/20 text-7xl absolute top-6 right-8">format_quote</span>
                <div className="relative">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color}`}></div>
                    <div>
                      <h5 className="font-bold">{t.name}</h5>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
