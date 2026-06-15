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

const rightBadges = [
  { icon: '🔆', title: 'PREMIUM\nSOLAR PRODUCTS' },
  { icon: '✅', title: '100%\nGENUINE & RELIABLE' },
  { icon: '🤝', title: 'TRUSTED BY\nPROFESSIONALS,\nCHOSEN BY ALL' },
]

const statsBar = [
  { icon: '✅', title: 'HIGH QUALITY\nPRODUCTS',          sub: 'Assured Performance\n& Durability' },
  { icon: '₹',  title: 'COMPETITIVE\nPRICES',              sub: 'Best Value for\nYour Investment' },
  { icon: '🚚', title: 'TIMELY DELIVERY\nSTRONG SUPPLY',   sub: 'Pan India Supply\nNetwork' },
  { icon: '🎧', title: 'DEDICATED\nSUPPORT',               sub: 'Always With You\nAt Every Step' },
]

const bottomBar = [
  { icon: '🌱', l1: 'CLEAN ENERGY',        l2: 'BETTER FUTURE',          sub: 'Building a Greener Tomorrow' },
  { icon: '⚡', l1: 'POWERING HOMES,',     l2: 'EMPOWERING NATION',      sub: 'For a Sustainable India' },
  { icon: '🏢', l1: '120+ COMPANIES',      l2: 'TRUST OUR SUPPLY',       sub: 'Join the Growing Network' },
  { icon: '📈', l1: 'GROW TOGETHER,',      l2: 'SUCCEED TOGETHER',       sub: "Let's Build a Bright Future Together" },
]

export default function Hero() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => { setCount(getDailyCount()) }, [])

  return (
    <div>

      {/* ══════════════════════════════════════════════
          HERO — full viewport with solar background
      ══════════════════════════════════════════════ */}
      <section
        className="relative w-full pt-16 overflow-hidden"
        style={{ minHeight: '92vh' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Subtle dark overlay so text is readable */}
        <div className="absolute inset-0 z-0 bg-black/30" />

        {/* ── Three-column layout ── */}
        <div className="relative z-10 h-full flex flex-col" style={{ minHeight: 'calc(92vh - 64px)' }}>

          {/* TOP ROW: left-panel | center logo | right badges */}
          <div className="flex flex-1">

            {/* LEFT dark angled panel */}
            <div
              className="hidden lg:flex flex-col justify-start pt-8 pl-8 pr-12 text-white flex-shrink-0"
              style={{
                minWidth: 220,
                background: 'linear-gradient(135deg, rgba(11,21,45,0.92) 60%, transparent 100%)',
                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
              }}
            >
              <div className="text-4xl mb-3">☀️</div>
              <p className="text-[13px] font-bold tracking-widest text-white/80 leading-tight">
                POWER TODAY
              </p>
              <p className="text-brand font-black text-[15px] tracking-widest leading-tight">
                GREENER
              </p>
              <p className="text-[13px] font-bold tracking-widest text-white/80 leading-tight">
                TOMORROW
              </p>
            </div>

            {/* CENTER: Company branding */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4">
              {/* Bird logo SVG */}
              <svg width="70" height="56" viewBox="0 0 80 64" fill="none" className="mb-2 drop-shadow-xl">
                <path d="M8 45 Q22 8 68 16 Q45 30 40 52 Q34 34 8 45Z" fill="#1B2B5E" opacity="0.9"/>
                <path d="M40 52 Q48 24 72 20 Q58 36 50 58Z" fill="#6DB33F" opacity="0.9"/>
              </svg>

              <h1 className="font-black text-navy leading-none tracking-tight drop-shadow-2xl"
                style={{ fontSize: 'clamp(52px, 10vw, 110px)' }}>
                HI&nbsp;<span style={{ color: '#1B2B5E' }}>SKY</span>
              </h1>
              <p className="text-brand font-bold italic tracking-[6px] text-[16px] sm:text-[20px] mt-1">
                — Let's fly —
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-12 bg-navy/60" />
                <p className="text-navy/80 text-[11px] sm:text-[13px] tracking-[4px] font-semibold uppercase">
                  Solar Trading Company
                </p>
                <div className="h-px w-12 bg-navy/60" />
              </div>
            </div>

            {/* RIGHT badges */}
            <div className="hidden lg:flex flex-col justify-center gap-3 pr-8 flex-shrink-0" style={{ minWidth: 200 }}>
              {rightBadges.map((b) => (
                <div key={b.title} className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg min-w-[180px]">
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <p className="text-navy font-black text-[11px] leading-tight whitespace-pre-line uppercase tracking-wide">
                    {b.title}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* BOTTOM ROW: tagline + CTA */}
          <div
            className="px-6 sm:px-10 py-8"
            style={{ background: 'linear-gradient(to top, rgba(11,21,45,0.85) 80%, transparent)' }}
          >
            <div className="max-w-xl">
              <p className="text-white font-black leading-tight drop-shadow-lg"
                style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                STRONG PRODUCTS.
              </p>
              <p className="text-brand font-black leading-tight drop-shadow-lg"
                style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                STRONGER FUTURE.
              </p>
              <p className="text-white/75 text-[14px] sm:text-[16px] mt-2 mb-6">
                One Stop Solution for All Your Solar Needs
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={scrollToForm}
                  className="flex items-center gap-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(109,179,63,.5)] tracking-wide"
                >
                  SEND REQUIREMENT
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
                {count !== null && (
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                    <span className="text-white text-[13px]">
                      <strong className="text-brand">{count}+</strong> clients submitted today
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRODUCTS STRIP
      ══════════════════════════════════════════════ */}
      <div className="bg-white py-7 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: '1', name: 'MODULES\n& PANELS',                img: 'https://images.unsplash.com/photo-1545209463-e2825498edbf?w=120&q=80', desc: 'High Efficiency Solar Modules' },
            { n: '2', name: 'BOS ITEMS\n(BALANCE OF SYSTEM)',   img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80', desc: 'Complete Range of BOS Items' },
            { n: '3', name: 'INVERTERS',                        img: 'https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=120&q=80', desc: 'High Performance Solar Inverters' },
          ].map(p => (
            <div key={p.n} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-brand/30 hover:shadow-md transition-all">
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 bg-gray-100 bg-cover bg-center"
                style={{ backgroundImage: `url(${p.img})` }}
              />
              <div className="flex-1">
                <p className="text-gray-400 text-[10px] font-bold">{p.n}.</p>
                <p className="text-navy font-black text-[13px] sm:text-[14px] leading-tight whitespace-pre-line uppercase">{p.name}</p>
                <p className="text-gray-500 text-[12px] mt-1">{p.desc}</p>
                <button
                  onClick={scrollToForm}
                  className="mt-2 text-[11px] font-bold text-white bg-navy hover:bg-navy-mid px-4 py-1.5 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
      <div className="bg-navy py-5 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/10">
          {statsBar.map((s, i) => (
            <div key={s.title} className={`flex items-start gap-3 px-5 ${i === 0 ? 'pl-0' : ''}`}>
              <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                {s.icon}
              </div>
              <div>
                <p className="text-white font-black text-[11px] sm:text-[12px] leading-tight whitespace-pre-line uppercase tracking-wide">{s.title}</p>
                <p className="text-white/45 text-[10px] sm:text-[11px] leading-tight mt-0.5 whitespace-pre-line">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          GREEN BOTTOM BANNER
      ══════════════════════════════════════════════ */}
      <div className="bg-brand py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-stretch gap-0">
          {/* Left items */}
          <div className="flex flex-1 flex-wrap items-center gap-0 divide-x divide-white/20">
            {bottomBar.map((b) => (
              <div key={b.l1} className="flex items-center gap-2.5 px-4 py-1 first:pl-0">
                <span className="text-xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="text-white font-black text-[11px] leading-none">{b.l1}</p>
                  <p className="text-white font-black text-[11px] leading-none">{b.l2}</p>
                  <p className="text-white/60 text-[10px] leading-tight mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right CTA box */}
          <div
            onClick={scrollToForm}
            className="flex items-center gap-3 bg-navy ml-4 px-5 py-3 rounded-xl cursor-pointer hover:bg-navy-mid transition-colors flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl flex-shrink-0">
              📞
            </div>
            <div>
              <p className="text-white font-black text-[12px] leading-tight">LET'S BUILD A GREENER</p>
              <p className="text-white font-black text-[12px] leading-tight">TOMORROW TOGETHER</p>
              <p className="text-white/60 text-[10px] mt-0.5">Connect with us for your requirements today!</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
