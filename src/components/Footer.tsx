'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-gray-800">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">shield_with_heart</span>
              </div>
              <span className="text-2xl font-display font-bold">NexaVault</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm">
              Leading the transition to a sustainable, decentralized economy by tokenizing the assets that matter for the future of our planet.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">groups</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h6 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Platform</h6>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">All Vaults</a></li>
              <li><a className="hover:text-white transition-colors" href="#">RWA Hub</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Yield Farming</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Staking</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h6 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Governance</h6>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">DAO Forum</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Voters</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Proposals</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Grants</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h6 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Join the Newsletter</h6>
            <p className="text-gray-400 text-sm mb-6">Get the latest on new vault launches and green energy market updates.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="bg-gray-800 border-none rounded-lg px-4 py-2 flex-grow focus:ring-2 focus:ring-primary text-sm"
                placeholder="Your email address"
                type="email"
              />
              <button
                className="bg-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-600 transition-colors"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2024 NexaVault Protocol. Built with care for a greener future.</p>
          <div className="flex gap-8 text-sm text-gray-500">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
            <a className="hover:text-white" href="#">Audit Reports</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
