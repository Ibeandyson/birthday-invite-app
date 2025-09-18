'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllGuests } from '../../src/lib/guestService'
import { Guest } from '../../src/types'

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

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

  const downloadCSV = () => {
    setDownloading(true)
    let downloadSuccess = false
    
    try {
      console.log('Starting CSV download, guests count:', guests.length)
      
      if (guests.length === 0) {
        alert('No guests data available to download.')
        setDownloading(false)
        return
      }

      const headers = [
        'Name',
        'Email', 
        'Phone',
        'Extra Guests',
        'Status',
        'Registered Date',
        'Checked In Date',
        'Unique Code'
      ]

      const csvData = guests.map((guest, index) => {
        console.log(`Processing guest ${index + 1}:`, guest)
        return [
          `"${(guest.firstName || '').replace(/"/g, '""')} ${(guest.lastName || '').replace(/"/g, '""')}"`,
          `"${(guest.email || '').replace(/"/g, '""')}"`,
          `"${(guest.phone || '').replace(/"/g, '""')}"`,
          guest.extraGuests || 0,
          guest.isCheckedIn ? 'Checked In' : 'Not Checked In',
          `"${guest.registeredAt ? new Date(guest.registeredAt).toLocaleDateString() : 'N/A'}"`,
          guest.checkedInAt ? `"${new Date(guest.checkedInAt).toLocaleDateString()}"` : 'Not Checked In',
          `"${(guest.uniqueCode || 'N/A').replace(/"/g, '""')}"`
        ]
      })

      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n')

      console.log('CSV Content preview:', csvContent.substring(0, 500) + '...')

      // Create and download the file
      const blob = new Blob([csvContent], { 
        type: 'text/csv;charset=utf-8;' 
      })
      
      console.log('Blob created, size:', blob.size)
      
      const url = URL.createObjectURL(blob)
      console.log('Object URL created:', url)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `birthday-guests-${new Date().toISOString().split('T')[0]}.csv`
      link.style.display = 'none'
      
      // Add event listener to detect successful download
      link.addEventListener('click', () => {
        downloadSuccess = true
        console.log('Download initiated successfully')
      })
      
      document.body.appendChild(link)
      console.log('Link added to DOM, clicking...')
      
      link.click()
      console.log('Link clicked')
      
      // Only run fallback if primary download didn't work
      setTimeout(() => {
        if (!downloadSuccess) {
          console.log('Primary download may have failed, trying fallback...')
          try {
            const newWindow = window.open(url, '_blank')
            if (!newWindow) {
              console.log('Popup blocked, trying alternative method...')
              // Alternative method: create a data URL
              const dataUrl = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
              const fallbackLink = document.createElement('a')
              fallbackLink.href = dataUrl
              fallbackLink.download = `birthday-guests-${new Date().toISOString().split('T')[0]}.csv`
              fallbackLink.click()
            }
          } catch (fallbackError) {
            console.error('Fallback method also failed:', fallbackError)
          }
        } else {
          console.log('Primary download succeeded, skipping fallback')
        }
      }, 1000)
      
      // Cleanup
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link)
        }
        URL.revokeObjectURL(url)
        setDownloading(false)
        console.log('Cleanup completed')
      }, 3000)
      
    } catch (error) {
      console.error('Error downloading CSV:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const errorStack = error instanceof Error ? error.stack : 'No stack trace'
      console.error('Error details:', {
        message: errorMessage,
        stack: errorStack,
        guestsLength: guests.length
      })
      alert(`Error downloading CSV file: ${errorMessage}. Please check the console for details.`)
      setDownloading(false)
    }
  }

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

          {/* Download CSV Button */}
          <div className="mb-8 text-center fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={downloadCSV}
              disabled={downloading}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CSV
                </>
              )}
            </button>
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
