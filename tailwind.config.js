/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
    'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
    'from-blue-50', 'from-blue-100', 'from-blue-200', 'from-blue-300', 'from-blue-400', 'from-blue-500', 'from-blue-600', 'from-blue-700', 'from-blue-800', 'from-blue-900',
    'to-blue-50', 'to-blue-100', 'to-blue-200', 'to-blue-300', 'to-blue-400', 'to-blue-500', 'to-blue-600', 'to-blue-700', 'to-blue-800', 'to-blue-900',
    'hover:from-blue-500', 'hover:to-blue-700', 'hover:from-blue-600', 'hover:to-blue-700',
    'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-700', 'text-red-700', 'border-red-200',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-400', 'bg-gray-500', 'text-gray-500', 'text-gray-400',
    'from-gray-500', 'to-gray-400',
    'border-blue-200', 'focus:ring-blue-400',
    'animate-float', 'bg-gradient-to-r', 'bg-gradient-to-b'
  ],
  plugins: [],
} 