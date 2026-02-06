import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestmentPlan',
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  roi: {
    type: String, // Storing range e.g. "1% - 5%" for reference
    required: true,
  },
  dailyProfit: {
    type: Number, // Calculated profit based on logic, or just a placeholder for now
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date, // Calculated based on duration
    required: true,
  },
  nextPayout: {
    type: Date, // When the next profit top-up should happen
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
});

// Force model recompilation in development
if (process.env.NODE_ENV === 'development') {
  if (mongoose.models.Investment) {
    delete mongoose.models.Investment;
  }
}

export default mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);
