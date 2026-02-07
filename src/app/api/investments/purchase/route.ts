import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Investment from '@/models/Investment';
import InvestmentPlan from '@/models/InvestmentPlan';
import Transaction from '@/models/Transaction';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { planId, amount } = await req.json();

    if (!planId || !amount) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // 1. Fetch User and Plan
    const user = await User.findById(decoded.userId);
    const plan = await InvestmentPlan.findById(planId);

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });

    // 2. Validate Amount
    const investmentAmount = Number(amount);
    if (investmentAmount < plan.minPrice || investmentAmount > plan.maxPrice) {
        return NextResponse.json({ error: `Amount must be between $${plan.minPrice} and $${plan.maxPrice}` }, { status: 400 });
    }

    // 3. Check Balance
    if ((user.balance || 0) < investmentAmount) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // 4. Calculate End Date (Robust parsing)
    // Supports "7 Days", "7Days", "7" (defaults to days)
    const match = plan.duration.match(/(\d+)\s*([a-zA-Z]*)/);
    const durationVal = match ? parseInt(match[1]) : 0;
    const durationUnit = match && match[2] ? match[2].toLowerCase() : 'days'; 

    const endDate = new Date();
    if (durationUnit.includes('day')) {
        endDate.setDate(endDate.getDate() + durationVal);
    } else if (durationUnit.includes('week')) {
        endDate.setDate(endDate.getDate() + (durationVal * 7));
    } else if (durationUnit.includes('month')) {
        endDate.setMonth(endDate.getMonth() + durationVal);
    } else if (durationUnit.includes('year')) {
        endDate.setFullYear(endDate.getFullYear() + durationVal);
    }

    // 5. Deduct Balance & Update Total Invested
    user.balance -= investmentAmount;
    user.totalInvested = (user.totalInvested || 0) + investmentAmount;
    await user.save();

    // 6. Create Investment Record
    const newInvestment = await Investment.create({
        userId: user._id,
        planId: plan._id,
        planName: plan.name,
        amount: investmentAmount,
        roi: `${plan.minReturn}% - ${plan.maxReturn}%`,
        endDate: endDate,
        status: 'active',
        // Next payout logic would go here depending on topUpInterval
    });

    // 7. Log Transaction (Debit)
    await Transaction.create({
        userId: user._id,
        type: 'debit', // Money leaving wallet for investment
        amount: investmentAmount,
        status: 'approved',
        paymentMethod: {
            name: `Investment in ${plan.name}`,
            type: 'investment_purchase'
        }
    });

    return NextResponse.json({ message: 'Investment successful', investment: newInvestment }, { status: 201 });

  } catch (error: any) {
    console.error('Investment purchase error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
