import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    maxlength: [30, 'Username cannot be more than 30 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
  },
  zip: {
    type: String,
    required: [true, 'Please provide a postal code'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  kycStatus: {
    type: String,
    enum: ['verified', 'pending', 'rejected', 'unverified'],
    default: 'unverified',
  },
  walletAddress: {
    type: String,
    default: '',
  },
  totalInvested: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
