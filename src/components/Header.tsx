import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-50 to-cream-50 opacity-50"></div>
      <div className="container mx-auto px-4 py-6 relative">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-6">
          <Link href="/" className="text-2xl font-elegant text-gold-700 hover:text-gold-800 transition-colors duration-200">
            🎉 Birthday Celebration
          </Link>
          <div className="flex space-x-6">
            <Link 
              href="/register" 
              className="text-gold-600 hover:text-gold-700 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Register
            </Link>
            <Link 
              href="/checkin" 
              className="text-gold-600 hover:text-gold-700 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Check In
            </Link>
            <Link 
              href="/admin" 
              className="text-gold-600 hover:text-gold-700 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Admin
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center">
          <div className="float mb-4">
            <h1 className="text-3xl md:text-5xl font-elegant text-gold-700 mb-2 fade-in">
              🎉 Birthday Celebration 🎉
            </h1>
          </div>
          <p className="text-lg text-gold-600 font-medium slide-up">
            Join us for a special celebration!
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </header>
  )
}
