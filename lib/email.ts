import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not defined. Email service will be skipped.');
      return null;
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const FROM_EMAIL = 'The Capital Guru <notifications@thecapitalguru.net>';

export async function sendRegistrationAlert(email: string, fullName: string) {
  try {
    const resend = getResend();
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Welcome to the Intelligence Floor',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // NODE_ALPHA</div>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Secure <span style="color: #39FF14;">Node</span> Activated.</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Welcome, <b>${fullName}</b>.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #888;">Your account has been successfully registered on The Capital Guru terminal. You are now in the pool for institutional signal access.</p>
          
          <div style="margin-top: 40px; padding: 30px; border: 1px solid #333; background: #050505; border-radius: 4px;">
            <p style="font-size: 11px; font-weight: 900; color: #39FF14; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Next Action Required:</p>
            <p style="font-size: 14px; line-height: 1.6; color: #fff; margin: 0;">Select your strategy tier and complete activation to unlock real-time market flow maps.</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #333; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Institutional Intelligence &copy; 2026</p>
          </div>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Terminal Access Detected',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // SECURITY_PROTO</div>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Access <span style="color: #39FF14;">Detected.</span></h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #ccc;">A new login occurred on your TCG Terminal account.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #888;">If this wasn't you, secure your access key immediately via the dashboard settings.</p>
          
          <div style="margin-top: 40px; padding: 20px; font-size: 10px; color: #333; border-top: 1px solid #1a1a1a; font-family: monospace;">
             <p style="margin: 4px 0;">TIMESTAMP: ${new Date().toUTCString()}</p>
             <p style="margin: 4px 0;">NODE_ID: ${email}</p>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `TCG | ${plan.toUpperCase()} Activation Pending`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // BILLING_PROTOCOL</div>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Invoice <span style="color: #39FF14;">Generated.</span></h1>
          
          <p style="font-size: 18px; color: #fff; font-weight: bold; margin-bottom: 10px;">Activation for ${plan} Tier is being processed.</p>
          
          <div style="margin: 30px 0; padding: 30px; background: #0A0A0A; border: 1px solid #1a1a1a;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="color: #444; text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 1px;">Tier Selection</td>
                    <td style="text-align: right; font-weight: 900; color: #fff; text-transform: uppercase;">${plan}</td>
                </tr>
                <tr>
                    <td style="padding-top: 15px; color: #444; text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 1px;">Total Due</td>
                    <td style="padding-top: 15px; text-align: right; color: #39FF14; font-size: 24px; font-weight: 900;">${price}</td>
                </tr>
            </table>
          </div>

          <p style="color: #888; font-size: 14px; line-height: 1.6;">Once payment is verified via WhatsApp screenshot, your terminal will be fully synchronized with the institutional flow.</p>
          
          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #333; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Global Risk Operations | TCG</p>
          </div>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Access Approved - Welcome to the Inner Circle',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // ACCESS_GRANTED</div>
          </div>

          <h1 style="color: #fff; text-transform: uppercase; letter-spacing: -1px; font-size: 40px; font-weight: 900; line-height: 1.0; margin-bottom: 30px;">Access <span style="color: #39FF14;">Granted.</span></h1>
          
          <p style="font-size: 18px; line-height: 1.6; color: #ccc;">Your credentials have been verified by institutional risk desks. You now have full clearance to the signal floor.</p>
          
          <div style="margin-top: 40px; background: #39FF14; padding: 40px; border-radius: 8px; text-align: center;">
            <h2 style="color: #000; margin-top: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">Telegram Stream Active</h2>
            <p style="color: #000; font-size: 14px; margin-bottom: 30px; font-weight: 500;">Join the real-time institutional signal feed now. This link is locked to your node ID.</p>
            <a href="${telegramLink}" style="display: inline-block; background: #000; color: #39FF14; text-decoration: none; padding: 18px 40px; border-radius: 4px; font-weight: 900; text-transform: uppercase; font-size: 14px; letter-spacing: 2px;">Sync Intelligence Stream</a>
          </div>

          <p style="margin-top: 50px; font-size: 11px; color: #444; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; border-left: 2px solid #39FF14; padding-left: 15px;">Warning: Distributing terminal intelligence to non-authorized entities results in immediate node termination and blacklist protocol inception.</p>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #222; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Institutional Relations | TCG</p>
          </div>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Terminal Access Warning - 7 Days Remaining',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #39FF14; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // CONTINUITY_OFFICE</div>
          </div>

          <h1 style="color: #FFA500; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Protocol <span style="color: #fff;">Warning.</span></h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Your institutional access is scheduled for decommissioning in <b style="color: #FFA500;">7 days</b>.</p>
          <p style="color: #888; font-size: 16px; line-height: 1.6;">To maintain your connection to the live signal floor, ensure your subscription is renewed before the cutoff window closes.</p>
          
          <div style="margin-top: 40px; padding: 30px; border: 1px solid #FFA500; background: #0F0900; border-radius: 4px;">
            <p style="font-size: 11px; font-weight: 900; color: #FFA500; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Action Required:</p>
            <p style="font-size: 14px; line-height: 1.6; color: #fff; margin: 0;">Visit the dashboard terminal to extend your session duration and prevent node fallout.</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #333; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Continuity Command | TCG</p>
          </div>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | URGENT: Terminal Access Expiring in 72 Hours',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #FF0000; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #444; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // CRITICAL_DECOMMISSION</div>
          </div>

          <h1 style="color: #FF0000; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Critical <span style="color: #fff;">Alert.</span></h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Terminal access synchronized to your node will be terminated in <b style="color: #FF0000;">3 days</b>.</p>
          <p style="color: #888; font-size: 16px; line-height: 1.6; font-weight: bold;">Real-time feed disconnection is imminent.</p>
          
          <div style="margin-top: 40px; padding: 30px; border: 1px solid #FF0000; background: #1a0000; border-radius: 4px;">
            <p style="font-size: 11px; font-weight: 900; color: #FF0000; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Final Warning:</p>
            <p style="font-size: 14px; line-height: 1.6; color: #fff; margin: 0;">Immediate renewal required to prevent permanent signal floor fallout and node blacklist.</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #333; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Crisis Management Desk | TCG</p>
          </div>
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
    if (!resend) return;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'TCG | Access Terminated - Node Decommissioned',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 20px;">
            <span style="color: #444; font-weight: 900; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;">THE CAPITAL GURU</span>
            <div style="color: #222; font-size: 10px; margin-top: 4px; letter-spacing: 2px;">AUTHENTICATED_TRANSMISSION // NODE_DECOMMISSIONED</div>
          </div>

          <h1 style="color: #444; text-transform: uppercase; letter-spacing: -2px; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 30px;">Access <span style="color: #888;">Terminated.</span></h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #666;">Your institutional node has been moved to the decommissioned queue and disconnected from the floor.</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Live signal feeds, Telegram access, and mentorship hubs have been disabled for this identity.</p>
          
          <div style="margin-top: 40px; padding: 30px; border: 1px solid #222; background: #0A0A0A; border-radius: 4px;">
            <p style="font-size: 11px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Recovery Protocol:</p>
            <p style="font-size: 14px; line-height: 1.6; color: #888; margin: 0;">Log in to the dashboard terminal and re-verify your identity with a valid subscription to restore signal flow.</p>
          </div>

          <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="font-size: 10px; color: #222; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">Network Operations Center | TCG</p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send final expiration alert:', error);
  }
}
