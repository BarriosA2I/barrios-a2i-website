import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Barrios A2I Brand Colors - Aura Design Palette
        brand: {
          deep: '#0A1628',
          panel: '#0F172A',
          teal: '#00C2FF',
          orange: '#F97316',
          muted: '#94A3B8',
        },
        navy: {
          950: '#050A14',
          900: '#0B1221',
          800: '#151E32',
        },
        neon: {
          cyan: '#00C2FF',
          blue: '#007CFF',
          gold: '#FFD600',
          purple: '#7B2BF9',
        },
        // Legacy support
        'cyber-cyan': '#00C2FF',
        'cyber-gold': '#FFD600',
        'navy-deep': '#0A1628',
        'navy-light': '#0B1221',
        // Semantic
        background: '#0A1628',
        foreground: '#ffffff',
        muted: '#94a3b8',
        border: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 234, 255, 0.5)',
        'glow-gold': '0 0 20px rgba(255, 214, 0, 0.5)',
        'glow-cyan-lg': '0 0 40px rgba(0, 234, 255, 0.6)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 15s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
