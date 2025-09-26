import { NextResponse } from 'next/server'
import { databases, DATABASE_ID, GUESTS_COLLECTION_ID, Query } from '@/lib/appwrite'
import { Guest } from '@/types'

export async function GET() {
  try {
    console.log('Environment check:', {
      hasProjectId: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      hasApiKey: !!process.env.APPWRITE_API_KEY,
      databaseId: DATABASE_ID,
      collectionId: GUESTS_COLLECTION_ID
    })

    // Get all guests
    const guestsQuery = await databases.listDocuments(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      [
        Query.limit(500), // fetch up to 500
        Query.offset(0),  // start at first record
      ]
    )
    
    console.log('Raw guests query result:', {
      total: guestsQuery.total,
      documentsCount: guestsQuery.documents.length
    })
    
    const guests: Guest[] = guestsQuery.documents.map((doc) => ({
      id: doc.$id,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      phone: doc.phone,
      uniqueCode: (doc as any).uniqueCode || '',
      extraGuests: (doc as any).extraGuests || 0,
      isCheckedIn: doc.isCheckedIn,
      registeredAt: doc.$createdAt ? new Date(doc.$createdAt) : new Date(),
      checkedInAt: doc.isCheckedIn ? doc.$updatedAt ? new Date(doc.$updatedAt) : new Date() : undefined
    }))

    console.log(`Fetched ${guests.length} guests from database`)

    return NextResponse.json({
      success: true,
      guests
    })

  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}
