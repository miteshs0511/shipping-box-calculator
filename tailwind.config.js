/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4aa1ff',
        secondary: '#6455ff',
        neutral: '#F5F7FA',
        textDark: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
