import Link from 'next/link'
import CheckInForm from '../../src/components/CheckInForm'

export default function CheckInPage() {
  return (
    <main className="min-h-screen" style={{ background: '#ffffff' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 slide-up">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gold-600 transition-colors duration-200">
                Home
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium" style={{ color: '#d4af37' }}>Check In</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-elegant mb-4 slide-up" style={{ color: '#1a1a1a' }}>
              Guest Check-In
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in">
              Welcome to the birthday celebration! Enter your unique check-in code to mark your attendance.
            </p>
          </div>

          {/* Check-in Form */}
          <div className="card fade-in">
            <CheckInForm />
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
