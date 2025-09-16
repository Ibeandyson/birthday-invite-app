import Link from 'next/link'
import RegistrationForm from '../../src/components/RegistrationForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100">
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
              <span className="text-gold-600 font-medium">Registration</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-elegant text-gold-700 mb-4 slide-up">
              Guest Registration
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in">
              Join us for the birthday celebration! Fill out the form below to register and receive your unique check-in code.
            </p>
          </div>

          {/* Registration Form */}
          <div className="card fade-in">
            <RegistrationForm />
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium transition-colors duration-200"
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
