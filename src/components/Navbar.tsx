'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-base">
              ☀️
            </div>
            <div>
              <div className="text-white font-black text-[15px] sm:text-[17px] tracking-wide leading-none">
                HI <span className="text-brand">SKY</span> GROUP
              </div>
              <div className="text-brand/70 text-[9px] sm:text-[10px] tracking-[2px] font-medium">— Let's fly —</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'About Us', 'Products', 'Contact Us'].map(item => (
              <button
                key={item}
                className="text-white/75 hover:text-white text-[13.5px] font-medium transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('send-requirement')}
              className="text-[13.5px] font-semibold text-navy bg-brand hover:bg-brand-dark px-4 py-2 rounded-lg transition-colors"
            >
              Send Requirement
            </button>
            <a
              href="https://wa.me/919625190691"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bf5b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.882l6.195-1.438A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.213-3.677.853.92-3.562-.234-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile: WhatsApp + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => scrollTo('send-requirement')}
              className="text-[12px] font-semibold text-navy bg-brand px-3 py-1.5 rounded-lg"
            >
              Send Requirement
            </button>
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="text-white p-1.5"
              aria-label="Menu"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy/98 border-t border-white/10 py-3 space-y-1">
            {['Home', 'About Us', 'Products', 'Contact Us'].map(item => (
              <button
                key={item}
                className="block w-full text-left px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 text-[14px]"
              >
                {item}
              </button>
            ))}
            <div className="px-4 pt-2 pb-1">
              <a
                href="https://wa.me/919625190691"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-[14px] font-semibold px-4 py-2.5 rounded-lg"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
