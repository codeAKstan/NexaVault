import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Settings from '@/models/Settings';

export async function GET(req: Request) {
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

    await dbConnect();

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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

    const body = await req.json();
    await dbConnect();

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      // Update fields
      if (body.siteName !== undefined) settings.siteName = body.siteName;
      if (body.maintenanceMode !== undefined) settings.maintenanceMode = body.maintenanceMode;
      if (body.supportEmail !== undefined) settings.supportEmail = body.supportEmail;
      if (body.minDeposit !== undefined) settings.minDeposit = body.minDeposit;
      
      if (body.depositAddresses) {
        settings.depositAddresses = {
          ...settings.depositAddresses,
          ...body.depositAddresses
        };
      }
      
      settings.updatedAt = new Date();
      await settings.save();
    }

    return NextResponse.json({ message: 'Settings updated successfully', settings }, { status: 200 });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
