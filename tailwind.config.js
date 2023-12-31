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
      keyframes: {
        'skew-scroll': {
          '0%, 100%': {
            transform: 'translateZ(0) translateY(-100%) skewX(5deg) rotateX(-5deg) rotateZ(-5deg)',
          },
          '50%': {
            transform:
              'translateZ(0) translateY(-350%) skewX(5deg) rotateX(-5deg) rotateZ(-5deg)',
          },
        },
        'skew-scroll-reverse': {
          '0%, 100%': {
            transform: 'translateZ(0) translateY(100%)',
          },
          '50%': {
            transform:
              'translateZ(0) translateY(350%)',
          },
        },
      },
    },
  },
};

module.exports = tailwindConfig;