'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  createdAt: string;
  walletAddress?: string;
  kycStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
  kycDocuments: { type: string; url: string; uploadedAt: string }[];
  kycRejectionReason?: string;
  totalInvested: number;
  balance?: number;
  earnings?: number;
  isSuspended: boolean;
}

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Credit/Debit Modal State
  const [showCreditDebitModal, setShowCreditDebitModal] = useState(false);
  const [cdAmount, setCdAmount] = useState('');
  const [cdType, setCdType] = useState<'credit' | 'debit'>('credit');
  const [cdField, setCdField] = useState<'balance' | 'earnings'>('balance');
  const [cdLoading, setCdLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAction = async (action: 'suspend' | 'delete' | 'login') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch('/api/admin/users/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?._id,
          action,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (action === 'delete') {
          router.push('/admin/users');
        } else if (action === 'login') {
          // Open dashboard in new tab
          window.open('/dashboard', '_blank');
        } else {
          fetchUser(); // Refresh for suspend/activate
        }
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (error) {
      console.error('Action error:', error);
      alert('Failed to perform action');
    }
  };

  const handleKycAction = async (status: 'verified' | 'rejected') => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/users/kyc', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?._id,
          status,
          reason: status === 'rejected' ? rejectionReason : undefined,
        }),
      });

      if (res.ok) {
        fetchUser(); // Refresh data
        setShowRejectModal(false);
        setRejectionReason('');
      }
    } catch (error) {
      console.error('Failed to update KYC:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreditDebit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cdAmount || Number(cdAmount) <= 0) return;

    setCdLoading(true);
    try {
        const res = await fetch(`/api/admin/users/${user?._id}/balance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: cdAmount,
                type: cdType,
                field: cdField
            }),
        });

        if (res.ok) {
            alert(`${cdType === 'credit' ? 'Credited' : 'Debited'} successfully`);
            setShowCreditDebitModal(false);
            setCdAmount('');
            fetchUser(); // Refresh
        } else {
            alert('Operation failed');
        }
    } catch (error) {
        console.error('Operation error:', error);
    } finally {
        setCdLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-gray-500">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-gray-500">User ID: {user._id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-600 transition-colors">
              Actions
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-10">
              <button onClick={() => setShowCreditDebitModal(true)} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 first:rounded-t-xl">
                Credit/Debit User
              </button>
              <button onClick={() => handleAction('login')} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">
                Login as User
              </button>
              <button onClick={() => handleAction('suspend')} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">
                {user.isSuspended ? 'Activate User' : 'Suspend User'}
              </button>
              <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">
                Send Email
              </button>
              <button onClick={() => handleAction('delete')} className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 last:rounded-b-xl">
                Delete User
              </button>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${
            user.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
            user.kycStatus === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
            user.kycStatus === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {user.kycStatus}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <p className="text-slate-900 dark:text-white font-medium">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                <p className="text-slate-900 dark:text-white font-medium">{user.phone}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</label>
                <p className="text-slate-900 dark:text-white font-medium">{user.address}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">City / Zip</label>
                <p className="text-slate-900 dark:text-white font-medium">{user.city}, {user.zip}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Joined Date</label>
                <p className="text-slate-900 dark:text-white font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Invested</label>
                <p className="text-slate-900 dark:text-white font-medium">${(user.totalInvested || 0).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Balance</label>
                <p className="text-slate-900 dark:text-white font-medium">${(user.balance || 0).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Earnings</label>
                <p className="text-slate-900 dark:text-white font-medium">${(user.earnings || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">KYC Documents</h3>
            {user.kycDocuments && user.kycDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.kycDocuments.map((doc, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-gray-500">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{doc.type}</p>
                        <p className="text-xs text-gray-500">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No documents submitted yet.</p>
            )}
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Verification Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleKycAction('verified')}
                disabled={user.kycStatus === 'verified' || user.kycStatus === 'rejected' || actionLoading}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">check_circle</span>
                Approve KYC
              </button>
              <button 
                onClick={() => setShowRejectModal(true)}
                disabled={user.kycStatus === 'rejected' || user.kycStatus === 'verified' || actionLoading}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">cancel</span>
                Reject KYC
              </button>
            </div>
            
            {user.kycRejectionReason && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1">Rejection Reason</p>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">{user.kycRejectionReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Reject Verification</h3>
            <p className="text-gray-500 text-sm mb-6">Please provide a reason for rejecting the KYC documents. This will be visible to the user.</p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., ID document is blurry, Address proof is outdated..."
              className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-red-500/20 outline-none mb-6 text-sm"
            ></textarea>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleKycAction('rejected')}
                disabled={!rejectionReason.trim() || actionLoading}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Credit/Debit Modal */}
      {showCreditDebitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Credit/Debit {user.name} account.</h3>
                    <button 
                        onClick={() => setShowCreditDebitModal(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                <form onSubmit={handleCreditDebit} className="space-y-6">
                    <div>
                        <input
                            type="number"
                            value={cdAmount}
                            onChange={(e) => setCdAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select where to Credit/Debit</label>
                        <div className="relative">
                            <select
                                value={cdField}
                                onChange={(e) => setCdField(e.target.value as 'balance' | 'earnings')}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-gray-900 dark:text-white"
                            >
                                <option value="balance">Account Balance</option>
                                <option value="earnings">Earnings</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Action Type</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${cdType === 'credit' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                                <input 
                                    type="radio" 
                                    name="cdType" 
                                    value="credit" 
                                    checked={cdType === 'credit'} 
                                    onChange={() => setCdType('credit')}
                                    className="hidden"
                                />
                                <span className="material-symbols-outlined">add_circle</span>
                                <span className="font-bold">Credit (Add)</span>
                            </label>
                            <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${cdType === 'debit' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                                <input 
                                    type="radio" 
                                    name="cdType" 
                                    value="debit" 
                                    checked={cdType === 'debit'} 
                                    onChange={() => setCdType('debit')}
                                    className="hidden"
                                />
                                <span className="material-symbols-outlined">remove_circle</span>
                                <span className="font-bold">Debit (Subtract)</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={cdLoading || !cdAmount}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {cdLoading ? (
                            <>
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Processing...
                            </>
                        ) : 'Confirm Transaction'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
