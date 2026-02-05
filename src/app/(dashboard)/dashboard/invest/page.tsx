'use client';

import React from 'react';

const InvestPage: React.FC = () => {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1',
      roi: '0.9 % ROI',
      min: 500,
      max: 4999,
      daily: '0.9%',
      duration: '7 Days',
    },
    {
      id: 2,
      name: 'Tier 2',
      roi: '1.3 % ROI',
      min: 5000,
      max: 29999,
      daily: '1.3%',
      duration: '7 Days',
    },
    {
      id: 3,
      name: 'Tier 3',
      roi: '1.56 % ROI',
      min: 30000,
      max: 49999,
      daily: '1.56%',
      duration: '7 Days',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Get started with your investment.</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Choose From the List Below</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow relative overflow-hidden">
            
            <div className="mb-6">
              <p className="font-bold text-gray-900 dark:text-white mb-2">{tier.roi}</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{tier.name}</h2>
            </div>

            <div className="w-full space-y-4 mb-8 text-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                <span className="text-gray-600 dark:text-gray-300">Minimum amount: ${tier.min.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                <span className="text-gray-600 dark:text-gray-300">Maximum amount: ${tier.max.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                <span className="text-gray-600 dark:text-gray-300">{tier.daily} Daily for {tier.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                <span className="text-gray-600 dark:text-gray-300">Charges Amount:</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                <span className="text-gray-600 dark:text-gray-300">Duration: {tier.duration}</span>
              </div>
            </div>

            <div className="w-full mt-auto space-y-4">
              <div className="relative">
                <input 
                  type="number" 
                  placeholder={`$ ${tier.min} - ${tier.max}`}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-center text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-30 pointer-events-none">
                  <span className="material-symbols-outlined text-xs">unfold_more</span>
                </div>
              </div>

              <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                Join plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestPage;
