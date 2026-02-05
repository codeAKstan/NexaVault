import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow lg:ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
