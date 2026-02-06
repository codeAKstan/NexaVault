import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import PaymentMethod from '@/models/PaymentMethod';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    // Only fetch active payment methods for users
    const methods = await PaymentMethod.find({ isActive: true }).sort({ createdAt: -1 });
    
    return NextResponse.json({ methods }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
