import { NextResponse } from 'next/server'
import { databases, DATABASE_ID, GUESTS_COLLECTION_ID } from '@/lib/appwrite'
import { Guest } from '@/types'

export async function GET() {
  try {
    const guestsQuery = await databases.listDocuments(
      DATABASE_ID,
      GUESTS_COLLECTION_ID
    )
    
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
