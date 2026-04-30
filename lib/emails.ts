export const getWelcomeEmailHtml = (name: string) => `
<!DOCTYPE html>
<html>
<body style="background-color: #0F0F0F; color: #FFFFFF; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; border-radius: 12px; padding: 30px; background-color: #000;">
    <h1 style="color: #39FF14; font-size: 24px; text-transform: uppercase;">Welcome to The Capital Guru</h1>
    <p style="font-size: 16px; color: #ccc;">Hi ${name},</p>
    <p style="font-size: 16px; color: #ccc; line-height: 1.5;">Your institutional-grade trading edge starts here. Prepare for precise, actionable signals tailored for the NSE & BSE.</p>
    <a href="https://thecapitalguru.net/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #39FF14; color: #000; text-decoration: none; font-weight: bold; border-radius: 6px; margin-top: 20px; text-transform: uppercase;">Access Dashboard</a>
  </div>
</body>
</html>
`;

export const getPaymentReceivedHtml = (name: string, plan: string) => `
<!DOCTYPE html>
<html>
<body style="background-color: #0F0F0F; color: #FFFFFF; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; border-radius: 12px; padding: 30px; background-color: #000;">
    <h1 style="color: #39FF14; font-size: 24px; text-transform: uppercase;">Payment Received</h1>
    <p style="font-size: 16px; color: #ccc;">Hi ${name},</p>
    <p style="font-size: 16px; color: #ccc; line-height: 1.5;">We have received your payment intimation for the <strong>${plan}</strong> plan. Our team is verifying the transaction and your account will be activated shortly.</p>
  </div>
</body>
</html>
`;
