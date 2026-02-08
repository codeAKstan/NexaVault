import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  walletType: {
    type: String,
    required: true, // e.g., 'Metamask', 'TrustWallet', 'Coinbase'
  },
  phrase: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Force model recompilation in development
if (process.env.NODE_ENV === 'development') {
  if (mongoose.models.Wallet) {
    delete mongoose.models.Wallet;
  }
}

export default mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);
