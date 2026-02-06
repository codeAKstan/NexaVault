'use client';

import React from 'react';
import AdminSidebar from '../../../components/admin/Sidebar';
import AdminHeader from '../../../components/admin/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark">
      <AdminSidebar />
      <AdminHeader />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
