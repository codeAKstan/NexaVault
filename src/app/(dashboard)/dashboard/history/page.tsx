'use client';

import React, { useState, useEffect } from 'react';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  status: string;
  paymentMethod: {
    name: string;
    imageUrl?: string;
  };
  createdAt: string;
}

const HistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal' | 'others'>('deposit');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/user/transactions');
      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'processed':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
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

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'others') {
      return t.type !== 'deposit' && t.type !== 'withdrawal';
    }
    return t.type === activeTab;
  });

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
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
          <div>Amount</div>
          <div>Payment mode</div>
          <div>Status</div>
          <div className="text-right">Date created</div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading transactions...</div>
          ) : filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div key={tx._id} className="flex flex-col md:grid md:grid-cols-4 gap-4 px-6 py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors md:items-center border border-transparent hover:border-gray-100 dark:hover:border-gray-800 bg-gray-50/50 md:bg-transparent dark:bg-slate-800/30">
                <div className="flex justify-between md:block">
                  <span className="md:hidden text-sm text-gray-500">Amount</span>
                  <span className="font-bold text-gray-900 dark:text-white">${tx.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between md:block">
                  <span className="md:hidden text-sm text-gray-500">Payment Mode</span>
                  <span className="text-gray-600 dark:text-gray-300">{tx.paymentMethod?.name || tx.type}</span>
                </div>
                <div className="flex justify-between md:block">
                  <span className="md:hidden text-sm text-gray-500">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block capitalize ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </div>
                <div className="flex justify-between md:block md:text-right">
                  <span className="md:hidden text-sm text-gray-500">Date</span>
                  <span className="text-gray-500 text-sm">{formatDate(tx.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
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
