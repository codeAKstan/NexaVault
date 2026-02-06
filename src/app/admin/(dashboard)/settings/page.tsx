'use client';

import React, { useState, useEffect } from 'react';

interface PaymentMethod {
  _id?: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  charges: number;
  chargesType: 'percentage' | 'fixed';
  type: 'currency' | 'crypto';
  imageUrl: string;
  qrCodeUrl: string;
  walletAddress: string;
  imageFile?: File | null;
  qrCodeFile?: File | null;
}

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // General Settings
  const [settings, setSettings] = useState({
    siteName: '',
    maintenanceMode: false,
    supportEmail: '',
  });

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod>({
    name: '',
    minAmount: 0,
    maxAmount: 0,
    charges: 0,
    chargesType: 'percentage',
    type: 'currency',
    imageUrl: '',
    qrCodeUrl: '',
    walletAddress: '',
    imageFile: null,
    qrCodeFile: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch General Settings
      const resSettings = await fetch('/api/admin/settings');
      const dataSettings = await resSettings.json();
      if (resSettings.ok) {
        setSettings({
          siteName: dataSettings.settings.siteName,
          maintenanceMode: dataSettings.settings.maintenanceMode,
          supportEmail: dataSettings.settings.supportEmail,
        });
      }

      // Fetch Payment Methods
      const resMethods = await fetch('/api/admin/payment-methods');
      const dataMethods = await resMethods.json();
      if (resMethods.ok) {
        setPaymentMethods(dataMethods.methods);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'General settings saved successfully' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = '/api/admin/payment-methods';
      const method = isEditing ? 'PUT' : 'POST';
      
      const formData = new FormData();
      if (isEditing && currentMethod._id) formData.append('_id', currentMethod._id);
      formData.append('name', currentMethod.name);
      formData.append('minAmount', String(currentMethod.minAmount));
      formData.append('maxAmount', String(currentMethod.maxAmount));
      formData.append('charges', String(currentMethod.charges));
      formData.append('chargesType', currentMethod.chargesType);
      formData.append('type', currentMethod.type);
      formData.append('walletAddress', currentMethod.walletAddress);
      formData.append('imageUrl', currentMethod.imageUrl); // Keep existing URL
      formData.append('qrCodeUrl', currentMethod.qrCodeUrl); // Keep existing URL
      
      if (currentMethod.imageFile) {
        formData.append('imageFile', currentMethod.imageFile);
      }

      if (currentMethod.qrCodeFile) {
        formData.append('qrCodeFile', currentMethod.qrCodeFile);
      }

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        setShowModal(false);
        fetchData(); // Refresh list
        resetForm();
      } else {
        alert('Failed to save payment method');
      }
    } catch (error) {
      console.error('Error saving method:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return;
    
    try {
      const res = await fetch(`/api/admin/payment-methods?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting method:', error);
    }
  };

  const openEditModal = (method: PaymentMethod) => {
    setCurrentMethod(method);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentMethod({
      name: '',
      minAmount: 0,
      maxAmount: 0,
      charges: 0,
      chargesType: 'percentage',
      type: 'currency',
      imageUrl: '',
      qrCodeUrl: '',
      walletAddress: '',
      imageFile: null,
      qrCodeFile: null,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Settings</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
        <div className="flex gap-8">
          {['General', 'Payment Settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
            : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {activeTab === 'General' && (
        <form onSubmit={handleSaveGeneral} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Platform Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Email</label>
              <input 
                type="email" 
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Maintenance Mode</h4>
              <p className="text-xs text-gray-500">Disable user access to the platform temporarily.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'Payment Settings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payment Methods</h3>
            <button 
              onClick={() => { resetForm(); setShowModal(true); }}
              className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <div key={method._id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {method.imageUrl ? (
                      <img src={method.imageUrl} alt={method.name} className="w-10 h-10 rounded-lg object-contain bg-gray-50 dark:bg-slate-800 p-1" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-gray-500 font-bold">
                        {method.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{method.name}</h4>
                      <p className="text-xs text-gray-500 capitalize">{method.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(method)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-blue-500">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDeleteMethod(method._id!)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-red-500">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="text-gray-500">Limits:</span>
                     <span className="font-medium text-slate-900 dark:text-white">${method.minAmount} - ${method.maxAmount}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Charges:</span>
                     <span className="font-medium text-slate-900 dark:text-white">{method.charges}{method.chargesType === 'percentage' ? '%' : '$'}</span>
                   </div>
                </div>
              </div>
            ))}
            
            {paymentMethods.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <p>No payment methods found. Click "Add New" to create one.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveMethod} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Payment method name"
                  value={currentMethod.name}
                  onChange={(e) => setCurrentMethod({...currentMethod, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Amount</label>
                  <input 
                    type="number" 
                    value={currentMethod.minAmount}
                    onChange={(e) => setCurrentMethod({...currentMethod, minAmount: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required but only applies to withdrawal</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maximum Amount</label>
                  <input 
                    type="number" 
                    value={currentMethod.maxAmount}
                    onChange={(e) => setCurrentMethod({...currentMethod, maxAmount: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required but only applies to withdrawal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Charges</label>
                  <input 
                    type="number" 
                    value={currentMethod.charges}
                    onChange={(e) => setCurrentMethod({...currentMethod, charges: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required but only applies to withdrawal</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Charges Type</label>
                  <select 
                    value={currentMethod.chargesType}
                    onChange={(e) => setCurrentMethod({...currentMethod, chargesType: e.target.value as any})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="percentage">Percentage(%)</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Required but only applies to withdrawal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select 
                    value={currentMethod.type}
                    onChange={(e) => setCurrentMethod({...currentMethod, type: e.target.value as any})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="currency">Currency</option>
                    <option value="crypto">Crypto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image (Logo)</label>
                  <div className="flex gap-4 items-center">
                    {currentMethod.imageUrl && !currentMethod.imageFile && (
                      <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <img src={currentMethod.imageUrl} alt="Preview" className="w-8 h-8 object-contain" />
                      </div>
                    )}
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCurrentMethod({...currentMethod, imageFile: e.target.files[0]});
                        }
                      }}
                      className="flex-1 w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                  {currentMethod.imageFile && (
                    <p className="text-xs text-emerald-500 mt-1">New file selected: {currentMethod.imageFile.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">QR Code Image</label>
                <div className="flex gap-4 items-center">
                  {currentMethod.qrCodeUrl && !currentMethod.qrCodeFile && (
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <img src={currentMethod.qrCodeUrl} alt="QR Preview" className="w-8 h-8 object-contain" />
                    </div>
                  )}
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCurrentMethod({...currentMethod, qrCodeFile: e.target.files[0]});
                      }
                    }}
                    className="flex-1 w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
                {currentMethod.qrCodeFile && (
                  <p className="text-xs text-emerald-500 mt-1">New file selected: {currentMethod.qrCodeFile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wallet Address / Payment Instruction</label>
                <textarea 
                  value={currentMethod.walletAddress}
                  onChange={(e) => setCurrentMethod({...currentMethod, walletAddress: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24 resize-none"
                  placeholder="Enter wallet address or bank details here..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : (isEditing ? 'Update Method' : 'Add Method')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
