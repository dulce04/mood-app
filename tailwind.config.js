/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      colors: {
        'mood': {
          'calm': '#87CEEB',
          'happy': '#FFD700',
          'energetic': '#FF6347',
          'peaceful': '#98FB98',
          'creative': '#DA70D6',
          'melancholy': '#778899',
        }
      },
      fontFamily: {
        'korean': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 