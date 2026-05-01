import { NextResponse } from 'next/server';
import { 
  sendRegistrationAlert, 
  sendLoginAlert, 
  sendPaymentInitiatedAlert, 
  sendApprovalNotification,
  send7DayExpiryWarning,
  send3DayExpiryWarning,
  sendFinalExpirationNotice 
} from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, email, data } = body;

    switch (type) {
      case 'registration':
        await sendRegistrationAlert(email, data.fullName);
        break;
      case 'login':
        await sendLoginAlert(email);
        break;
      case 'payment-initiated':
        await sendPaymentInitiatedAlert(email, data.plan, data.price);
        break;
      case 'approval':
        await sendApprovalNotification(email, data.telegramLink);
        break;
      case 'expiry-7-days':
        await send7DayExpiryWarning(email);
        break;
      case 'expiry-3-days':
        await send3DayExpiryWarning(email);
        break;
      case 'expired':
        await sendFinalExpirationNotice(email);
        break;
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
