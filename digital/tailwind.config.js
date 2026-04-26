/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mars: { DEFAULT: '#c0392b', light: '#e74c3c', dark: '#8b2418' },
        minerva: { DEFAULT: '#2980b9', light: '#3498db', dark: '#1a5278' },
        apollo: { DEFAULT: '#d4ac0d', light: '#f1c40f', dark: '#9a7d09' },
        diana: { DEFAULT: '#7d3c98', light: '#9b59b6', dark: '#5b2c6f' },
        parchment: { DEFAULT: '#d4c9a8', dark: '#a89a73' },
      },
      fontFamily: {
        display: ['Cinzel Decorative', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
