'use client'

const logos = [
  { src: '/logo1.jpg',  alt: 'Partner 1' },
  { src: '/logo2.jpg',  alt: 'Partner 2' },
  { src: '/logo3.png',  alt: 'Partner 3' },
  { src: '/logo4.jpg',  alt: 'Partner 4' },
  { src: '/logo5.png',  alt: 'Partner 5' },
  { src: '/logo6.jpg',  alt: 'Partner 6' },
  { src: '/logo7.png',  alt: 'Partner 7' },
  { src: '/logo8.png',  alt: 'Partner 8' },
  { src: '/logo9.png',  alt: 'Partner 9' },
  { src: '/logo10.png', alt: 'Partner 10' },
  { src: '/logo11.png', alt: 'Partner 11' },
  { src: '/logo12.png', alt: 'Partner 12' },
  { src: '/logo13.png', alt: 'Partner 13' },
  { src: '/logo14.jpg', alt: 'Partner 14' },
  { src: '/logo15.jpg', alt: 'Partner 15' },
  { src: '/logo16.png', alt: 'Partner 16' },
  { src: '/logo17.jpg', alt: 'Partner 17' },
  { src: '/logo18.jpg', alt: 'Partner 18' },
]

export default function PartnerLogos() {
  return (
    <section className="bg-white border-t border-gray-100 py-8 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-6 px-4">
        <p className="text-[11px] font-bold tracking-[3px] text-gray-400 uppercase">
          Trusted By Leading Brands
        </p>
        <h3 className="text-navy font-black text-[18px] sm:text-[22px] mt-1">
          Our Valued Partners &amp; Clients
        </h3>
      </div>

      {/* Marquee wrapper — faded edges */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        {/* Track */}
        <div className="flex gap-6 marquee-track">
          {/* Render logos twice for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 hover:border-brand/30 hover:shadow-md transition-all duration-200"
              style={{ width: 140, height: 72 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: 48, maxWidth: 110 }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
