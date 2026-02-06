'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface InvestmentPlan {
  _id: string;
  name: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  minReturn: number;
  maxReturn: number;
  giftBonus: number;
  tag: string;
  topUpInterval: string;
  topUpType: string;
  topUpAmount: number;
  duration: string;
}

const InvestmentPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    minPrice: '',
    maxPrice: '',
    minReturn: '',
    maxReturn: '',
    giftBonus: '0',
    tag: '',
    topUpInterval: 'Monthly',
    topUpType: 'Percentage',
    topUpAmount: '',
    duration: '',
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/admin/investments/plans');
      const data = await res.json();
      if (res.ok) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = isEditing && editingId 
        ? `/api/admin/investments/plans/${editingId}`
        : '/api/admin/investments/plans';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(`Plan ${isEditing ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
        resetForm();
        fetchPlans();
      } else {
        const data = await res.json();
        alert(data.error || `Failed to ${isEditing ? 'update' : 'create'} plan`);
      }
    } catch (error) {
      console.error('Submit plan error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
        name: '', price: '', minPrice: '', maxPrice: '', minReturn: '', maxReturn: '',
        giftBonus: '0', tag: '', topUpInterval: 'Monthly', topUpType: 'Percentage',
        topUpAmount: '', duration: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (plan: InvestmentPlan) => {
    setFormData({
        name: plan.name,
        price: String(plan.price),
        minPrice: String(plan.minPrice),
        maxPrice: String(plan.maxPrice),
        minReturn: String(plan.minReturn),
        maxReturn: String(plan.maxReturn),
        giftBonus: String(plan.giftBonus),
        tag: plan.tag,
        topUpInterval: plan.topUpInterval,
        topUpType: plan.topUpType,
        topUpAmount: String(plan.topUpAmount),
        duration: plan.duration
    });
    setEditingId(plan._id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this plan?')) return;
    
    try {
        const res = await fetch(`/api/admin/investments/plans/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            setPlans(plans.filter(p => p._id !== id));
        } else {
            alert('Failed to delete plan');
        }
    } catch (error) {
        console.error('Delete error', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Plans</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage investment packages available to users.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          New plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading plans...</div>
        ) : plans.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No investment plans found. Create one to get started.</div>
        ) : (
            plans.map((plan) => (
                <div key={plan._id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative group">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button 
                            onClick={() => handleEdit(plan)}
                            className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100"
                            title="Edit"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button 
                            onClick={() => handleDelete(plan._id)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                            title="Delete"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>

                    <div className="mb-4">
                        {plan.tag && (
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">
                                {plan.tag}
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                        <p className="text-2xl font-bold text-emerald-500 mt-2">${plan.price.toLocaleString()}</p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                            <span>ROI:</span>
                            <span className="font-bold">{plan.minReturn}% - {plan.maxReturn}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Min Deposit:</span>
                            <span className="font-bold">${plan.minPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Deposit:</span>
                            <span className="font-bold">${plan.maxPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-bold">{plan.duration}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Top Up:</span>
                            <span className="font-bold">{plan.topUpAmount}{plan.topUpType === 'Percentage' ? '%' : '$'} {plan.topUpInterval}</span>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Create Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-hidden">
            <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-5xl shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditing ? 'Edit Investment Plan' : 'Add Investment Plan'}</h2>
                    <button 
                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter Plan name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Plan Minimum Price ($)</label>
                                <input
                                    type="number"
                                    name="minPrice"
                                    required
                                    value={formData.minPrice}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter Plan minimum price"
                                />
                                <p className="text-xs text-gray-500 mt-1">This is the minimum amount a user can pay to invest in this plan, enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Minimum return (%)</label>
                                <input
                                    type="number"
                                    name="minReturn"
                                    required
                                    value={formData.minReturn}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter minimum return"
                                />
                                <p className="text-xs text-gray-500 mt-1">This is the minimum return (ROI) for this plan, enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Gift Bonus ($)</label>
                                <input
                                    type="number"
                                    name="giftBonus"
                                    value={formData.giftBonus}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Optional Bonus if a user buys this plan.enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Top up Interval</label>
                                <select
                                    name="topUpInterval"
                                    value={formData.topUpInterval}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="Hourly">Hourly</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">This specifies how often the system should add profit(ROI) to user account.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Top up Amount (in % or $ as specified above)</label>
                                <input
                                    type="number"
                                    name="topUpAmount"
                                    required
                                    value={formData.topUpAmount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="top up amount"
                                />
                                <p className="text-xs text-gray-500 mt-1">This is the amount the system will add to users account as profit, based on what you selected in topup type and topup interval above.</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Plan price($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter Plan price"
                                />
                                <p className="text-xs text-gray-500 mt-1">This is the maximum amount a user can pay to invest in this plan, enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Plan Maximum Price ($)</label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    required
                                    value={formData.maxPrice}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter Plan maximum price"
                                />
                                <p className="text-xs text-gray-500 mt-1">Same as plan price, enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Maximum return (%)</label>
                                <input
                                    type="number"
                                    name="maxReturn"
                                    required
                                    value={formData.maxReturn}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter maximum return"
                                />
                                <p className="text-xs text-gray-500 mt-1">This is the Maximum return (ROI) for this plan, enter the value without a comma(,)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Plan Tag</label>
                                <input
                                    type="text"
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter Plan Tag"
                                />
                                <p className="text-xs text-gray-500 mt-1">Optional Plan tag. This is tags for each plan eg 'Popular' , 'VIP' etc</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Top up Type</label>
                                <select
                                    name="topUpType"
                                    value={formData.topUpType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="Percentage">Percentage</option>
                                    <option value="Fixed">Fixed</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">This specifies if the system should add profit in percentage(%) or a fixed amount.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Investment Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    required
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="eg 1 Days, 2 Weeks, 1 Months"
                                />
                                <p className="text-xs text-gray-500 mt-1">This specifies how long the investment plan will run. Please strictly follow the guide on how to setup investment duration else it may not work.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-primary text-white font-bold px-12 py-3.5 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto"
                        >
                            {submitting ? (
                                <>
                                    <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                    {isEditing ? 'Updating Plan...' : 'Creating Plan...'}
                                </>
                            ) : (isEditing ? 'Update Plan' : 'Add Plan')}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlansPage;
