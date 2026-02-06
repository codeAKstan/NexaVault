import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

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

export async function GET(req: Request) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // We can add filters here if needed later (e.g., ?status=pending)
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type'); // 'deposit' or 'withdrawal'

    const query: any = {};
    if (status && status !== 'all') query.status = status;
    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error: any) {
    console.error('Admin transactions error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const user = await User.findById(transaction.userId);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Handle Deposit Balance Updates
    if (transaction.type === 'deposit') {
        // Approving a deposit: Add to balance
        if (status === 'approved' && transaction.status !== 'approved') {
            user.balance = (user.balance || 0) + transaction.amount;
            await user.save();
        }
        // Reverting an approved deposit (e.g. to pending or rejected): Deduct from balance
        else if (transaction.status === 'approved' && status !== 'approved') {
            user.balance = (user.balance || 0) - transaction.amount;
            // Ensure balance doesn't go negative? Or allow it? 
            // Usually fine to allow if it's a correction, but let's keep it simple.
            await user.save();
        }
    }
    
    // Handle Withdrawal Balance Updates (Placeholder for future)
    // If we were handling withdrawals:
    // - On Request: Deduct? Or Deduct on Approval?
    // - If Deduct on Approval:
    //   if (status === 'approved' && transaction.status !== 'approved') { user.balance -= amount; }
    //   if (transaction.status === 'approved' && status !== 'approved') { user.balance += amount; }

    transaction.status = status;
    await transaction.save();

    return NextResponse.json({ message: 'Transaction updated', transaction }, { status: 200 });
  } catch (error: any) {
    console.error('Admin transaction update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
