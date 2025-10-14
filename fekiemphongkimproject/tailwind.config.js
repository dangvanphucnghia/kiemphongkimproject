/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { primary: '#C9A227', dark: '#1E1E1E', light: '#F9F5EB' },
      },
    },
  },
  plugins: [],
};
