import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PUT(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    );

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
         return NextResponse.json({ error: 'Please provide current and new password' }, { status: 400 });
    }

    await dbConnect();
    
    // We need the password here to compare
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Password update error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
