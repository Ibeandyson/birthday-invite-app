import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { Resend } from 'resend';

export const sendEmail = (email: string, guestName: string, extraGuests: any) => {


  // Check if SMTP environment variables are set
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP environment variables:', {
      hasHost: !!process.env.SMTP_HOST,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    })
    return NextResponse.json({
      success: false,
      error: 'SMTP configuration missing'
    }, { status: 500 })
  }

  console.log('Creating SMTP transporter with:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || '587',
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER
  })


  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Invite registered!',
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fefdf8 0%, #fdf9e7 100%); padding: 40px; border-radius: 20px; position: relative; overflow: hidden;">
          <!-- Gold Glitter Background -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 60px; background: linear-gradient(to bottom, rgba(245, 158, 11, 0.2), transparent);"></div>
          
          <div style="text-align: center; margin-bottom: 30px; position: relative; z-index: 10;">
            <h1 style="color: #92400e; font-size: 32px; margin: 0; font-family: 'Dancing Script', cursive; font-weight: 600;">4 Decades Of Grace</h1>
            <div style="width: 60px; height: 2px; background: #d97706; margin: 10px auto;"></div>
            <h2 style="color: #b45309; font-size: 48px; margin: 20px 0; font-family: 'Dancing Script', cursive; font-weight: 700;">Let's Party</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 20px; position: relative; z-index: 10;">
            <h3 style="color: #78350f; font-size: 24px; margin-bottom: 20px; text-align: center;">Hello ${guestName}! 👋</h3>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
            Thanks for confirming your attendance. Chika is thrilled you’re coming! You’re officially in the birthday squad — fun awaits
            </p>

            ${Number(extraGuests) > 0 ? `
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
                You are bringing ${Number(extraGuests)} extra guests.
              </p>
            ` : ''}
            
            <!-- Event Details -->
            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #78350f; margin: 0 0 15px 0; font-size: 18px; text-align: center;">Event Details</h4>
              <div style="margin-bottom: 10px;">
                <span style="color: #92400e; font-weight: 600;">📅 Date:</span> Friday 3rd October, 2025
              </div>
              <div style="margin-bottom: 10px;">
                <span style="color: #92400e; font-weight: 600;">🕐 Time:</span> 2:00pm - Party Time | 7:30pm - Praise Night
              </div>
              <div style="margin-bottom: 10px;">
                <span style="color: #92400e; font-weight: 600;">📍 Location:</span> The Stable, Bode Thomas Road, Surulere, Lagos
              </div>
              <div style="text-align: center; margin-top: 15px;">
                <span style="color: #78350f; font-weight: 600; font-size: 16px;">DRESS CODE: Glam Up</span>
              </div>
            </div>
            
            <!-- Check-in Instructions -->
            <div style="background: #f0d96b; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
              <h4 style="color: #78350f; margin: 0 0 10px 0; font-size: 18px;">How to Check In:</h4>
              <p style="color: #78350f; font-size: 16px; margin: 10px 0;">
                <strong>Simply use your email address!</strong><br><br>
                1. Go to the check-in desk at the event<br>
                2. ⁠Scan the QR code at the check-in section with your phone<br>
                3. Fill in your email address: <strong>${email}</strong><br>
                4. Get your name marked as checked in!<br><br>
                <em>No code needed - just your email address!</em>
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: center;">
              Mark your calendars — the fun officially starts with you. See you soon! 🥂
            </p>
          </div>
          
          <!-- Grace Banner -->
          <div style="background: #fef3c7; padding: 15px; border-radius: 10px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; right: 0; width: 80px; height: 100%; background: linear-gradient(to left, rgba(245, 158, 11, 0.3), transparent);"></div>
            <div style="position: relative; z-index: 10;">
              <div style="color: #92400e; font-size: 12px; font-weight: 500; margin-bottom: 2px; font-family: 'Dancing Script'">four decades of</div>
              <div style="color: #78350f; font-size: 18px; font-weight: bold; font-family: 'Dancing Script'">Grace</div>
            </div>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">
            <p>Best regards,<br>Chika</p>
          </div>
        </div>
      `,
  }

  console.log('Sending email to:', email)

  const resend = new Resend(process.env.RESENDER_API_KEY || '');

  const info = resend.emails.send(mailOptions)

  return info
}

export const sendCheckInEmail = (email: string, guestName: string, extraGuests: number = 0) => {
  if (!email || !guestName) {
    return {
      success: false,
      error: 'Missing required fields'
    }
  }

  // Check if SMTP environment variables are set
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP environment variables:', {
      hasHost: !!process.env.SMTP_HOST,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    })
    return {
      success: false,
      error: 'SMTP configuration missing'
    }
  }

  console.log('Creating SMTP transporter for check-in email with:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || '587',
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER
  })

  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // })

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Check-in Confirmation!',
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fefdf8 0%, #fdf9e7 100%); padding: 40px; border-radius: 20px; position: relative; overflow: hidden;">
          <!-- Gold Glitter Background -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 60px; background: linear-gradient(to bottom, rgba(245, 158, 11, 0.2), transparent);"></div>
          
          <div style="text-align: center; margin-bottom: 30px; position: relative; z-index: 10;">
            <h1 style="color: #92400e; font-size: 32px; margin: 0; font-family: 'Dancing Script', cursive; font-weight: 600;">4 Decades Of Grace</h1>
            <div style="width: 60px; height: 2px; background: #d97706; margin: 10px auto;"></div>
            <h2 style="color: #b45309; font-size: 48px; margin: 20px 0; font-family: 'Dancing Script', cursive; font-weight: 700;">Welcome!</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 20px; position: relative; z-index: 10;">
            <h3 style="color: #78350f; font-size: 24px; margin-bottom: 20px; text-align: center;">Hello ${guestName}! 🎉</h3>
            
            <div style="background: #d4f4dd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #22c55e; text-align: center;">
              <h4 style="color: #166534; margin: 0 0 10px 0; font-size: 20px;">✅ Successfully Checked In!</h4>
              <p style="color: #166534; font-size: 16px; margin: 0;">
                You're now officially checked in for the birthday celebration!
              </p>
            </div>

            ${extraGuests > 0 ? `
              <div style="background: #fef3c7; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center;">
                <p style="color: #78350f; font-size: 16px; margin: 0; font-weight: 600;">
                  + ${extraGuests} extra guest${extraGuests > 1 ? 's' : ''} checked in with you
                </p>
              </div>
            ` : ''}
            
            <!-- Check-in Confirmation -->
            <div style="background: #e0f2fe; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
              <h4 style="color: #0369a1; margin: 0 0 10px 0; font-size: 18px;">Check-in Confirmation</h4>
              <p style="color: #0369a1; font-size: 16px; margin: 10px 0;">
                <strong>Email:</strong> ${email}<br>
                <strong>Status:</strong> ✅ Checked In<br>
                <strong>Time:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: center;">
              Enjoy the celebration! Have a wonderful time! 🥂🎂
            </p>
          </div>
          
         <!-- Grace Banner -->
          <div style="background: #fef3c7; padding: 15px; border-radius: 10px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; right: 0; width: 80px; height: 100%; background: linear-gradient(to left, rgba(245, 158, 11, 0.3), transparent);"></div>
            <div style="position: relative; z-index: 10;">
              <div style="color: #92400e; font-size: 12px; font-weight: 500; margin-bottom: 2px;">four decades of</div>
              <div style="color: #78350f; font-size: 18px; font-weight: bold;">Grace</div>
            </div>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">
            <p>Best regards,<br>The Birthday Celebration Team</p>
          </div>
        </div>
      `,
  }

  console.log('Sending check-in email to:', email)

  const resend = new Resend(process.env.RESENDER_API_KEY || '');

  const info = resend.emails.send(mailOptions)

  return info
}
