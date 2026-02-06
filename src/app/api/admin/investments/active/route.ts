import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Investment from '@/models/Investment';
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
    
    const investments = await Investment.find({ status: 'active' })
      .populate('userId', 'name email')
      .sort({ startDate: -1 });

    return NextResponse.json({ investments }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch all active investments error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
