import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import InvestmentPlan from '@/models/InvestmentPlan';

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const plans = await InvestmentPlan.find().sort({ price: 1 }); // Sort by price ascending

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch public plans error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
