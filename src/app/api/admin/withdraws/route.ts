import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User'; // Ensure User model is registered

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
    
    // Fetch all withdrawal transactions
    const withdrawals = await Transaction.find({ type: 'withdrawal' })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ withdrawals }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch withdrawals error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
