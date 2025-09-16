import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email: string, uniqueCode: string, guestName: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
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
              Date: [Event Date]<br>
              Time: [Event Time]<br>
              Location: [Event Location]
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
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send verification email' };
  }
};
