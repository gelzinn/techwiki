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
      screens: {
        'hd': '1280px',
        'full-hd': '1920px',
      },
      animation: {
        'skew-scroll': 'skew-scroll 20s ease-in-out infinite',
      },
      keyframes: {
        'skew-scroll': {
          '0%, 100%': {
            transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
          },
          '50%': {
            transform:
              'rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-350%)',
          },
        },
      },
    },
  },
};

module.exports = tailwindConfig;