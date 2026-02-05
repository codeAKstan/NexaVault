'use client';

import React, { useState } from 'react';

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'bitcoin' | 'usdt' | null>(null);

  const paymentMethods = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      description: 'Pay via Bitcoin',
      icon: 'currency_bitcoin',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-100',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg'
    },
    {
      id: 'usdt',
      name: 'USDT (TRC20)',
      description: 'Pay via USDT (TRC20)',
      icon: 'attach_money',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-100',
      logo: 'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deposit into your account</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Enter Amount</label>
          <div className="relative">
             <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-30">
                <span className="material-symbols-outlined text-sm">unfold_more</span>
             </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Choose Payment Method from the list below</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {paymentMethods.map((method) => (
                <div 
                   key={method.id}
                   onClick={() => setSelectedMethod(method.id as 'bitcoin' | 'usdt')}
                   className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                      selectedMethod === method.id 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                      : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                   }`}
                >
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden p-2">
                        {/* Placeholder for actual logos, using icons for now if image fails */}
                        <div className="w-full h-full relative">
                           <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                           <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <span className={`material-symbols-outlined text-[10px] ${method.iconColor}`}>{method.icon}</span>
                           </div>
                        </div>
                      </div>
                   </div>
                   <h3 className="font-bold text-gray-900 dark:text-white">{method.name}</h3>
                   <p className="text-xs text-gray-400">{method.description}</p>
                </div>
             ))}
          </div>
        </div>

        <button 
          className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || !selectedMethod}
        >
          Proceed to Payment
        </button>

        <div className="mt-8">
           <button className="text-emerald-500 text-sm font-medium hover:text-emerald-600 hover:underline">
              View deposit history
           </button>
        </div>

      </div>
    </div>
  );
};

export default DepositPage;
