/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          '0%': { opacity: '0', transform: 'scale(95%)' },
          '100%': { opacity: '1', transform: 'scale(100%)' },
        },
      },
      animation: {
        'dropdown': 'dropdown 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
