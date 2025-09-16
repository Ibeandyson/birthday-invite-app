import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100">
      {/* Celebration Effects Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold Glitter Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gold-200/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-32 bg-gradient-to-t from-gold-200/30 to-transparent"></div>
        
        {/* Glitter particles */}
        <div className="absolute top-4 left-1/4 w-1 h-1 bg-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 left-1/3 w-1 h-1 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-12 left-1/2 w-1 h-1 bg-gold-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-6 right-1/4 w-1 h-1 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-10 right-1/3 w-1 h-1 bg-gold-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/5 w-1 h-1 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-16 right-1/5 w-1 h-1 bg-gold-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>

        {/* Confetti - Full Width Coverage */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute top-0 w-2 h-2 bg-gold-400 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 29) * 100}%`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: i % 4 === 0 ? '#f59e0b' : i % 4 === 1 ? '#fbbf24' : i % 4 === 2 ? '#fcd34d' : '#fde68a'
            }}
          />
        ))}

        {/* Colorful Confetti - Full Width */}
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={`color-confetti-${i}`}
            className="absolute top-0 w-1.5 h-1.5 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 24) * 100}%`,
              animationDuration: `${3.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 4}s`,
              backgroundColor: ['#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'][i % 5]
            }}
          />
        ))}

        {/* Streamers - Full Width Coverage */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`streamer-${i}`}
            className="absolute top-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600 animate-streamer-flow"
            style={{
              left: `${(i / 19) * 100}%`,
              height: `${14 + Math.random() * 12}px`,
              animationDuration: `${3.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}

        {/* Balloons - Full Width Distribution */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`balloon-${i}`}
            className="absolute top-0 w-4 h-6 rounded-full animate-balloon-float"
            style={{
              left: `${(i / 11) * 100}%`,
              animationDuration: `${5 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 4}s`,
              background: `linear-gradient(to bottom, ${['#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][i % 6]}, ${['#be185d', '#1d4ed8', '#047857', '#7c3aed', '#d97706', '#dc2626'][i % 6]})`
            }}
          />
        ))}

        {/* Additional Confetti Layer */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`extra-confetti-${i}`}
            className="absolute top-0 w-1 h-1 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 19) * 100}%`,
              animationDuration: `${4 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: ['#fbbf24', '#f59e0b', '#d97706', '#b45309'][i % 4]
            }}
          />
        ))}
      </div>
      
      {/* Main Invitation */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-white/30">
            {/* Top Glitter Effect */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gold-200/40 to-transparent"></div>
            
            <div className="text-center relative z-10">
              {/* Level 40 Unlocked */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-elegant text-gold-800 mb-2 fade-in" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Level 40 Unlocked
                </h1>
                <div className="w-24 h-0.5 bg-gold-600 mx-auto"></div>
              </div>

              {/* Let's Party */}
              <div className="mb-12">
                <h2 className="text-6xl md:text-8xl font-elegant text-gold-700 mb-4 slide-up" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Let's Party
                </h2>
              </div>

              {/* Event Details */}
              <div className="space-y-6 mb-12 text-left max-w-md mx-auto">
                {/* Date */}
                <div className="flex items-center space-x-4 fade-in">
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 font-medium">Friday 3rd October, 2025</span>
                </div>

                {/* Times */}
                <div className="flex items-start space-x-4 fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg text-gray-700 font-medium">2:00pm - Party Time</div>
                    <div className="text-lg text-gray-700 font-medium">7:30pm - Praise Night</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-lg text-gray-700 font-medium">
                    The Stable, Bode Thomas Road, Surulere, Lagos.<br />
                    <span className="text-sm text-gray-600">(by The Traffic Light Leading To Eric Moore Road)</span>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="pt-4 border-t border-gold-200 fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gold-800">DRESS CODE: Glam Up</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center mb-12">
                <Link href="/register" className="btn-primary text-lg py-4 px-12 rounded-full transform hover:scale-105 transition-all duration-300">
                  Register Now
                </Link>
              </div>

              {/* Special Invitation Banner */}
              <div className="relative">
                <div className="bg-gradient-to-r from-gold-200 to-gold-300 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gold-400/30 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="text-sm text-gold-600 font-medium mb-1">four decades of</div>
                    <div className="text-xl font-bold text-gold-800">SPECIAL INVITATION</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
