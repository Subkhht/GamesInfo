/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#6C5CE7',
          600: '#5b4bc4',
          700: '#4c3da8',
          800: '#3d318a',
          900: '#322871',
        },
        secondary: {
          500: '#A29BFE',
        },
        accent: {
          500: '#FD79A8',
        },
        dark: {
          bg: '#0A0E27',
          card: '#151932',
        },
        light: {
          bg: '#F8F9FA',
          card: '#FFFFFF',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
