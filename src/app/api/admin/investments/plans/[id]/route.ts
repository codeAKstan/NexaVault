import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import InvestmentPlan from '@/models/InvestmentPlan';

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

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const deletedPlan = await InvestmentPlan.findByIdAndDelete(params.id);

    if (!deletedPlan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete plan error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const updatedPlan = await InvestmentPlan.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedPlan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan updated successfully', plan: updatedPlan }, { status: 200 });
  } catch (error: any) {
    console.error('Update plan error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
