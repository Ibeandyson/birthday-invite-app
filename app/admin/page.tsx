'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllGuests } from '../../src/lib/guestService'
import { Guest } from '../../src/types'

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const result = await getAllGuests()
        if (result.success) {
          setGuests(result.guests || [])
        } else {
          setError(result.error || 'Failed to fetch guests')
        }
      } catch (err) {
        setError('An error occurred while fetching guests')
      } finally {
        setLoading(false)
      }
    }

    fetchGuests()
  }, [])

  const checkedInCount = guests.filter(guest => guest.isCheckedIn).length
  const totalCount = guests.length
  const totalExtraGuests = guests.reduce((sum, guest) => sum + (guest.extraGuests || 0), 0)
  const totalAttendees =  Number(totalCount) + Number(totalExtraGuests)

  if (loading) {
    return (
      <main className="min-h-screen" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading guests...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 slide-up">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gold-600 transition-colors duration-200">
                Home
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium" style={{ color: '#d4af37' }}>Admin Dashboard</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-elegant mb-4 slide-up" style={{ color: '#1a1a1a' }}>
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in">
              Manage guest registrations and check-ins for the birthday celebration.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="card text-center fade-in">
              <div className="text-3xl font-bold mb-2" style={{ color: '#d4af37' }}>{totalCount}</div>
              <div className="text-gray-600">Registered Guests</div>
            </div>
            <div className="card text-center fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalExtraGuests}</div>
              <div className="text-gray-600">Extra Guests</div>
            </div>
            <div className="card text-center fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalAttendees}</div>
              <div className="text-gray-600">Total Attendees</div>
            </div>
            <div className="card text-center fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-green-600 mb-2">{checkedInCount}</div>
              <div className="text-gray-600">Checked In</div>
            </div>
          </div>

          {/* Guests Table */}
          <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Extra Guests</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest, index) => (
                    <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {guest.firstName} {guest.lastName}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{guest.email}</td>
                      <td className="py-3 px-4 text-gray-600">{guest.phone}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {guest.extraGuests > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            +{guest.extraGuests}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          guest.isCheckedIn 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.isCheckedIn ? 'Checked In' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(guest.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center font-medium transition-colors duration-200"
              style={{ color: '#d4af37' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
