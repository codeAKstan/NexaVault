'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface PaymentMethod {
  _id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  charges: number;
  chargesType: 'percentage' | 'fixed';
  imageUrl: string;
}

const WithdrawalDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (params.methodId) {
      fetchMethodDetails(params.methodId as string);
    }
  }, [params.methodId]);

  const fetchMethodDetails = async (id: string) => {
    try {
      // We can reuse the admin API or create a public one. 
      // For now, let's assume we can fetch all and filter, or fetch specific.
      // Ideally create /api/payment-methods/[id] public endpoint.
      // Reusing the public list endpoint for now and filtering client side if needed, 
      // but better to fetch single. Let's use the list endpoint we likely have or will need.
      // Actually, we don't have a public single fetch yet. Let's fetch all public methods and find one.
      const res = await fetch('/api/payment-methods'); // Assuming we have this or similar
      const data = await res.json();
      if (res.ok) {
        const found = data.methods.find((m: any) => m._id === id);
        if (found) setMethod(found);
        else router.push('/dashboard/withdraw');
      }
    } catch (error) {
      console.error('Failed to fetch method', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          methodId: method._id,
          amount: Number(amount),
          address
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Withdrawal request submitted successfully');
        router.push('/dashboard/history');
      } else {
        alert(data.error || 'Failed to submit withdrawal');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!method) return <div className="text-center py-12">Method not found</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complete withdrawal request</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
            {method.imageUrl ? (
                <img src={method.imageUrl} alt={method.name} className="w-12 h-12 object-contain" />
            ) : (
                <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
            )}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{method.name}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Enter Amount to withdraw($)</label>
                <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Min: ${method.minAmount} - Max: ${method.maxAmount}
                </p>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Enter {method.name} Address</label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={`Enter ${method.name} Address`}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                    {method.name} is not a default withdrawal option in your account, please enter the correct wallet address to recieve your funds.
                </p>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {submitting ? (
                    <>
                        <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                    </>
                ) : 'Complete Request'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalDetailsPage;
