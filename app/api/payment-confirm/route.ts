import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { getPaymentReceivedHtml } from '@/lib/emails';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (resend) {
      await resend.emails.send({
        from: 'The Capital Guru <mahir@thecapitalguru.net>',
        to: body.email || 'customer@example.com',
        subject: 'Payment Verification Pending',
        html: getPaymentReceivedHtml(body.name || 'Trader', body.plan || 'Subscription'),
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
