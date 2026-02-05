'use client';

import React from 'react';

const WithdrawPage: React.FC = () => {
  const withdrawalMethods = [
    {
      id: 'bitcoin',
      name: 'BITCOIN',
      maxAmount: '$999,999',
      details: [
        { label: 'Minimum amount', value: '$100' },
        { label: 'Charge Type', value: 'percentage' },
        { label: 'Charges Amount', value: '0%' },
        { label: 'Duration', value: '' },
      ],
      icon: 'currency_bitcoin',
      iconColor: 'text-orange-500',
    },
    {
      id: 'usdt',
      name: 'USDT (TRC20)',
      maxAmount: '$9,999,999',
      details: [
        { label: 'Minimum amount', value: '$100' },
        { label: 'Charge Type', value: 'percentage' },
        { label: 'Charges Amount', value: '0%' },
        { label: 'Duration', value: '' },
      ],
      icon: 'attach_money',
      iconColor: 'text-emerald-500',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw from your account.</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Place a withdrawal request using any of the payment method below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {withdrawalMethods.map((method) => (
          <div key={method.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-4">{method.name}</h3>
            
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{method.maxAmount}</span>
              <span className="text-gray-400 font-medium ml-2">Max</span>
            </div>

            <div className="w-full space-y-4 mb-8">
              {method.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                  <span className="text-gray-600 dark:text-gray-300">{detail.label}: {detail.value}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
              Select this method
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawPage;
