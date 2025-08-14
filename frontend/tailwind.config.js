/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'oracle-blue': '#0A192F',
        'oracle-lightblue': '#172A45',
        'oracle-red': '#F82305',
        'oracle-gray': '#8892B0',
        'oracle-lightgray': '#CCD6F6',
      },
    },
  },
  plugins: [],
}
