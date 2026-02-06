import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: Request) {
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

    const { userId, status, reason } = await req.json();

    if (!userId || !['verified', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    if (status === 'rejected' && !reason) {
      return NextResponse.json({ error: 'Rejection reason is required' }, { status: 400 });
    }

    await dbConnect();

    const updateData: any = {
      kycStatus: status,
    };

    if (status === 'rejected') {
      updateData.kycRejectionReason = reason;
    }

    const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `User KYC ${status} successfully`, user }, { status: 200 });
  } catch (error: any) {
    console.error('KYC update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
