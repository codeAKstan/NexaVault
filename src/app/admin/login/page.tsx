'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

const AdminLoginPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  // We might want a separate AuthContext for Admin, or share it. 
  // For now, I'll assume we manually handle the redirect after login and don't rely on the global User AuthContext 
  // because that context expects a 'User' object, not 'Admin'.
  // Ideally, we should refactor AuthContext to support multiple roles, but for speed, I'll just handle the token cookie.
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Success
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-background-dark">
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30">
              <span className="material-symbols-outlined text-white text-5xl">admin_panel_settings</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">NexaVault Admin</h1>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
            Authorized personnel only. Please verify your credentials to access the administrative dashboard.
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Admin Login</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your secure credentials</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-xl">mail</span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@nexa.com"
                  type="email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-xl">lock</span>
                <input
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            
            <button
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-8"
              type="submit"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Access Dashboard <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">login</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <Link href="/" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
      
      <div className="fixed top-6 right-6">
        <button
          onClick={toggleTheme}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-500 hover:text-primary dark:text-gray-400 transition-all"
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
