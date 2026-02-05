'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

const LoginPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { checkAuth } = useAuth();
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
      const res = await fetch('/api/auth/login', {
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

      await checkAuth(); // Update auth state
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">shield_with_heart</span>
            </div>
            <span className="text-3xl font-display font-bold text-white tracking-tight">NexaVault</span>
          </Link>
          <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            Secure your <span className="gradient-text">sustainable</span> financial future.
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Log in to manage your green asset portfolio and track your DeFi yields in real-time.
          </p>
          <div className="space-y-6">
            {[
              "Bank-grade security encryption",
              "Direct Web3 wallet connectivity",
              "Transparent RWA asset tracking"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-white dark:bg-background-dark">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">shield_with_heart</span>
            </div>
            <span className="text-2xl font-display font-bold text-secondary dark:text-white">NexaVault</span>
          </Link>
          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                type="email"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-secondary dark:text-gray-300" htmlFor="password">
                  Password
                </label>
                <a className="text-sm font-semibold text-primary hover:text-emerald-600 transition-colors" href="#">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                id="stay-logged-in"
                type="checkbox"
              />
              <label className="ml-3 text-sm text-gray-600 dark:text-gray-400 cursor-pointer" htmlFor="stay-logged-in">
                Stay logged in for 30 days
              </label>
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Log In <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>
          </form>
          <p className="mt-12 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link className="text-primary font-bold hover:underline" href="/signup">Sign up now</Link>
          </p>
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

export default LoginPage;
