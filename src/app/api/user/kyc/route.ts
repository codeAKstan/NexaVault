import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Parse the multipart form data
    const formData = await req.formData();
    const idFile = formData.get('idDocument') as File;
    const addressFile = formData.get('addressDocument') as File;

    if (!idFile || !addressFile) {
      return NextResponse.json({ error: 'Both ID and Address documents are required' }, { status: 400 });
    }

    // Upload to Vercel Blob
    console.log('Uploading ID document...');
    const idBlob = await put(`kyc/${decoded.userId}/id-${idFile.name}`, idFile, { access: 'public' });
    console.log('ID document uploaded:', idBlob.url);

    console.log('Uploading Address document...');
    const addressBlob = await put(`kyc/${decoded.userId}/address-${addressFile.name}`, addressFile, { access: 'public' });
    console.log('Address document uploaded:', addressBlob.url);

    await dbConnect();
    console.log('Connected to DB, updating user:', decoded.userId);
    
    // Update user with KYC details
    const updatedUser = await User.findByIdAndUpdate(decoded.userId, {
      $set: {
        kycStatus: 'pending',
        kycSubmittedAt: new Date(),
        kycDocuments: [
          { type: 'id', url: idBlob.url, uploadedAt: new Date() },
          { type: 'address', url: addressBlob.url, uploadedAt: new Date() }
        ],
        kycRejectionReason: '' // Clear previous rejection reason if any
      }
    }, { new: true });

    if (!updatedUser) {
      console.error('User not found during KYC update:', decoded.userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User updated successfully:', updatedUser._id);
    return NextResponse.json({ message: 'KYC submitted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('KYC submission error:', error);
    return NextResponse.json({ error: 'Failed to submit KYC' }, { status: 500 });
  }
}
