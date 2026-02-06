import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Investment from '@/models/Investment';
import InvestmentPlan from '@/models/InvestmentPlan';
import Transaction from '@/models/Transaction';

// IMPORTANT: In production, this endpoint should be protected by a SECRET KEY
// or called via a secure Cron Job service (e.g., Vercel Cron, GitHub Actions, AWS Lambda).
// For now, we will verify a simple Bearer token or just assume it's called securely.

export async function GET(req: Request) {
  try {
    // Optional: Add simple security check
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'dev_cron_secret'}`) {
        // In dev, you might skip this check or use 'dev_cron_secret'
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const now = new Date();
    
    // Find active investments where nextPayout is due (or null, meaning first payout)
    const activeInvestments = await Investment.find({
        status: 'active',
        $or: [
            { nextPayout: { $lte: now } },
            { nextPayout: { $exists: false } },
            { nextPayout: null }
        ]
    }).populate('planId');

    let processedCount = 0;

    for (const investment of activeInvestments) {
        // Double check status
        if (investment.status !== 'active') continue;
        
        // Check if investment has ended
        if (investment.endDate <= now) {
            investment.status = 'completed';
            await investment.save();
            continue;
        }

        const plan = investment.planId;
        if (!plan) continue;

        // Calculate Profit
        let profit = 0;
        if (plan.topUpType === 'Percentage') {
            profit = (investment.amount * plan.topUpAmount) / 100;
        } else {
            profit = plan.topUpAmount;
        }

        // Add to User Earnings
        const user = await User.findById(investment.userId);
        if (user) {
            user.earnings = (user.earnings || 0) + profit;
            // Optionally add to balance if earnings are immediately withdrawable
            // user.balance = (user.balance || 0) + profit; 
            await user.save();
        }

        // Update Investment Stats
        investment.totalEarnings = (investment.totalEarnings || 0) + profit;
        
        // Calculate Next Payout Date
        const nextDate = new Date(); // Start from now to prevent drift or use last payout time
        // Using 'now' ensures we don't double pay if cron ran late, but might shift schedule slightly.
        // For strict scheduling, use existing nextPayout + interval.
        
        const baseDate = investment.nextPayout ? new Date(investment.nextPayout) : new Date(investment.startDate);
        // If baseDate is far in past, catch up or just reset to now? 
        // Let's reset to now + interval to keep it simple for this MVP.
        
        const nextSchedule = new Date(now);

        switch (plan.topUpInterval) {
            case 'Hourly':
                nextSchedule.setHours(nextSchedule.getHours() + 1);
                break;
            case 'Daily':
                nextSchedule.setDate(nextSchedule.getDate() + 1);
                break;
            case 'Weekly':
                nextSchedule.setDate(nextSchedule.getDate() + 7);
                break;
            case 'Monthly':
                nextSchedule.setMonth(nextSchedule.getMonth() + 1);
                break;
            case 'Yearly':
                nextSchedule.setFullYear(nextSchedule.getFullYear() + 1);
                break;
            default:
                nextSchedule.setDate(nextSchedule.getDate() + 1); // Default Daily
        }

        investment.nextPayout = nextSchedule;
        await investment.save();

        // Log Transaction
        await Transaction.create({
            userId: investment.userId,
            type: 'credit', // Earnings credited
            amount: profit,
            status: 'approved',
            paymentMethod: {
                name: `ROI: ${plan.name}`,
                type: 'roi_payout'
            }
        });

        processedCount++;
    }

    return NextResponse.json({ 
        message: 'ROI processing completed', 
        processed: processedCount,
        timestamp: now 
    }, { status: 200 });

  } catch (error: any) {
    console.error('ROI Processing Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
