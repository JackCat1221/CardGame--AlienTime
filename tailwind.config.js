/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', "./src/**/*.{vue,js,ts,jsx,tsx}",],
  plugins: [require("tailwindcss-animate"), require('tailwindcss-primeui')],
}

