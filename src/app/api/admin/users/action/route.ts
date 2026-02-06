import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
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

    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action are required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let message = '';

    switch (action) {
      case 'suspend':
        user.isSuspended = !user.isSuspended;
        await user.save();
        message = `User ${user.isSuspended ? 'suspended' : 'activated'} successfully`;
        break;
      
      case 'delete':
        await User.findByIdAndDelete(userId);
        message = 'User deleted successfully';
        break;
      
      case 'login':
        // Generate a user token for the admin to impersonate
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || 'fallback_secret',
          { expiresIn: '1h' }
        );
        
        // Set the user token cookie
        (await cookies()).set({
          name: 'token',
          value: token,
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600, // 1 hour
        });
        
        return NextResponse.json({ message: 'Login successful', redirect: '/dashboard' }, { status: 200 });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message, user }, { status: 200 });
  } catch (error: any) {
    console.error('Admin action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
