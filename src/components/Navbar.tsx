'use client'

import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[64px]">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Hi Sky Group" className="h-12 sm:h-14 w-auto object-contain" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'HOME',             id: '' },
              { label: 'ABOUT US',         id: '' },
              { label: 'PRODUCTS',         id: '' },
              { label: 'SEND REQUIREMENT', id: 'send-requirement' },
              { label: 'CONTACT US',       id: '' },
            ].map(({ label, id }) => (
              <button
                key={label}
                onClick={() => id && scrollTo(id)}
                className={`px-3 py-1.5 text-[12px] font-semibold tracking-wide transition-colors
                  ${label === 'HOME'
                    ? 'text-brand border-b-2 border-brand'
                    : label === 'SEND REQUIREMENT'
                      ? 'text-navy hover:text-brand'
                      : 'text-gray-600 hover:text-navy'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/919625190691"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bf5b] text-white font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.882l6.195-1.438A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.213-3.677.853.92-3.562-.234-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => scrollTo('send-requirement')}
              className="text-[11px] font-bold text-white bg-brand px-3 py-1.5 rounded-lg"
            >
              Send Req
            </button>
            <button onClick={() => setMenuOpen(p => !p)} className="text-navy p-1">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 bg-white">
            {['HOME', 'ABOUT US', 'PRODUCTS', 'CONTACT US'].map(item => (
              <button key={item} className="block w-full text-left px-4 py-2.5 text-gray-600 hover:text-navy text-[13px] font-medium">
                {item}
              </button>
            ))}
            <div className="px-4 pt-2">
              <a
                href="https://wa.me/919625190691"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-[13px] px-4 py-2.5 rounded-lg"
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
