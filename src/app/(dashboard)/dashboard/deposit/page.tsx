'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

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
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  
  // Payment Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProofFile(file);
      setProofPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitPayment = async () => {
    if (!amount || !selectedMethod || !proofFile) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('paymentMethod', JSON.stringify(selectedMethod));
    formData.append('proofImage', proofFile);

    try {
      const res = await fetch('/api/user/deposit', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard/history'); // Changed from /dashboard/transactions to /dashboard/history based on search findings
      } else {
        const data = await res.json();
        alert(data.error || 'Payment submission failed');
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const { user } = useAuth();
  
  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (user?.kycStatus !== 'verified') {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deposit</h1></div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verification Required</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    To comply with financial regulations and ensure the security of our platform, you must complete the KYC verification process before making a deposit.
                </p>
                <button 
                    onClick={() => router.push('/dashboard/profile')}
                    className="bg-amber-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                >
                    Complete Verification
                </button>
            </div>
        </div>
    );
  }

  if (showDetails && selectedMethod) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 relative">
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
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              I have made the payment
            </button>
          </div>
        </div>

        {/* Payment Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Payment</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-500">close</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex justify-between items-center">
                  <span className="text-sm text-emerald-800 dark:text-emerald-400 font-medium">Amount Sent</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">${Number(amount).toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Upload Transaction Proof
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Please upload a screenshot or photo of your payment receipt.
                  </p>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      proofPreview ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                    
                    {proofPreview ? (
                      <div className="relative w-full h-48">
                        <Image 
                          src={proofPreview} 
                          alt="Proof Preview" 
                          fill 
                          className="object-contain rounded-lg"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                        <span className="text-sm text-gray-500 font-medium">Click to upload image</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmitPayment}
                  disabled={submitting || !proofFile}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Submitting...
                    </>
                  ) : 'Submit Payment Proof'}
                </button>
              </div>
            </div>
          </div>
        )}
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
          <button 
            onClick={() => router.push('/dashboard/history')}
            className="text-emerald-500 text-sm font-medium hover:text-emerald-600 hover:underline"
          >
            View deposit history
          </button>
        </div>

      </div>
    </div>
  );
};

export default DepositPage;
