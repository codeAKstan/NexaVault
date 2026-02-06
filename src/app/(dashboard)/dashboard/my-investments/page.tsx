'use client';

import React, { useState, useEffect } from 'react';

interface Investment {
  _id: string;
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  roi: string;
}

const MyInvestmentsPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await fetch('/api/user/investments');
      const data = await res.json();
      if (res.ok) {
        setInvestments(data.investments);
      }
    } catch (error) {
      console.error('Failed to fetch investments', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'completed':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'cancelled':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

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
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading investments...</div>
          ) : investments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">You have no active investments.</div>
          ) : (
            investments.map((investment) => (
            <div key={investment._id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
              <div className="space-y-4 flex-1 w-full text-center md:text-left">
                <h3 className="font-bold text-gray-900 dark:text-white">{investment.planName}</h3>
                <p className="text-gray-400 text-sm">Amount - ${investment.amount.toLocaleString()}</p>
              </div>

              <div className="flex-1 text-center space-y-4 w-full">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-900 dark:text-white">
                  <span>{formatDate(investment.startDate)}</span>
                  <span className="material-symbols-outlined text-sm text-gray-400">arrow_forward</span>
                  <span>{formatDate(investment.endDate)}</span>
                </div>
                <div className="flex justify-between max-w-xs mx-auto text-sm text-gray-500">
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>
              </div>

              <div className="flex-1 text-right flex items-center justify-center md:justify-end gap-12 w-full">
                <div className="text-center">
                   <p className="text-sm text-gray-500 mb-1">Status</p>
                   <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${getStatusColor(investment.status)}`}>
                      {investment.status}
                   </span>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-emerald-500">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          )))}
        </div>

      </div>
    </div>
  );
};

export default MyInvestmentsPage;
