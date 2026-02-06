'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PaymentMethod {
  _id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  charges: number;
  chargesType: 'percentage' | 'fixed';
  type: 'currency' | 'crypto';
  imageUrl: string;
  qrCodeUrl: string;
  walletAddress: string;
  isActive: boolean;
}

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    validateAmount();
  }, [amount, selectedMethod]);

  const validateAmount = () => {
    if (!amount || !selectedMethod) {
      setError('');
      return;
    }

    const val = Number(amount);
    if (val < selectedMethod.minAmount) {
      setError(`Minimum deposit amount is $${selectedMethod.minAmount}`);
    } else if (val > selectedMethod.maxAmount) {
      setError(`Maximum deposit amount is $${selectedMethod.maxAmount}`);
    } else {
      setError('');
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch('/api/payment-methods');
      const data = await res.json();
      if (res.ok) {
        setPaymentMethods(data.methods);
      }
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (selectedMethod?.walletAddress) {
      navigator.clipboard.writeText(selectedMethod.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (showDetails && selectedMethod) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <button
            onClick={() => setShowDetails(false)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4"
          >
            <span className="material-symbols-outlined mr-1 text-lg">arrow_back</span>
            Back to methods
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Deposit</h1>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-1">Amount to send</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {Number(amount).toLocaleString()} <span className="text-sm text-gray-400 font-normal">USD</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  {selectedMethod.type === 'crypto' ? `${selectedMethod.name} Wallet Address` : 'Payment Details / Account Number'}
                </label>
                <div className="relative group">
                  <div className="w-full px-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl break-all font-mono text-sm text-gray-600 dark:text-gray-300 pr-12">
                    {selectedMethod.walletAddress || 'No address configured'}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Copy address"
                  >
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <p className="text-xs text-blue-500 mt-2 flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">info</span>
                  {selectedMethod.type === 'crypto' 
                    ? `Only send ${selectedMethod.name} to this address. Sending any other currency may result in permanent loss.`
                    : 'Please ensure you transfer the exact amount to the account details above.'}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-xl">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-500 mb-1 text-sm">Important</h4>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  After making the payment, please allow some time for the transaction to be confirmed. Your balance will be updated automatically once confirmed.
                </p>
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              {selectedMethod.qrCodeUrl ? (
                <div className="relative w-48 h-48 mb-4">
                  <Image
                    src={selectedMethod.qrCodeUrl}
                    alt={`${selectedMethod.name} QR Code`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : selectedMethod.imageUrl ? (
                <div className="relative w-48 h-48 mb-4">
                  <Image
                    src={selectedMethod.imageUrl}
                    alt={selectedMethod.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-6xl text-gray-300">qr_code_2</span>
                </div>
              )}
              <p className="text-sm text-center text-gray-500">Scan QR Code to Pay</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => window.location.href = '/dashboard/transactions'}
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              I have made the payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deposit into your account</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">

        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Enter Amount</label>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-30">
              <span className="material-symbols-outlined text-sm">unfold_more</span>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">error</span>
              {error}
            </p>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Choose Payment Method from the list below</label>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading payment methods...</div>
          ) : paymentMethods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No payment methods available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method._id}
                  onClick={() => setSelectedMethod(method)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${selectedMethod?._id === method._id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden p-2 relative">
                      {method.imageUrl ? (
                        <Image
                          src={method.imageUrl}
                          alt={method.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="material-symbols-outlined text-gray-400">payments</span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{method.name}</h3>
                  <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                    <span>Min: ${method.minAmount}</span>
                    <span>Max: ${method.maxAmount}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Charge: {method.charges}{method.chargesType === 'percentage' ? '%' : ' USD'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || !selectedMethod || !!error}
          onClick={() => setShowDetails(true)}
        >
          Proceed to Payment
        </button>

        <div className="mt-8">
          <button className="text-emerald-500 text-sm font-medium hover:text-emerald-600 hover:underline">
            View deposit history
          </button>
        </div>

      </div>
    </div>
  );
};

export default DepositPage;
