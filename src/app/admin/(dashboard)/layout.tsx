'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/admin/Sidebar';
import AdminHeader from '../../../components/admin/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <AdminHeader 
        onMenuClick={() => setSidebarOpen(true)} 
      />
      <main className="lg:ml-64 p-4 lg:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
