import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2B5E',
          dark:    '#0f1c3d',
          mid:     '#243570',
        },
        brand: {
          DEFAULT: '#6DB33F',
          dark:    '#4a8f25',
        },
      },
      animation: {
        'fade-down': 'fadeDown .55s ease both',
        'fade-up':   'fadeUp   .55s ease both',
        'pop-in':    'popIn    .4s  ease both',
        'blink':     'blink 1.8s ease-in-out infinite',
        'glow':      'glow  3s   ease-in-out infinite',
      },
      keyframes: {
        fadeDown:  { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'none' } },
        fadeUp:    { from: { opacity: '0', transform: 'translateY(16px)'  }, to: { opacity: '1', transform: 'none' } },
        popIn:     { from: { opacity: '0', transform: 'scale(.88)'        }, to: { opacity: '1', transform: 'scale(1)' } },
        blink:     { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.35', transform: 'scale(.7)' } },
        glow:      { '0%,100%': { boxShadow: '0 0 0 0 rgba(109,179,63,0)' }, '50%': { boxShadow: '0 0 0 8px rgba(109,179,63,.08)' } },
      },
    },
  },
}
export default config
