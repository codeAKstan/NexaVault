import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'NexaVault',
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  supportEmail: {
    type: String,
    default: 'support@nexavault.com',
  },
  depositAddresses: {
    btc: { type: String, default: '' },
    eth: { type: String, default: '' },
    usdt: { type: String, default: '' },
    sol: { type: String, default: '' },
  },
  minDeposit: {
    type: Number,
    default: 50,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
