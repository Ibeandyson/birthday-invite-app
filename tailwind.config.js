/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf7',
          100: '#fef9e7',
          200: '#fdf2d1',
          300: '#fce7a8',
          400: '#f9d571',
          500: '#f5c23a',
          600: '#d4a017',
          700: '#b8860b',
          800: '#9a6b0a',
          900: '#7c5508',
        },
        cream: {
          50: '#fefdf8',
          100: '#fdf9e7',
          200: '#faf2c8',
          300: '#f6e8a3',
          400: '#f0d96b',
          500: '#e8c547',
          600: '#d4a83a',
          700: '#b08c2f',
          800: '#8c6f2a',
          900: '#725a25',
        },
        elegant: {
          black: '#1a1a1a',
          gold: '#d4af37',
          goldLight: '#f4e4bc',
          goldDark: '#b8860b',
          cream: '#f5f5dc',
          creamDark: '#f0e68c',
        }
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
