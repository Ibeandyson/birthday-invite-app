import { NextRequest, NextResponse } from 'next/server'
import { sendAppreciationEmail } from '@/utils/email'

export async function POST(request: NextRequest) {
  try {
    const { email, guestName } = await request.json()

    // Validate required fields
    if (!email || !guestName) {
      return NextResponse.json(
        { success: false, error: 'Email and guest name are required' },
        { status: 400 }
      )
    }

    // Send appreciation email
    const result = await sendAppreciationEmail(email, guestName)

    // Check if result has error property (indicating failure)
    if (result && 'error' in result && result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Appreciation email sent successfully'
    })

  } catch (error) {
    console.error('Error sending appreciation email:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
