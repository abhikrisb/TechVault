/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0E14',
          800: '#151A23',
          700: '#2A313C',
          600: '#3D4552',
          border: '#2E3643',
        },
        brand: {
          900: 'rgba(79, 70, 229, 0.1)',
          500: '#4F46E5',
          400: '#818CF8',
          300: '#A5B4FC',
        },
        success: {
          500: '#10B981',
          400: '#34D399',
          900: 'rgba(16, 185, 129, 0.1)',
        },
        warning: {
          500: '#F59E0B',
          400: '#FBBF24',
          900: 'rgba(245, 158, 11, 0.1)',
        },
        danger: {
          500: '#EF4444',
          400: '#F87171',
          900: 'rgba(239, 68, 68, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
