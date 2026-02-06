import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { put } from '@vercel/blob';
import dbConnect from '@/lib/db';
import PaymentMethod from '@/models/PaymentMethod';

// Helper to check admin auth
async function checkAdmin() {
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
    if (!await checkAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const methods = await PaymentMethod.find().sort({ createdAt: -1 });
    return NextResponse.json({ methods }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await checkAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('imageUrl') as string;
    const qrCodeFile = formData.get('qrCodeFile') as File | null;
    let qrCodeUrl = formData.get('qrCodeUrl') as string;

    if (imageFile) {
        const blob = await put(`payment-methods/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
        imageUrl = blob.url;
    }

    if (qrCodeFile) {
        const blob = await put(`payment-methods/qr-${Date.now()}-${qrCodeFile.name}`, qrCodeFile, { access: 'public' });
        qrCodeUrl = blob.url;
    }

    const body = {
        name: formData.get('name'),
        minAmount: Number(formData.get('minAmount')),
        maxAmount: Number(formData.get('maxAmount')),
        charges: Number(formData.get('charges')),
        chargesType: formData.get('chargesType'),
        type: formData.get('type'),
        imageUrl: imageUrl,
        qrCodeUrl: qrCodeUrl,
        walletAddress: formData.get('walletAddress'),
    };

    await dbConnect();
    const method = await PaymentMethod.create(body);
    return NextResponse.json({ message: 'Payment method created', method }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await checkAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const _id = formData.get('_id');
    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('imageUrl') as string;
    const qrCodeFile = formData.get('qrCodeFile') as File | null;
    let qrCodeUrl = formData.get('qrCodeUrl') as string;

    if (imageFile) {
        const blob = await put(`payment-methods/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
        imageUrl = blob.url;
    }

    if (qrCodeFile) {
        const blob = await put(`payment-methods/qr-${Date.now()}-${qrCodeFile.name}`, qrCodeFile, { access: 'public' });
        qrCodeUrl = blob.url;
    }

    const updateData = {
        name: formData.get('name'),
        minAmount: Number(formData.get('minAmount')),
        maxAmount: Number(formData.get('maxAmount')),
        charges: Number(formData.get('charges')),
        chargesType: formData.get('chargesType'),
        type: formData.get('type'),
        imageUrl: imageUrl,
        qrCodeUrl: qrCodeUrl,
        walletAddress: formData.get('walletAddress'),
    };
    
    await dbConnect();
    const method = await PaymentMethod.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ message: 'Payment method updated', method }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await checkAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await dbConnect();
    await PaymentMethod.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Payment method deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
