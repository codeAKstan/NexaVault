import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import User from '@/models/User';

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
    const { name, phone, address, city, zip } = body;

    await dbConnect();

    // Prevent updating email or username by strictly selecting fields to update
    // We filter out undefined values so we don't accidentally unset fields if they aren't sent
    const updateData: any = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (zip) updateData.zip = zip;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser, message: 'Profile updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
