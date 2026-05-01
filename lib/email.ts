import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables.');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const FROM_EMAIL = 'The Capital Guru <notifications@thecapitalguru.net>';

export async function sendRegistrationAlert(email: string, fullName: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Welcome to the Intelligence Floor',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #39FF14; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Secure Node Activated.</h1>
          <p style="font-size: 16px; margin-top: 30px;">Welcome, <b>${fullName}</b>.</p>
          <p style="color: #888;">Your account has been successfully registered on The Capital Guru terminal. You are now in the pool for institutional signal access.</p>
          <div style="margin-top: 40px; padding: 20px; border: 1px solid #222; background: #050505;">
            <p style="font-size: 12px; font-weight: bold; color: #39FF14; text-transform: uppercase;">Next Action Required:</p>
            <p style="font-size: 14px;">Select your strategy tier and complete activation to unlock real-time market flow maps.</p>
          </div>
          <p style="margin-top: 40px; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 2px;">The Capital Guru | Institutional Intelligence</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send registration alert:', error);
  }
}

export async function sendLoginAlert(email: string, ip?: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Terminal Access Detected',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Access <span style="color: #39FF14;">Detected.</span></h1>
          <p style="font-size: 16px; margin-top: 30px;">A new login occurred on your TCG Terminal account.</p>
          <p style="color: #888;">If this wasn't you, secure your access key immediately via the dashboard settings.</p>
          <div style="margin-top: 40px; font-size: 10px; color: #444; border-top: 1px solid #222; padding-top: 20px;">
            <p>TIMESTAMP: ${new Date().toUTCString()}</p>
            <p>NODE ID: ${email}</p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send login alert:', error);
  }
}

export async function sendPaymentInitiatedAlert(email: string, plan: string, price: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `TCG | ${plan.toUpperCase()} Activation Pending`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
            <h1 style="color: #39FF14; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Invoice <span style="color: #fff;">Generated.</span></h1>
            <p style="font-size: 18px; margin-top: 30px; font-weight: bold;">Activation for ${plan} Tier is being processed.</p>
            <div style="margin: 30px 0; padding: 30px; background: #0A0A0A; border: 1px solid #222;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="color: #444; text-transform: uppercase; font-size: 10px; font-weight: bold;">Tier Selection</td>
                        <td style="text-align: right; font-weight: bold;">${plan}</td>
                    </tr>
                    <tr>
                        <td style="padding-top: 10px; color: #444; text-transform: uppercase; font-size: 10px; font-weight: bold;">Total Due</td>
                        <td style="padding-top: 10px; text-align: right; color: #39FF14; font-size: 20px; font-weight: 900;">${price}</td>
                    </tr>
                </table>
            </div>
            <p style="color: #888; font-size: 14px;">Once payment is verified via WhatsApp screenshot, your terminal will be fully synchronized.</p>
            <p style="margin-top: 40px; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 2px;">Global Risk Operations | TCG</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send payment alert:', error);
  }
}

export async function sendApprovalNotification(email: string, telegramLink: string = 'https://t.me/thecapitalguru') {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Access Approved - Welcome to the Inner Circle',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #39FF14; text-transform: uppercase; letter-spacing: -2px; font-size: 40px; margin-bottom: 30px;">Access <span style="color: #fff;">Granted.</span></h1>
          <p style="font-size: 18px; line-height: 1.6;">Your credentials have been verified by institutional risk desks. You now have full clearance.</p>
          
          <div style="margin-top: 40px; background: linear-gradient(135deg, #39FF14 0%, #000 100%); padding: 1px; border-radius: 12px;">
            <div style="background: #000; padding: 40px; border-radius: 11px;">
              <h2 style="color: #fff; margin-top: 0; font-size: 20px;">Telegram Hub Access</h2>
              <p style="color: #888; font-size: 14px; margin-bottom: 30px;">Join the real-time signal stream now. This link is unique to your node.</p>
              <a href="${telegramLink}" style="display: inline-block; background: #39FF14; color: #000; text-decoration: none; padding: 18px 36px; border-radius: 8px; font-weight: 900; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Join Intelligence Stream</a>
            </div>
          </div>

          <p style="margin-top: 50px; font-size: 12px; color: #333; font-weight: bold; text-transform: uppercase;">Warning: Distributing terminal intelligence to non-authorized entities results in immediate node termination.</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send approval notification:', error);
  }
}

export async function send7DayExpiryWarning(email: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Terminal Access Warning - 7 Days Remaining',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #FFA500; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Protocol <span style="color: #fff;">Warning.</span></h1>
          <p style="font-size: 16px; margin-top: 30px;">Your institutional access is scheduled for decommissioning in <b>7 days</b>.</p>
          <p style="color: #888;">To maintain your connection to the live signal floor, ensure your subscription is renewed before the cutoff.</p>
          <div style="margin-top: 40px; padding: 20px; border: 1px solid #FFA500; background: #050505;">
            <p style="font-size: 12px; font-weight: bold; color: #FFA500; text-transform: uppercase;">Action Required:</p>
            <p style="font-size: 14px;">Visit the dashboard to extend your session duration.</p>
          </div>
          <p style="margin-top: 40px; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 2px;">Institutional Continuity Office | TCG</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send 7-day expiry warning:', error);
  }
}

export async function send3DayExpiryWarning(email: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | URGENT: Terminal Access Expiring in 72 Hours',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #FF0000; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Critical <span style="color: #fff;">Alert.</span></h1>
          <p style="font-size: 16px; margin-top: 30px;">Terminal access synchronized to your node will be terminated in <b>3 days</b>.</p>
          <p style="color: #888; font-weight: bold;">Real-time feed disconnection is imminent.</p>
          <div style="margin-top: 40px; padding: 20px; border: 1px solid #FF0000; background: #0F0000;">
            <p style="font-size: 12px; font-weight: bold; color: #FF0000; text-transform: uppercase;">Final Warning:</p>
            <p style="font-size: 14px;">Immediate renewal required to prevent signal loss.</p>
          </div>
          <p style="margin-top: 40px; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 2px;">Crisis Management Desk | TCG</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send 3-day expiry warning:', error);
  }
}

export async function sendFinalExpirationNotice(email: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Access Terminated - Node Decommissioned',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="color: #444; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; border-bottom: 1px solid #333; padding-bottom: 20px;">Access <span style="color: #888;">Terminated.</span></h1>
          <p style="font-size: 16px; margin-top: 30px;">Your institutional node has been moved to the decommissioned queue.</p>
          <p style="color: #888;">Live signal feeds, Discord access, and mentorship hubs have been disabled for this identity.</p>
          <div style="margin-top: 40px; padding: 20px; border: 1px solid #333; background: #0A0A0A;">
            <p style="font-size: 12px; font-weight: bold; color: #888; text-transform: uppercase;">Recovery Protocol:</p>
            <p style="font-size: 14px;">Log in to the terminal and re-verify your identity to restore access.</p>
          </div>
          <p style="margin-top: 40px; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 2px;">Network Operations Center | TCG</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send final expiration alert:', error);
  }
}
