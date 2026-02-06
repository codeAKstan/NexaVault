'use client';

import React, { useState } from 'react';

const PaymentMethodsPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [methodType, setMethodType] = useState('card');

  // Mock data for saved methods
  const [savedMethods, setSavedMethods] = useState([
    {
      id: 1,
      type: 'card',
      title: 'Visa ending in 4242',
      subtitle: 'Expiry 12/24',
      icon: 'credit_card',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'crypto',
      title: 'USDT (TRC20)',
      subtitle: 'T9...3jK',
      icon: 'currency_bitcoin',
      color: 'bg-emerald-500'
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your linked payment methods for deposits and withdrawals.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Method
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Add New Payment Method</h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Method Type</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setMethodType('card')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                  methodType === 'card' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span>
                Credit/Debit Card
              </button>
              <button 
                onClick={() => setMethodType('crypto')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                  methodType === 'crypto' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined">currency_bitcoin</span>
                Crypto Wallet
              </button>
              <button 
                onClick={() => setMethodType('bank')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                  methodType === 'bank' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined">account_balance</span>
                Bank Transfer
              </button>
            </div>
          </div>

          <form className="space-y-6">
            {methodType === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
              </>
            )}

            {methodType === 'crypto' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Network</label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all">
                    <option>USDT (TRC20)</option>
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ERC20)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wallet Address</label>
                  <input type="text" placeholder="Enter your wallet address" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wallet Label (Optional)</label>
                  <input type="text" placeholder="e.g. My Binance Wallet" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
              </>
            )}

            {methodType === 'bank' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank Name</label>
                  <input type="text" placeholder="Enter bank name" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Number / IBAN</label>
                  <input type="text" placeholder="Enter account number" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SWIFT / BIC Code</label>
                  <input type="text" placeholder="Enter SWIFT code" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Holder Name</label>
                  <input type="text" placeholder="Enter account holder name" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                </div>
              </>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Save Method
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Saved Methods</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedMethods.map((method) => (
            <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-center justify-between hover:border-emerald-500/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${method.color} bg-opacity-10 flex items-center justify-center text-emerald-500`}>
                  <span className="material-symbols-outlined">{method.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{method.title}</h4>
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setShowAddForm(true)}
            className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all cursor-pointer min-h-[100px]"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="font-bold text-sm">Add New Method</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
