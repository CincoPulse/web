import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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

        secondary: '#2563eb',
        secondaryHover: '#3b82f6',
        secondaryDark: '#172554',
      },
    },
  },
  plugins: [],
};
