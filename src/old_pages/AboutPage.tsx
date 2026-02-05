import React from 'react';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 sm:pt-24 lg:pt-32 bg-white dark:bg-slate-900">
        <div className="absolute inset-0 bg-[url('/aboutbg.png')] bg-cover bg-center opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="text-5xl font-display font-bold tracking-tight text-white sm:text-6xl md:text-7xl mb-6 drop-shadow-lg">
            Building the Future of <br/><span className="text-emerald-400">Sustainable Wealth</span>
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md font-medium">
            Where decentralized finance meets environmental stewardship. Empowering the next generation of impact investors.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-primary/20">
            Explore Our Impact
          </button>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Our Purpose</h2>
          <h3 className="text-4xl font-display font-bold text-secondary dark:text-white mb-8">Our Mission</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            NexaVault is dedicated to bridging the gap between high-yield decentralized finance and sustainable global growth. We empower investors to grow their wealth while fostering environmental stewardship through transparent, on-chain financial protocols.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            By leveraging blockchain technology, we ensure that every dollar invested contributes to a regenerative economy, balancing profitability with planetary health.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Core Principles</h2>
            <h3 className="text-4xl font-display font-bold text-secondary dark:text-white">Our Values</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "Complete on-chain visibility for all assets and yields. We believe trust is built through verifiable, immutable data.", icon: "visibility", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { title: "Sustainability", desc: "Prioritizing ESG-aligned strategies and carbon-neutral protocols to ensure finance serves the future of our planet.", icon: "eco", color: "text-primary", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { title: "Innovation", desc: "Pushing the boundaries of DeFi with novel algorithmic vaults that maximize returns without compromising safety.", icon: "lightbulb", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" }
            ].map((value, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 mx-auto ${value.bg} rounded-full flex items-center justify-center mb-6`}>
                  <span className={`material-symbols-outlined ${value.color} text-3xl`}>{value.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">The Team</h2>
            <h3 className="text-4xl font-display font-bold text-secondary dark:text-white">Our Leadership</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Marcus Chen", role: "CEO & Founder", image: "/Marcus.png" },
              { name: "Elena Rodriguez", role: "Chief Technology Officer", image: "/Elena.png" },
              { name: "Julian Vane", role: "Head of Sustainability", image: "/Julian.png" },
              { name: "Sarah Jenkins", role: "VP of Strategy", image: "/Jenkins.png" }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-lg font-bold text-secondary dark:text-white">{member.name}</h4>
                <p className="text-primary text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary dark:bg-slate-800 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Ready to invest in a greener future?</h2>
              <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">Join over 50,000 investors worldwide who are growing their wealth sustainably.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors">
                  Open App
                </Link>
                <Link to="/docs" className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                  View Documentation
                </Link>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
