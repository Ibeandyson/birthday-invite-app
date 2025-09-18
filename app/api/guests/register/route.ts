import { NextRequest, NextResponse } from 'next/server'
import { databases, ID, DATABASE_ID, GUESTS_COLLECTION_ID, Permission, Role, Query } from '@/lib/appwrite'
import { generateUniqueCode } from '@/utils/uniqueCode'
import { sendEmail } from '@/utils/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    console.log('Environment check:', {
      hasProjectId: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      hasApiKey: !!process.env.APPWRITE_API_KEY,
      databaseId: DATABASE_ID,
      collectionId: GUESTS_COLLECTION_ID
    })

    if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
      console.error('Missing Appwrite environment variables')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Check if email already exists
    try {
      console.log('Attempting to check for existing email...')
      const emailQuery = await databases.listDocuments(
        DATABASE_ID,
        GUESTS_COLLECTION_ID,
        [Query.equal("email", formData.email.toLowerCase())]
      );
      console.log('Email query successful')

      if (emailQuery.documents.length > 0) {
        return NextResponse.json({
          success: false,
          error: 'Email address is already registered'
        })
      }
    } catch (error) {
      console.error('Error checking for existing email:', error)
      // Don't throw error, just log and continue
    }


    // Generate unique code for the guest
    const uniqueCode = generateUniqueCode()

    // Create guest document - only include fields that exist in the collection
    const guestData = {
      email: formData.email.toLowerCase(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      uniqueCode: uniqueCode,
      extraGuests: formData.extraGuests,
      isCheckedIn: false
    }

    console.log('Creating guest document...')
    const document = await databases.createDocument(
      DATABASE_ID,
      GUESTS_COLLECTION_ID,
      ID.unique(),
      guestData,
    )
    console.log('Guest document created successfully:', document.$id)

    // Return success immediately after database save
    const response = NextResponse.json({
      success: true,
      guestId: document.$id
    })

    // Send verification email asynchronously (non-blocking)
    const emailInfo = sendEmail(formData.email, `${formData.firstName} ${formData.lastName}`, formData.extraGuests || 0)
    console.log('Email sent response:', emailInfo)

    return response

  } catch (error) {
    console.error('Error registering guest:', error)

    // Check if it's a database error
    if (error instanceof Error) {
      if (error.message.includes('Database not found')) {
        return NextResponse.json(
          { success: false, error: 'Database not found. Please check your Appwrite configuration.' },
          { status: 500 }
        )
      }
      if (error.message.includes('Collection not found')) {
        return NextResponse.json(
          { success: false, error: 'Collection not found. Please check your Appwrite configuration.' },
          { status: 500 }
        )
      }
      if (error.message.includes('unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized. Please check your API key.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to register guest. Please try again.' },
      { status: 500 }
    )
  }
}
