import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import InvestmentPlan from '@/models/InvestmentPlan';

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
    const plans = await InvestmentPlan.find().sort({ createdAt: -1 });

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch plans error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.price || !body.minPrice || !body.maxPrice || !body.topUpInterval || !body.duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    const newPlan = await InvestmentPlan.create(body);

    return NextResponse.json({ message: 'Plan created successfully', plan: newPlan }, { status: 201 });
  } catch (error: any) {
    console.error('Create plan error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
