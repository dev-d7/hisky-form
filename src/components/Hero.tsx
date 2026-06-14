'use client'

import { useState, useEffect } from 'react'

const scrollToForm = () =>
  document.getElementById('send-requirement')?.scrollIntoView({ behavior: 'smooth' })

function getDailyCount() {
  const now  = new Date()
  const today = now.toISOString().slice(0, 10)
  let seed = 0
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i)
  const base = (seed % 31) + 30          // 30–60, same on all devices
  return now.getHours() >= 14 ? base + 20 : base   // +20 after 2 PM
}

const products = [
  { n: '01', name: 'Modules & Panels',  desc: 'High Efficiency Solar Modules',       icon: '🔆' },
  { n: '02', name: 'BOS Items',          desc: 'Complete Balance of System Range',    icon: '⚙️' },
  { n: '03', name: 'Inverters',          desc: 'High Performance Solar Inverters',    icon: '🔋' },
]

const stats = [
  { icon: '🏆', value: '120+',    label: 'Companies Trust Us' },
  { icon: '🌍', value: 'PAN',     label: 'India Supply Network' },
  { icon: '✅', value: '100%',    label: 'Genuine & Reliable' },
  { icon: '⚡', value: '24/7',    label: 'Dedicated Support' },
]

export default function Hero() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => { setCount(getDailyCount()) }, [])

  return (
    <div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[#0b1527]" />
        <div className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 0% 50%, rgba(109,179,63,.12) 0%, transparent 65%),
              radial-gradient(ellipse 50% 70% at 100% 20%, rgba(27,43,94,.6) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 50% 100%, rgba(109,179,63,.06) 0%, transparent 60%)
            `,
          }}
        />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #6DB33F 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Top border accent */}
        <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Text ── */}
            <div>
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/25 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-brand text-[12px] font-bold tracking-widest uppercase">Solar Trading Company</span>
              </div>

              {/* Brand name */}
              <h1 className="text-[56px] sm:text-[72px] lg:text-[80px] font-black text-white leading-[.95] tracking-tight mb-2">
                HI&nbsp;<span className="text-brand">SKY</span>
              </h1>
              <p className="text-brand/80 text-[13px] sm:text-[15px] font-semibold tracking-[5px] mb-6">
                — &nbsp;LET'S &nbsp;FLY &nbsp;—
              </p>

              {/* Tagline */}
              <div className="mb-5">
                <p className="text-[30px] sm:text-[40px] font-black text-white leading-tight">
                  STRONG PRODUCTS.
                </p>
                <p className="text-[30px] sm:text-[40px] font-black leading-tight"
                  style={{ WebkitTextStroke: '2px #6DB33F', color: 'transparent' }}>
                  STRONGER FUTURE.
                </p>
              </div>
              <p className="text-white/55 text-[14px] sm:text-[16px] leading-relaxed mb-8 max-w-md">
                One Stop Solution for All Your Solar Needs — Modules, BOS Items &amp; Inverters delivered Pan India.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={scrollToForm}
                  className="group flex items-center justify-center gap-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(109,179,63,.35)]"
                >
                  SEND REQUIREMENT
                  <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <a
                  href="https://wa.me/919625190691"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 text-[#4ade80] font-semibold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.882l6.195-1.438A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.213-3.677.853.92-3.562-.234-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Live counter */}
              <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse flex-shrink-0" />
                <span className="text-white/70 text-[13px]">
                  <span className="text-white font-bold text-[16px]">{count ?? '—'}+</span>
                  {' '}clients submitted today
                </span>
              </div>
            </div>

            {/* ── RIGHT: Stats card grid ── */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: '🔆', title: 'Premium Modules',    sub: 'Top-tier solar panels\nfrom global brands',       color: 'from-brand/20 to-brand/5',   border: 'border-brand/20' },
                { icon: '🛡️', title: '100% Genuine',       sub: 'Verified & certified\nproducts only',             color: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
                { icon: '🚚', title: 'Pan India Supply',   sub: 'Fast & reliable\ndelivery network',               color: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-400/20' },
                { icon: '🤝', title: '120+ Companies',     sub: 'Trusted by businesses\nacross India',             color: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-400/20' },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-5 backdrop-blur-sm`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <p className="text-white font-bold text-[15px] mb-1">{c.title}</p>
                  <p className="text-white/45 text-[12px] leading-relaxed whitespace-pre-line">{c.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToForm}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 transition-colors"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <polyline points="5 8 10 14 15 8" />
          </svg>
        </button>
      </section>

      {/* ════ PRODUCTS + STATS (combined) ════ */}
      <div className="bg-white border-y border-gray-100 py-5 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Products row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {products.map(p => (
              <div
                key={p.n}
                onClick={scrollToForm}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-brand/40 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-brand/8 group-hover:bg-brand/15 flex items-center justify-center text-xl flex-shrink-0 transition-colors">
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-brand font-bold tracking-wider">{p.n}</p>
                  <p className="text-gray-900 font-bold text-[12px] sm:text-[13px] leading-tight truncate">{p.name}</p>
                  <p className="text-gray-400 text-[11px] hidden sm:block truncate">{p.desc}</p>
                </div>
                <svg className="text-gray-300 group-hover:text-brand transition-colors flex-shrink-0 hidden sm:block" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="7" x2="11" y2="7"/><polyline points="7 3 11 7 7 11"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-navy/8 flex items-center justify-center text-base flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-navy font-black text-[15px] sm:text-[17px] leading-none">{s.value}</p>
                  <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ GREEN BOTTOM BANNER ════ */}
      <div className="bg-gradient-to-r from-brand-dark via-brand to-brand-dark py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {[
              ['🌱', 'Clean Energy'],
              ['⚡', 'Pan India Supply'],
              ['🏢', '120+ Companies'],
              ['📈', 'Grow Together'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="text-sm">{icon}</span>
                <span className="text-white font-semibold text-[11px] sm:text-[12px] whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToForm}
            className="bg-white text-brand-dark font-bold text-[12px] sm:text-[13px] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0 shadow-md"
          >
            Send Requirement →
          </button>
        </div>
      </div>

    </div>
  )
}
