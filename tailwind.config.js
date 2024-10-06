import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)'],
      },
      screens: {
        '3xl': '1792px',
        xs: '30rem',
      },
      colors: {
        ...colors,

        textPrimary: '#121312',
        textSecondary: '#8f8e93',

        secondary: '#99E515',
        secondaryHover: '#8BD013',
      },
    },
  },
  plugins: [],
};
