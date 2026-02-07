import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import PaymentMethod from '@/models/PaymentMethod';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { methodId, amount, address } = await req.json();

    if (!methodId || !amount || !address) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // 1. Fetch User and Payment Method
    const user = await User.findById(decoded.userId);
    const method = await PaymentMethod.findById(methodId);

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    // Check KYC Status
    if (user.kycStatus !== 'verified') {
        return NextResponse.json({ error: 'Your account is not verified. Please complete KYC to withdraw funds.' }, { status: 403 });
    }

    if (!method) return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });

    // 2. Validate Amount (Min/Max and Balance)
    const withdrawalAmount = Number(amount);
    
    if (withdrawalAmount < method.minAmount) {
        return NextResponse.json({ error: `Minimum withdrawal amount is $${method.minAmount}` }, { status: 400 });
    }
    
    if (withdrawalAmount > method.maxAmount) {
        return NextResponse.json({ error: `Maximum withdrawal amount is $${method.maxAmount}` }, { status: 400 });
    }

    // Calculate Charges
    let charges = 0;
    if (method.chargesType === 'percentage') {
        charges = (withdrawalAmount * method.charges) / 100;
    } else {
        charges = method.charges;
    }

    const totalDeduction = withdrawalAmount + charges;

    if ((user.balance || 0) < totalDeduction) {
        return NextResponse.json({ error: 'Insufficient balance including charges' }, { status: 400 });
    }

    // 3. Deduct Balance
    user.balance -= totalDeduction;
    await user.save();

    // 4. Create Transaction Record (Pending)
    const transaction = await Transaction.create({
        userId: user._id,
        type: 'withdrawal',
        amount: withdrawalAmount,
        status: 'pending',
        paymentMethod: {
            name: method.name,
            type: 'withdrawal',
            walletAddress: address
        },
        charges: charges
    });

    return NextResponse.json({ message: 'Withdrawal request submitted successfully', transaction }, { status: 201 });

  } catch (error: any) {
    console.error('Withdrawal error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
