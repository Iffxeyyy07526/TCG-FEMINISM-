import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!resend) {
      console.warn('RESEND_API_KEY is not set. Simulation mode active.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send email to admin
    await resend.emails.send({
      from: 'Contact Floor <contact@thecapitalguru.net>',
      to: 'mahir@thecapitalguru.net',
      subject: `[Support Terminal] ${subject}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">INBOUND_COMMUNICATION // SUPPORT_TERMINAL</div>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 24px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">New Message <span style="color: #39FF14;">Detected.</span></h1>
          
          <div style="margin-bottom: 25px;">
            <p style="color: #444; font-size: 10px; text-transform: uppercase; margin-bottom: 6px; font-weight: 900; letter-spacing: 1px;">From Entity:</p>
            <p style="font-size: 16px; margin: 0; color: #fff; font-weight: bold;">${name} <span style="color: #888; font-weight: normal; font-size: 14px;">(${email})</span></p>
          </div>

          <div style="margin-bottom: 25px;">
            <p style="color: #444; font-size: 10px; text-transform: uppercase; margin-bottom: 6px; font-weight: 900; letter-spacing: 1px;">Transmission Subject:</p>
            <p style="font-size: 16px; margin: 0; color: #39FF14; font-weight: bold;">${subject}</p>
          </div>

          <div style="margin-top: 30px; padding: 25px; background: #0A0A0A; border-left: 4px solid #39FF14; border-radius: 2px;">
            <p style="color: #444; font-size: 10px; text-transform: uppercase; margin-bottom: 12px; font-weight: 900; letter-spacing: 1px;">Message Content:</p>
            <p style="font-size: 14px; line-height: 1.6; color: #ccc; margin: 0;">${message}</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a;">
            <p style="font-size: 10px; color: #222; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Node Intelligence Routing &copy; 2026</p>
          </div>
        </div>
      `
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: 'The Capital Guru <support@thecapitalguru.net>',
      to: email,
      subject: 'Message Received // The Capital Guru Support',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a; text-align: center;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px; text-align: left;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 28px; font-weight: 900; line-height: 1.1; margin-bottom: 20px;">Transmission <span style="color: #39FF14;">Logged.</span></h1>
          
          <p style="color: #888; font-size: 16px; line-height: 1.6; margin-top: 20px;">Hi ${name}, we've received your request at the Support Terminal.</p>
          <p style="color: #888; font-size: 16px; line-height: 1.6;">Our research team will analyze the transmission and respond within 24 hours.</p>
          
          <div style="margin-top: 40px; padding: 20px; border: 1px solid #1a1a1a; background: #0A0A0A; display: inline-block; border-radius: 4px;">
            <p style="color: #39FF14; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0; font-weight: 900;">Status: Pending_Response</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a;">
            <p style="color: #222; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">The Capital Guru Intelligence © 2026</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
