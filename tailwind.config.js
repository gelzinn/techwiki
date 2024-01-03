/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'masonry': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      textWrap: {
        'balance': 'balance',
        'pretty': 'pretty',
      },
      letterSpacing: {
        'title': 'clamp(-2px,calc(-1px - .1vw),-.96px)',
      },
      screens: {
        'hd': '1280px',
        'full-hd': '1920px',
      },
      animation: {
        'skew-scroll': 'skew-scroll 20s ease-in-out infinite',
        'skew-scroll-reverse': 'skew-scroll-reverse 20s ease-in-out infinite',
      },
      colors: {
        'zinc': {
          1000: 'rgb(7 7 9)',
        },
      },
    },
  },
};

module.exports = tailwindConfig;