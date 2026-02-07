'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Withdrawal {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  charges: number;
  status: string;
  createdAt: string;
  paymentMethod: {
    name: string;
    walletAddress: string;
  };
}

const AdminWithdrawalsPage: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Reject Modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const res = await fetch('/api/admin/withdraws');
      const data = await res.json();
      if (res.ok) {
        setWithdrawals(data.withdrawals);
      }
    } catch (error) {
      console.error('Failed to fetch withdrawals', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject', reason?: string) => {
    if (!confirm(`Are you sure you want to ${action} this withdrawal?`)) return;
    
    setProcessingId(id);
    try {
        const res = await fetch('/api/admin/withdraws/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionId: id, action, reason }),
        });

        const data = await res.json();
        if (res.ok) {
            alert(`Withdrawal ${action}ed successfully`);
            fetchWithdrawals();
            if (action === 'reject') {
                setShowRejectModal(false);
                setRejectReason('');
                setRejectId(null);
            }
        } else {
            alert(data.error || 'Action failed');
        }
    } catch (error) {
        console.error('Action error', error);
        alert('An error occurred');
    } finally {
        setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdrawal Requests</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage user withdrawal requests.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-gray-400 tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method / Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading withdrawals...</td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No withdrawal requests found.</td>
                </tr>
              ) : (
                withdrawals.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">{tx.userId?.name || 'Unknown'}</span>
                        <span className="text-xs text-gray-500">{tx.userId?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">${tx.amount.toLocaleString()}</span>
                        {tx.charges > 0 && (
                            <span className="text-xs text-red-500">+${tx.charges} fee</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700 dark:text-gray-300">{tx.paymentMethod?.name}</span>
                        <span className="text-xs text-gray-500 break-all max-w-xs">{tx.paymentMethod?.walletAddress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        tx.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {tx.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => handleAction(tx._id, 'approve')}
                                disabled={processingId === tx._id}
                                className="p-2 bg-emerald-50 text-emerald-500 rounded-lg hover:bg-emerald-100 disabled:opacity-50"
                                title="Approve"
                            >
                                <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                            <button 
                                onClick={() => { setRejectId(tx._id); setShowRejectModal(true); }}
                                disabled={processingId === tx._id}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 disabled:opacity-50"
                                title="Reject"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-xl">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Reject Withdrawal</h3>
                <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 mb-4 h-32 resize-none"
                ></textarea>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowRejectModal(false)}
                        className="flex-1 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => rejectId && handleAction(rejectId, 'reject', rejectReason)}
                        disabled={!rejectReason}
                        className="flex-1 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 disabled:opacity-50"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawalsPage;
