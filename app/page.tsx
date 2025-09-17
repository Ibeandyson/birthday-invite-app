import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Celebration Effects Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold Glitter Background - Removed gold shades */}
        
        {/* Subtle Glitter particles */}
        <div className="absolute top-4 left-1/4 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#d4af37', opacity: 0.6 }}></div>
        <div className="absolute top-8 left-1/3 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '0.5s', backgroundColor: '#d4af37', opacity: 0.4 }}></div>
        <div className="absolute top-12 left-1/2 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '1s', backgroundColor: '#d4af37', opacity: 0.5 }}></div>
        <div className="absolute top-6 right-1/4 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '1.5s', backgroundColor: '#d4af37', opacity: 0.3 }}></div>
        <div className="absolute top-10 right-1/3 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '2s', backgroundColor: '#d4af37', opacity: 0.6 }}></div>
        <div className="absolute bottom-20 left-1/5 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '0.3s', backgroundColor: '#d4af37', opacity: 0.4 }}></div>
        <div className="absolute bottom-16 right-1/5 w-1 h-1 rounded-full animate-pulse" style={{ animationDelay: '0.8s', backgroundColor: '#d4af37', opacity: 0.5 }}></div>

        {/* Subtle Confetti - Full Width Coverage */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute top-0 w-1 h-1 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 19) * 100}%`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: '#d4af37',
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}

        {/* Subtle Gold Confetti - Full Width */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`color-confetti-${i}`}
            className="absolute top-0 w-1 h-1 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 14) * 100}%`,
              animationDuration: `${3.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 4}s`,
              backgroundColor: '#d4af37',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}

        {/* Subtle Gold Streamers - Full Width Coverage */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`streamer-${i}`}
            className="absolute top-0 w-0.5 animate-streamer-flow"
            style={{
              left: `${(i / 9) * 100}%`,
              height: `${14 + Math.random() * 12}px`,
              animationDuration: `${3.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: '#d4af37',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}

        {/* Champagne Flutes - Full Width Distribution */}
        {Array.from({ length: 25 }, (_, i) => {
          return (
            <div
              key={`champagne-emoji-${i}`}
              className="absolute top-0 animate-balloon-float"
              style={{
                left: `${(i / 24) * 100}%`,
                animationDuration: `${6 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: 0.4 + Math.random() * 0.5,
                fontSize: '48px',
                lineHeight: '1'
              }}
            >
              🥂
            </div>
          );
        })}

        {/* Additional Subtle Confetti Layer */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`extra-confetti-${i}`}
            className="absolute top-0 w-0.5 h-0.5 rounded-full animate-confetti-fall"
            style={{
              left: `${(i / 9) * 100}%`,
              animationDuration: `${4 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: '#d4af37',
              opacity: 0.1 + Math.random() * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Main Invitation */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            {/* Top Gold Glitter Dots - Gradient Effect */}
            <div className="absolute top-4 left-0 w-full h-8 flex justify-center">
              {Array.from({ length: 20 }, (_, i) => {
                const position = i / 19; // 0 to 1
                const opacity = Math.max(0.1, 0.6 - position * 0.5); // Fade from 0.6 to 0.1
                const size = position < 0.3 ? 1.5 : position < 0.7 ? 1 : 0.5; // Larger dots in center
                return (
                  <div
                    key={`top-glitter-${i}`}
                    className="rounded-full animate-pulse"
                    style={{
                      backgroundColor: '#d4af37',
                      opacity: opacity,
                      width: `${size}px`,
                      height: `${size}px`,
                      margin: '0 1px',
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                );
              })}
            </div>
            
            {/* Bottom Right Gold Glitter Dots - Gradient Effect */}
            <div className="absolute bottom-4 right-4 w-32 h-12 flex justify-end items-end">
              {Array.from({ length: 12 }, (_, i) => {
                const position = i / 11; // 0 to 1
                const opacity = Math.max(0.05, 0.4 - position * 0.35); // Fade from 0.4 to 0.05
                const size = position < 0.4 ? 1.2 : 0.8; // Larger dots closer to corner
                return (
                  <div
                    key={`bottom-glitter-${i}`}
                    className="rounded-full animate-pulse"
                    style={{
                      backgroundColor: '#d4af37',
                      opacity: opacity,
                      width: `${size}px`,
                      height: `${size}px`,
                      margin: '0 0.5px',
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                );
              })}
            </div>
            
            <div className="text-center relative z-10">
              {/* Level 40 Unlocked */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-elegant mb-2 fade-in" style={{ fontFamily: 'Dancing Script, cursive', color: '#1a1a1a' }}>
                  Level 40 Unlocked
                </h1>
                <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: '#d4af37' }}></div>
              </div>

              {/* Let's Party */}
              <div className="mb-12">
                <h2 className="text-6xl md:text-8xl font-elegant mb-4 slide-up" style={{ fontFamily: 'Dancing Script, cursive', color: '#1a1a1a' }}>
                  Let's Party
                </h2>
              </div>

              {/* Event Details */}
              <div className="space-y-6 mb-12 text-left max-w-md mx-auto">
                {/* Date */}
                <div className="flex items-center space-x-4 fade-in">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4e4bc' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d4af37' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium" style={{ color: '#1a1a1a' }}>Friday 3rd October, 2025</span>
                </div>

                {/* Times */}
                <div className="flex items-start space-x-4 fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#f4e4bc' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d4af37' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-medium" style={{ color: '#1a1a1a' }}>2:00pm - Party Time</div>
                    <div className="text-lg font-medium" style={{ color: '#1a1a1a' }}>7:30pm - Praise Night</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#f4e4bc' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d4af37' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium" style={{ color: '#1a1a1a' }}>
                    The Stable, Bode Thomas Road, Surulere, Lagos.<br />
                    <span className="text-sm" style={{ color: '#666' }}>(by The Traffic Light Leading To Eric Moore Road)</span>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="pt-4 fade-in" style={{ animationDelay: '0.3s', borderTop: '1px solid #d4af37' }}>
                  <div className="text-center">
                    <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>DRESS CODE: Glam Up</span>
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
                <div className="rounded-lg p-4 relative overflow-hidden" style={{ background: 'linear-gradient(to right, #f4e4bc, #d4af37)' }}>
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-elegant-gold/30 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="text-sm font-medium mb-1" style={{ color: '#b8860b' }}>four decades of</div>
                    <div className="text-xl font-bold" style={{ color: '#1a1a1a' }}>SPECIAL INVITATION</div>
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
