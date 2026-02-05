'use client';

import React from 'react';

const MyInvestmentsPage: React.FC = () => {
  const investments = [
    {
      id: 1,
      tier: 'Tier 1',
      amount: '$500',
      startDate: 'Sun, Dec 21, 2025 8:16 PM',
      endDate: 'Sun, Dec 28, 2025 8:16 PM',
      status: 'Active'
    },
    {
      id: 2,
      tier: 'Tier 1',
      amount: '$500',
      startDate: 'Sun, Dec 21, 2025 7:17 PM',
      endDate: 'Sun, Dec 28, 2025 7:17 PM',
      status: 'Active'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Investment plans (All)</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        
        <div className="flex justify-end mb-6">
          <div className="relative">
            <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-600 transition-colors">
              Sort
            </button>
            <div className="absolute top-0 right-16 w-48">
               <input 
                  type="text" 
                  placeholder="All" 
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  disabled
               />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {investments.map((investment) => (
            <div key={investment.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
              <div className="space-y-4 flex-1 w-full text-center md:text-left">
                <h3 className="font-bold text-gray-900 dark:text-white">{investment.tier}</h3>
                <p className="text-gray-400 text-sm">Amount - {investment.amount}</p>
              </div>

              <div className="flex-1 text-center space-y-4 w-full">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-900 dark:text-white">
                  <span>{investment.startDate}</span>
                  <span className="material-symbols-outlined text-sm text-gray-400">arrow_forward</span>
                  <span>{investment.endDate}</span>
                </div>
                <div className="flex justify-between max-w-xs mx-auto text-sm text-gray-500">
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>
              </div>

              <div className="flex-1 text-right flex items-center justify-center md:justify-end gap-12 w-full">
                <div className="text-center">
                   <p className="text-sm text-gray-500 mb-1">Status</p>
                   <span className="px-3 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-full">
                      {investment.status}
                   </span>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-emerald-500">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyInvestmentsPage;
