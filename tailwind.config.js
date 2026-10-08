/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#312782',
          dark: '#1A1413',
          crimson: '#AB2020',
          cyan: '#009EE2',
          lime: '#93C01F',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
