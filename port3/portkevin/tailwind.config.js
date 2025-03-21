/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ming': ['ming', 'sans-serif'],
        'island': ['Island', 'sans-serif'],
        'romancc': ['Romancc', 'sans-serif'],
        'montreal': ['montreal', 'sans-serif'],
        'montrealbold': ['montrealbold', 'sans-serif'],
        'montrealthin': ['montrealthin', 'sans-serif'],
        'montrealthinitc': ['montrealthinitc', 'sans-serif'],
        'neueworld': ['neueworld', 'sans-serif'],
        'editorial': ['editorial', 'sans-serif'],
        'machinabold': ['machinabold', 'sans-serif']
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
}