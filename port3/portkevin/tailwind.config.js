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
      },
      // Your other extensions...
    },
  },
  plugins: [],
}