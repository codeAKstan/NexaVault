import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

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

export async function POST(req: Request) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transactionId, action, reason } = await req.json(); // action: 'approve' | 'reject'

    if (!transactionId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    if (transaction.status !== 'pending') {
        return NextResponse.json({ error: 'Transaction is already processed' }, { status: 400 });
    }

    if (action === 'approve') {
        transaction.status = 'approved';
        // Funds were already deducted when withdrawal was requested
    } else if (action === 'reject') {
        transaction.status = 'rejected';
        transaction.rejectionReason = reason;

        // Refund the user
        const user = await User.findById(transaction.userId);
        if (user) {
            // Refund amount + charges
            const refundAmount = transaction.amount + (transaction.charges || 0);
            user.balance = (user.balance || 0) + refundAmount;
            await user.save();
        }
    } else {
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await transaction.save();

    return NextResponse.json({ message: `Withdrawal ${action}ed successfully`, transaction }, { status: 200 });

  } catch (error: any) {
    console.error('Withdrawal action error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
