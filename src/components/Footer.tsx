import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gold-800 to-gold-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-elegant mb-4">🎉 Birthday Celebration</h3>
              <p className="text-gold-200 mb-4">
                 ⁠Chika 4 decades of grace registration celebration party for an unforgettable birthday celebration filled with joy, laughter, and wonderful memories.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gold-200 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link href="/register" className="block text-gold-200 hover:text-white transition-colors duration-200">
                  Register
                </Link>
                <Link href="/checkin" className="block text-gold-200 hover:text-white transition-colors duration-200">
                  Check In
                </Link>
                <Link href="/admin" className="block text-gold-200 hover:text-white transition-colors duration-200">
                  Admin Dashboard
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Event Details</h4>
              <div className="space-y-2 text-gold-200">
                <p>📅 Friday 3rd October, 2025</p>
                <p>🕐 2:00pm - Party Time | 7:30pm - Praise Night</p>
                <p>📍 The Stable, Bode Thomas Road, Surulere, Lagos</p>
                <p className="text-gold-300 font-medium">DRESS CODE: Glam Up</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gold-700 mt-8 pt-8 text-center">
            <p className="text-gold-300">
              © 2024 Birthday Celebration. Made with ❤️ for a special day.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
