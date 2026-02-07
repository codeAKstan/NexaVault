'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface PaymentMethod {
  _id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  charges: number;
  chargesType: 'percentage' | 'fixed';
  imageUrl: string;
}

const WithdrawPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const res = await fetch('/api/payment-methods');
      const data = await res.json();
      if (res.ok) {
        setMethods(data.methods);
      }
    } catch (error) {
      console.error('Failed to fetch methods', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (user?.kycStatus !== 'verified') {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw</h1></div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verification Required</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    To comply with financial regulations and ensure the security of our platform, you must complete the KYC verification process before requesting a withdrawal.
                </p>
                <button 
                    onClick={() => router.push('/dashboard/profile')}
                    className="bg-amber-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                >
                    Complete Verification
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw from your account.</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Place a withdrawal request using any of the payment method below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading withdrawal methods...</div>
        ) : methods.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No withdrawal methods available.</div>
        ) : (
            methods.map((method) => (
            <div key={method._id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-4">{method.name}</h3>
                
                <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${method.maxAmount.toLocaleString()}</span>
                <span className="text-gray-400 font-medium ml-2">Max</span>
                </div>

                <div className="w-full space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                        <span className="text-gray-600 dark:text-gray-300">Minimum amount: ${method.minAmount}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                        <span className="text-gray-600 dark:text-gray-300">Charge Type: {method.chargesType}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                        <span className="text-gray-600 dark:text-gray-300">Charges Amount: {method.charges}{method.chargesType === 'percentage' ? '%' : '$'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-gray-900 dark:text-white text-base">check</span>
                        <span className="text-gray-600 dark:text-gray-300">Duration: Instant</span>
                    </div>
                </div>

                <button onClick={() => router.push(`/dashboard/withdraw/${method._id}`)} className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 block">
                Select this method
                </button>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default WithdrawPage;
