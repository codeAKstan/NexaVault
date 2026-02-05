'use client';

import React, { useState } from 'react';

const HistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal' | 'others'>('deposit');

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: '$1000',
      mode: 'Express Deposit',
      status: 'Processed',
      date: 'Sun, Dec 21, 2025 6:15 PM'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account transactions history</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">All your transaction history in one place.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-1">
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
              activeTab === 'deposit' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="font-bold">Deposit</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('withdrawal')}
            className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
              activeTab === 'withdrawal' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="font-bold">Withdrawal</span>
          </button>

          <button 
            onClick={() => setActiveTab('others')}
            className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
              activeTab === 'others' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">hourglass_empty</span>
            <span className="font-bold">Others</span>
          </button>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-4 gap-4 px-6 mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
          <div>Amount</div>
          <div>Payment mode</div>
          <div>Status</div>
          <div className="text-right">Date created</div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {transactions.filter(t => t.type === activeTab).map((tx) => (
            <div key={tx.id} className="grid grid-cols-4 gap-4 px-6 py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors items-center border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
              <div className="font-bold text-gray-900 dark:text-white">{tx.amount}</div>
              <div className="text-gray-600 dark:text-gray-300">{tx.mode}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  tx.status === 'Processed' 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {tx.status}
                </span>
              </div>
              <div className="text-right text-gray-500 text-sm">{tx.date}</div>
            </div>
          ))}
          
          {transactions.filter(t => t.type === activeTab).length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-20">history</span>
              <p>No transactions found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;
