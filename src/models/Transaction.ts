import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'credit', 'debit', 'other'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processed'],
    default: 'pending',
  },
  paymentMethod: {
    name: String,
    type: { type: String }, // 'currency' or 'crypto'
    imageUrl: String,
    qrCodeUrl: String,
    walletAddress: String,
  },
  proofImage: {
    type: String,
    required: function(this: any) {
      return this.type === 'deposit';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Force model recompilation in development to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  if (mongoose.models.Transaction) {
    delete mongoose.models.Transaction;
  }
}

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
