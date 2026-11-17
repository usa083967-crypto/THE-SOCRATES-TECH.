/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050d24', 900: '#0a1a44', 800: '#10286a', 700: '#173a8f' },
        royal: { 500: '#2754d6', 600: '#1f44b3', 400: '#4f78ee' },
        gold: { 400: '#f2c14e', 500: '#d4a017', 600: '#b38612' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: { fadeUp: 'fadeUp .7s ease both' },
    },
  },
  plugins: [],
}
