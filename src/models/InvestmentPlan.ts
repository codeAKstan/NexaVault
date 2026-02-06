import mongoose from 'mongoose';

const InvestmentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  minReturn: {
    type: Number,
    required: true,
  },
  maxReturn: {
    type: Number,
    required: true,
  },
  giftBonus: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    default: '',
  },
  topUpInterval: {
    type: String,
    enum: ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'],
    required: true,
  },
  topUpType: {
    type: String,
    enum: ['Percentage', 'Fixed'],
    required: true,
  },
  topUpAmount: {
    type: Number,
    required: true,
  },
  duration: {
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
  if (mongoose.models.InvestmentPlan) {
    delete mongoose.models.InvestmentPlan;
  }
}

export default mongoose.models.InvestmentPlan || mongoose.model('InvestmentPlan', InvestmentPlanSchema);
