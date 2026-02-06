'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ActiveInvestment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  totalEarnings: number;
  nextPayout: string;
}

const ActiveInvestmentsPage: React.FC = () => {
  const [investments, setInvestments] = useState<ActiveInvestment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await fetch('/api/admin/investments/active');
      const data = await res.json();
      if (res.ok) {
        setInvestments(data.investments);
      }
    } catch (error) {
      console.error('Failed to fetch active investments', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Investments</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor all currently running user investments.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-gray-400 tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Earnings</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Next Payout</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Loading active investments...</td>
                </tr>
              ) : investments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">No active investments found.</td>
                </tr>
              ) : (
                investments.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">{inv.userId?.name || 'Unknown'}</span>
                        <span className="text-xs text-gray-500">{inv.userId?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700 dark:text-gray-300">{inv.planName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">${inv.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-emerald-500">+${inv.totalEarnings.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(inv.startDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(inv.endDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(inv.nextPayout)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/users/${inv.userId?._id}`}
                        className="text-primary hover:text-emerald-600 font-bold text-xs"
                      >
                        View User
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveInvestmentsPage;
