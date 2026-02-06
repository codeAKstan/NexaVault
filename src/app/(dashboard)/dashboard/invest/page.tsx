'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InvestmentPlan {
  _id: string;
  name: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  minReturn: number;
  maxReturn: number;
  giftBonus: number;
  tag: string;
  topUpInterval: string;
  topUpType: string;
  topUpAmount: number;
  duration: string;
}

const InvestPage: React.FC = () => {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [investAmounts, setInvestAmounts] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/investments/plans');
      const data = await res.json();
      if (res.ok) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (planId: string, value: string) => {
    setInvestAmounts(prev => ({ ...prev, [planId]: value }));
  };

  const handleJoinPlan = async (plan: InvestmentPlan) => {
    const amount = Number(investAmounts[plan._id]);
    
    if (!amount || amount < plan.minPrice || amount > plan.maxPrice) {
        alert(`Please enter an amount between $${plan.minPrice} and $${plan.maxPrice}`);
        return;
    }

    try {
        const res = await fetch('/api/investments/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ planId: plan._id, amount }),
        });

        const data = await res.json();

        if (res.ok) {
            setSuccessMessage(`You have successfully purchased a plan and ${plan.name} your ${plan.name} plan is now active.`);
            setInvestAmounts(prev => ({ ...prev, [plan._id]: '' })); // Reset input
            
            // Scroll to top to see message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Auto hide message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);
        } else {
            alert(data.error || 'Failed to purchase plan');
        }
    } catch (error) {
        console.error('Purchase error:', error);
        alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Get started with your investment.</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Choose From the List Below</p>
      </div>

      {successMessage && (
        <div className="bg-emerald-500 text-white p-4 rounded-xl shadow-lg flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">thumb_up</span>
            <span className="font-medium">{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading investment plans...</div>
        ) : plans.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No investment plans available at the moment.</div>
        ) : (
            plans.map((plan) => (
            <div key={plan._id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow relative overflow-hidden">
                
                {plan.tag && (
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1 rounded-full">
                        {plan.tag}
                    </div>
                )}

                <div className="mb-6">
                <p className="font-bold text-gray-900 dark:text-white mb-2">{plan.minReturn}% - {plan.maxReturn}% ROI</p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
                </div>

                <div className="w-full space-y-4 mb-8 text-sm">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    <span className="text-gray-600 dark:text-gray-300">Min: ${plan.minPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    <span className="text-gray-600 dark:text-gray-300">Max: ${plan.maxPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    <span className="text-gray-600 dark:text-gray-300">
                        Top Up: {plan.topUpAmount}{plan.topUpType === 'Percentage' ? '%' : '$'} {plan.topUpInterval}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    <span className="text-gray-600 dark:text-gray-300">Gift Bonus: ${plan.giftBonus}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                    <span className="text-gray-600 dark:text-gray-300">Duration: {plan.duration}</span>
                </div>
                </div>

                <div className="w-full mt-auto space-y-4">
                <div className="relative">
                    <input 
                    type="number" 
                    placeholder={`$ ${plan.minPrice} - ${plan.maxPrice}`}
                    value={investAmounts[plan._id] || ''}
                    onChange={(e) => handleAmountChange(plan._id, e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-center text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                <button 
                    onClick={() => handleJoinPlan(plan)}
                    className="w-full bg-emerald-500 text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                    Join plan
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default InvestPage;
