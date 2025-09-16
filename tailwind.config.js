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
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
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
