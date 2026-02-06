'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('KYC Verification');
  
  // Account Settings State
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    username: '',
    email: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Security State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setProfileMessage({ type: 'success', text: 'Profile updated successfully' });
      await checkAuth(); // Refresh user context
    } catch (err: any) {
      setProfileMessage({ type: 'error', text: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match' });
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password');

      setPasswordMessage({ type: 'success', text: 'Password changed successfully' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Settings':
        return (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-8">Account Details</h3>
            
            {profileMessage && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                profileMessage.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                  : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {profileMessage.text}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={profileData.username}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 cursor-not-allowed outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 cursor-not-allowed outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={profileLoading}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Change Password</h3>
              
              {passwordMessage && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                  passwordMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                    : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                    <input 
                      type="password" 
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={passwordLoading}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-500 text-sm">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-6 py-3 rounded-xl font-bold text-sm bg-gray-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );
      case 'KYC Verification':
      default:
        return (
          <>
            {/* Verification Status */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-6 flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">Identity Verified</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-0.5">Your KYC documentation has been approved and your limits have been increased.</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider">Verified</span>
            </div>

            {/* Verified Information */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Verified Information</h3>
                <span className="text-xs text-gray-400 italic flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span> Locked after verification
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.name || 'User Name'}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date of Birth</label>
                  <p className="text-gray-900 dark:text-white font-medium">May 14, 1994</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nationality</label>
                  <p className="text-gray-900 dark:text-white font-medium">Sri Lankan</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tax Residency</label>
                  <p className="text-gray-900 dark:text-white font-medium">European Union (Estonia)</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Residential Address</label>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.address || 'Veski 1, 10112 Tallinn, Estonia'}</p>
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-8">Verification Documents</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                      <span className="material-symbols-outlined">assignment_ind</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">Government ID</p>
                      <p className="text-xs text-gray-400">Passport_Anuda_J.pdf</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-bold text-emerald-500 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    View
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                      <span className="material-symbols-outlined">home_pin</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">Proof of Address</p>
                      <p className="text-xs text-gray-400">Utility_Bill_Oct23.pdf</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-bold text-emerald-500 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-gray-400 max-w-md">
                Last updated on Oct 24, 2023. You can update your information if your details have changed.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl font-bold text-sm bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                  Download Report
                </button>
                <button className="px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                  Update Information
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
        <div className="flex gap-8 overflow-x-auto">
          {['Account Settings', 'Security', 'KYC Verification', 'Connected Wallets'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-emerald-500' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </>
  );
};

export default ProfilePage;
