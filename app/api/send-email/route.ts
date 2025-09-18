import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, guestName } = await request.json()

    if (!email || !guestName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to the Birthday Celebration!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fefdf8 0%, #fdf9e7 100%); padding: 40px; border-radius: 20px; position: relative; overflow: hidden;">
          <!-- Gold Glitter Background -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 60px; background: linear-gradient(to bottom, rgba(245, 158, 11, 0.2), transparent);"></div>
          
          <div style="text-align: center; margin-bottom: 30px; position: relative; z-index: 10;">
            <h1 style="color: #92400e; font-size: 32px; margin: 0; font-family: 'Dancing Script', cursive; font-weight: 600;">Level 40 Unlocked</h1>
            <div style="width: 60px; height: 2px; background: #d97706; margin: 10px auto;"></div>
            <h2 style="color: #b45309; font-size: 48px; margin: 20px 0; font-family: 'Dancing Script', cursive; font-weight: 700;">Let's Party</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 20px; position: relative; z-index: 10;">
            <h3 style="color: #78350f; font-size: 24px; margin-bottom: 20px; text-align: center;">Hello ${guestName}! 👋</h3>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
              Welcome to the birthday celebration! Use your email address to check in at the event.
            </p>
            
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
                2. Provide your email address: <strong>${email}</strong><br>
                3. Get your name marked as checked in!<br><br>
                <em>No code needed - just your email address!</em>
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: center;">
              We're excited to celebrate with you! See you at the party! 🥂
            </p>
          </div>
          
          <!-- Special Invitation Banner -->
          <div style="background: linear-gradient(to right, #fbbf24, #f59e0b); padding: 15px; border-radius: 10px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; right: 0; width: 80px; height: 100%; background: linear-gradient(to left, rgba(245, 158, 11, 0.3), transparent);"></div>
            <div style="position: relative; z-index: 10;">
              <div style="color: #92400e; font-size: 12px; font-weight: 500; margin-bottom: 2px;">four decades of</div>
              <div style="color: #78350f; font-size: 18px; font-weight: bold;">SPECIAL INVITATION</div>
            </div>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">
            <p>Best regards,<br>The Birthday Celebration Team</p>
          </div>
        </div>
      `,
    }

    console.log('Sending email to:', email)
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({
      success: false,
      error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 })
  }
}
