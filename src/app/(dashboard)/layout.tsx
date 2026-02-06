'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  if (user?.isSuspended) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-red-500">block</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Account Suspended</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          Your account has been suspended due to a violation of our terms of service or suspicious activity. Please contact the administrator for more information.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-grow lg:ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
