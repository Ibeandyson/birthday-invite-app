import { NextRequest, NextResponse } from 'next/server'
import { databases, DATABASE_ID, GUESTS_COLLECTION_ID, Query } from '@/lib/appwrite'
import { Guest } from '@/types'
import { sendCheckInEmail } from '@/utils/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Find guest by email
    console.log('Searching for email:', email)
    
    const guestQuery = await databases.listDocuments(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      [Query.equal("email", email.toLowerCase())]
    )
    
    console.log('Query result:', guestQuery.documents.length, 'documents found')

    if (guestQuery.documents.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No guest found with this email address. Please verify your email and try again.'
      })
    }

    const guestDoc = guestQuery.documents[0]
    const guestData = guestDoc as unknown as Guest

    // Check if already checked in
    if (guestData.isCheckedIn) {
      return NextResponse.json({
        success: true,
        guestName: `${guestData.firstName} ${guestData.lastName}`,
        extraGuests: (guestData as any).extraGuests || 0,
        isAlreadyCheckedIn: true
      })
    }

    // Update check-in status
    await databases.updateDocument(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      guestDoc.$id,
      {
        isCheckedIn: true
      }
    )

    // Send check-in confirmation email
    try {
      const emailInfo = sendCheckInEmail(
        email, 
        `${guestData.firstName} ${guestData.lastName}`, 
        (guestData as any).extraGuests || 0
      )
      console.log('Check-in email sent response:', emailInfo)
    } catch (emailError) {
      console.error('Error sending check-in email:', emailError)
      // Don't fail the check-in if email fails
    }

    return NextResponse.json({
      success: true,
      guestName: `${guestData.firstName} ${guestData.lastName}`,
      extraGuests: (guestData as any).extraGuests || 0,
      isAlreadyCheckedIn: false
    })

  } catch (error) {
    console.error('Error checking in guest:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check in guest. Please try again.' },
      { status: 500 }
    )
  }
}
