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
}

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

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
        <div className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${
          user.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
          user.kycStatus === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
          user.kycStatus === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {user.kycStatus}
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
    </div>
  );
};

export default UserDetailsPage;
