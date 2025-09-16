import { NextRequest, NextResponse } from 'next/server'
import { databases, DATABASE_ID, GUESTS_COLLECTION_ID, Query } from '@/lib/appwrite'
import { Guest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { uniqueCode } = await request.json()
    
    if (!uniqueCode) {
      return NextResponse.json(
        { success: false, error: 'Unique code is required' },
        { status: 400 }
      )
    }

    // Find guest by unique code
    console.log('Searching for unique code:', uniqueCode)
    console.log('Searching for unique code (uppercase):', uniqueCode.toUpperCase())
    
    // Try both cases
    let guestQuery = await databases.listDocuments(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      [Query.equal("uniqueCode", uniqueCode)]
    )
    
    // If not found, try uppercase
    if (guestQuery.documents.length === 0) {
      guestQuery = await databases.listDocuments(
        DATABASE_ID,
        GUESTS_COLLECTION_ID,
        [Query.equal("uniqueCode", uniqueCode.toUpperCase())]
      )
    }
    
    console.log('Query result:', guestQuery.documents.length, 'documents found')

    if (guestQuery.documents.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid check-in code. Please verify your code and try again.'
      })
    }

    const guestDoc = guestQuery.documents[0]
    const guestData = guestDoc as unknown as Guest

    // Check if already checked in
    if (guestData.isCheckedIn) {
      return NextResponse.json({
        success: true,
        guestName: `${guestData.firstName} ${guestData.lastName}`,
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

    return NextResponse.json({
      success: true,
      guestName: `${guestData.firstName} ${guestData.lastName}`,
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
