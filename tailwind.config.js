/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pearl:    '#FAFAFC',
        slate:    '#F1F5F9',
        ink:      '#09090B',
        electric: '#2563EB',
        cyan:     '#06B6D4',
        violet:   '#7C3AED',
        amber:    '#F59E0B',
        glass:    'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':   'fade-in 0.6s ease forwards',
        shimmer:     'shimmer 3s linear infinite',
        float:       'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
