import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { put } from '@vercel/blob';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const formData = await req.formData();
    const amount = Number(formData.get('amount'));
    const proofImage = formData.get('proofImage') as File;
    const paymentMethodStr = formData.get('paymentMethod') as string;

    if (!amount || !proofImage || !paymentMethodStr) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let paymentMethod;
    try {
      paymentMethod = JSON.parse(paymentMethodStr);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid payment method data' }, { status: 400 });
    }

    // Upload proof image
    const blob = await put(`deposits/${Date.now()}-${proofImage.name}`, proofImage, { access: 'public' });

    await dbConnect();
    
    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check KYC Status
    if (user.kycStatus !== 'verified') {
        return NextResponse.json({ error: 'Your account is not verified. Please complete KYC to deposit funds.' }, { status: 403 });
    }

    const transaction = await Transaction.create({
      userId: user._id,
      type: 'deposit',
      amount,
      status: 'pending',
      paymentMethod: {
        name: paymentMethod.name,
        type: paymentMethod.type,
        imageUrl: paymentMethod.imageUrl,
        qrCodeUrl: paymentMethod.qrCodeUrl,
        walletAddress: paymentMethod.walletAddress,
      },
      proofImage: blob.url,
    });

    return NextResponse.json({ message: 'Deposit submitted successfully', transaction }, { status: 201 });

  } catch (error: any) {
    console.error('Deposit error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
