import mongoose from 'mongoose';

const PaymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  minAmount: {
    type: Number,
    default: 0,
  },
  maxAmount: {
    type: Number,
    default: 0,
  },
  charges: {
    type: Number,
    default: 0,
  },
  chargesType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
  },
  type: {
    type: String,
    enum: ['currency', 'crypto'],
    default: 'crypto',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  qrCodeUrl: {
    type: String,
    default: '',
  },
  walletAddress: {
    type: String,
    default: '', // Important for deposits
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PaymentMethod || mongoose.model('PaymentMethod', PaymentMethodSchema);
