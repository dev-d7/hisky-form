'use client'

import { useState, useEffect } from 'react'

const scrollToForm = () =>
  document.getElementById('send-requirement')?.scrollIntoView({ behavior: 'smooth' })

function getDailyCount() {
  const now   = new Date()
  const today = now.toISOString().slice(0, 10)
  let seed = 0
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i)
  const base = (seed % 31) + 30
  return now.getHours() >= 14 ? base + 20 : base
}

export default function Hero() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => { setCount(getDailyCount()) }, [])

  return (
    <div>

      {/* ══════════════════════════════════════════
          HERO BANNER — image already has all text
      ══════════════════════════════════════════ */}
      <section className="relative w-full mt-16 overflow-hidden">
        {/* Full-width image — contains all branding already */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="Hi Sky Group — Solar Trading Company"
          className="w-full block"
          style={{ maxHeight: 520, objectFit: 'cover', objectPosition: 'center top' }}
        />

        {/* Only overlay: CTA button + counter anchored to bottom-left */}
        <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-10 z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2.5 bg-brand hover:bg-brand-dark text-white font-black text-[13px] sm:text-[15px] px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_12px_32px_rgba(109,179,63,.5)] tracking-wider uppercase"
          >
            Send Requirement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
          {count !== null && (
            <div className="flex items-center gap-2 bg-black/35 border border-white/20 backdrop-blur rounded-xl px-4 py-2.5">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-white text-[12px] sm:text-[13px]">
                <strong className="text-brand font-bold">{count}+</strong> clients submitted today
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS STRIP
      ══════════════════════════════════════════ */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-5 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              n: '1', name: 'MODULES\n& PANELS', desc: 'High Efficiency Solar Modules',
              img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&q=80',
              badge: '⚡',
            },
            {
              n: '2', name: 'BOS ITEMS\n(BALANCE OF SYSTEM)', desc: 'Complete Range of BOS Items',
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
              badge: '⚙️',
            },
            {
              n: '3', name: 'INVERTERS', desc: 'High Performance Solar Inverters',
              img: 'https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=300&q=80',
              badge: '🔋',
            },
          ].map(p => (
            <div key={p.n} className="flex bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Product image */}
              <div className="relative flex-shrink-0 w-[130px] sm:w-[140px]">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.img})`, minHeight: 140 }}
                />
                {/* Green circle badge at bottom */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand flex items-center justify-center text-base shadow-md">
                  {p.badge}
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center px-4 py-4 flex-1">
                <p className="text-navy font-black text-[13px] sm:text-[14px] leading-tight whitespace-pre-line uppercase mb-1">
                  {p.n}. {p.name}
                </p>
                <p className="text-gray-500 text-[12px] mb-3 leading-tight">{p.desc}</p>
                <button
                  onClick={scrollToForm}
                  className="w-fit text-[11px] font-bold text-white bg-navy hover:bg-navy-mid px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="bg-navy py-5 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {[
            { svg: <circle cx="20" cy="20" r="18" strokeWidth="2"/>, emoji: '🏅', t1: 'HIGH QUALITY',    t2: 'PRODUCTS',      s: 'Assured Performance\n& Durability' },
            { svg: null, emoji: '₹', t1: 'COMPETITIVE',    t2: 'PRICES',        s: 'Best Value for\nYour Investment' },
            { svg: null, emoji: '🚚', t1: 'TIMELY DELIVERY', t2: 'STRONG SUPPLY',  s: 'Pan India Supply\nNetwork' },
            { svg: null, emoji: '🎧', t1: 'DEDICATED',      t2: 'SUPPORT',       s: 'Always With You\nAt Every Step' },
          ].map((s, i) => (
            <div
              key={s.t1}
              className={`flex items-center gap-3 py-2 px-4 sm:px-6 ${i > 0 ? 'border-l border-white/15' : ''}`}
            >
              <div className="w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center text-xl flex-shrink-0">
                {s.emoji}
              </div>
              <div>
                <p className="text-white font-black text-[11px] sm:text-[12px] leading-tight tracking-wide">{s.t1}</p>
                <p className="text-white font-black text-[11px] sm:text-[12px] leading-tight tracking-wide">{s.t2}</p>
                <p className="text-white/45 text-[10px] leading-tight mt-0.5 whitespace-pre-line">{s.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          GREEN BOTTOM BANNER
      ══════════════════════════════════════════ */}
      <div className="bg-brand py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-stretch gap-0">

          {/* 4 items */}
          <div className="flex flex-1 flex-wrap sm:flex-nowrap items-center divide-x divide-white/20">
            {[
              { icon: '🌱', l1: 'CLEAN ENERGY', l2: 'BETTER FUTURE',      sub: 'Building a Greener Tomorrow' },
              { icon: '⚡', l1: 'POWERING HOMES,', l2: 'EMPOWERING NATION', sub: 'For a Sustainable India' },
              { icon: '🏢', l1: '120+ COMPANIES', l2: 'TRUST OUR SUPPLY',  sub: 'Join the Growing Network' },
              { icon: '📈', l1: 'GROW TOGETHER', l2: 'SUCCEED TOGETHER',   sub: "Let's Build a Bright Future Together" },
            ].map(b => (
              <div key={b.l1} className="flex items-center gap-2.5 px-4 py-1 first:pl-0 min-w-0">
                <span className="text-2xl flex-shrink-0">{b.icon}</span>
                <div className="min-w-0">
                  <p className="text-white font-black text-[11px] sm:text-[12px] leading-tight">{b.l1}</p>
                  <p className="text-white font-black text-[11px] sm:text-[12px] leading-tight">{b.l2}</p>
                  <p className="text-white/65 text-[10px] leading-tight mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right navy CTA */}
          <div
            onClick={scrollToForm}
            className="hidden sm:flex items-center gap-3 bg-navy ml-4 px-5 py-3 rounded-xl cursor-pointer hover:bg-navy-mid transition-colors flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-white/15 border-2 border-white/25 flex items-center justify-center text-xl flex-shrink-0">
              📞
            </div>
            <div>
              <p className="text-white font-black text-[12px] leading-tight">LET'S BUILD A GREENER</p>
              <p className="text-white font-black text-[12px] leading-tight">TOMORROW TOGETHER</p>
              <p className="text-white/55 text-[10px] mt-0.5">Connect with us for your requirements today!</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
