import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Investment from '@/models/Investment';

export async function GET() {
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

    await dbConnect();
    const investments = await Investment.find({ userId: decoded.userId }).sort({ startDate: -1 });

    return NextResponse.json({ investments }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch user investments error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
