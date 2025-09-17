import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendVerificationEmail = async (email: string, uniqueCode: string, guestName: string) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@birthday-invite.com',
    subject: 'Birthday Party Invitation - Your Unique Check-in Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fefdf8 0%, #fdf9e7 100%); padding: 40px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #b45309; font-size: 28px; margin: 0; font-family: 'Playfair Display', serif;">🎉 Birthday Celebration Invitation 🎉</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px;">
          <h2 style="color: #78350f; font-size: 24px; margin-bottom: 20px;">Hello ${guestName}! 👋</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            You're cordially invited to our special birthday celebration! We're thrilled to have you join us for this wonderful occasion.
          </p>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="color: #78350f; margin: 0 0 10px 0; font-size: 18px;">Your Unique Check-in Code:</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; text-align: center; font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #b45309; letter-spacing: 2px; border: 2px dashed #f59e0b;">
              ${uniqueCode}
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Please keep this code safe! You'll need it to check in at the event. Simply present this code at the registration desk when you arrive.
          </p>
          
          <div style="background: #f0d96b; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #78350f; margin: 0; font-weight: 500;">
              📅 <strong>Event Details:</strong><br>
              Date: Friday 3rd October, 2025<br>
              Time: 2:00pm - Party Time | 7:30pm - Praise Night<br>
              Location: The Stable, Bode Thomas Road, Surulere, Lagos
            </p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We can't wait to celebrate with you! If you have any questions, please don't hesitate to reach out.
          </p>
        </div>
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>Best regards,<br>The Birthday Celebration Team</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send verification email' };
  }
};