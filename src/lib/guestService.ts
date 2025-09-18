import { Guest, RegistrationFormData } from '@/types'

export const registerGuest = async (formData: RegistrationFormData): Promise<{success: boolean; guestId?: string; error?: string}> => {
  try {
    const response = await fetch('/api/guests/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.log('Error registering guest:', error)
    return {
      success: false,
      error: 'Failed to register guest. Please try again.'
    }
  }
}

export const checkInGuest = async (email: string): Promise<{success: boolean; guestName?: string; extraGuests?: number; isAlreadyCheckedIn?: boolean; error?: string}> => {
  try {
    const response = await fetch('/api/guests/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error checking in guest:', error)
    return {
      success: false,
      error: 'Failed to check in guest. Please try again.'
    }
  }
}

export const getAllGuests = async (): Promise<{success: boolean; guests?: Guest[]; error?: string}> => {
  try {
    const response = await fetch('/api/guests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching guests:', error)
    return {
      success: false,
      error: 'Failed to fetch guests'
    }
  }
}