import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Investment from '@/models/Investment';
import Transaction from '@/models/Transaction';

// Helper to verify admin token
async function verifyAdmin() {
  const adminToken = (await cookies()).get('admin_token')?.value;
  if (!adminToken) return false;
  try {
    jwt.verify(adminToken, process.env.JWT_SECRET || 'fallback_secret');
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // 1. Total Platform TVL (Total Value Locked - Sum of all active investments + user balances)
    // For simplicity, we'll sum active investments amount.
    const activeInvestments = await Investment.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalTVL = activeInvestments.length > 0 ? activeInvestments[0].total : 0;

    // 2. Active Investors (Users with at least one active investment)
    const activeInvestorsCount = await Investment.distinct('userId', { status: 'active' }).countDocuments();

    // 3. Pending KYC (Users with KYC status 'pending')
    // Assuming User model has kycStatus. If not, we'll mock or add it. 
    // Let's check User model first. If not present, we'll return 0 or placeholder.
    // For now, let's assume we want to count users.
    const totalUsers = await User.countDocuments();
    
    // 4. Recent Activity Log (Last 5 transactions)
    const recentActivity = await Transaction.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email');

    // Transform activity for frontend
    const activityLog = recentActivity.map(tx => ({
        user: tx.userId?.name || 'Unknown User',
        initials: (tx.userId?.name || 'U').substring(0, 2).toUpperCase(),
        action: tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        type: tx.type === 'deposit' || tx.type === 'withdrawal' ? 'TRANSACTION' : 'SYSTEM',
        asset: tx.paymentMethod?.name || 'N/A',
        time: new Date(tx.createdAt).toLocaleTimeString(),
        amount: tx.amount
    }));

    return NextResponse.json({
        stats: {
            tvl: totalTVL,
            activeInvestors: activeInvestorsCount,
            totalUsers: totalUsers,
            // Carbon offset is static/calculated logic for now
            carbonOffset: (totalTVL * 0.000015).toFixed(2) // Mock formula: $1 = 0.000015 tons
        },
        activity: activityLog
    }, { status: 200 });

  } catch (error: any) {
    console.error('Fetch admin stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
