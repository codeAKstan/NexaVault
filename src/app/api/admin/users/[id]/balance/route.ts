import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const adminToken = (await cookies()).get('admin_token')?.value;

    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(adminToken, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { amount, type, field } = await req.json(); // type: 'credit' | 'debit', field: 'balance' | 'earnings' | 'totalInvested'

    if (!amount || !type || !field) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const val = Number(amount);
    if (isNaN(val) || val <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Determine target field
    // Note: 'earnings' and 'totalInvested' were recently added to schema. 'balance' exists.
    let targetField = field;
    if (field !== 'earnings' && field !== 'totalInvested' && field !== 'balance') {
        targetField = 'balance'; // Fallback
    }
    
    // Apply operation
    if (type === 'credit') {
        user[targetField] = (user[targetField] || 0) + val;
    } else {
        user[targetField] = (user[targetField] || 0) - val;
        // Optional: Prevent negative balance? 
        // user[targetField] = Math.max(0, user[targetField] - val); 
        // For now, let's allow negative as explicit admin override.
    }

    await user.save();

    // Create Transaction Record
    await Transaction.create({
        userId: user._id,
        type: type, // 'credit' or 'debit'
        amount: val,
        status: 'approved',
        paymentMethod: {
            name: 'USDT',
            type: 'admin_adjustment'
        }
    });

    return NextResponse.json({ message: 'Balance updated successfully', user }, { status: 200 });

  } catch (error: any) {
    console.error('Balance update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
