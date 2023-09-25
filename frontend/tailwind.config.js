/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*https://uicolors.app/create 159 97 24 hsl*/
        /*'tropical-rain-forest'*/
        'trf': {
          '50': '#ecfdf4',
          '100': '#d0fbe2',
          '200': '#a6f4cb',
          '300': '#6ce9ae',
          '400': '#31d68f',
          '500': '#0dbc76',
          '600': '#039860',
          '700': '#02794f',
          '800': '#046141',
          '900': '#054f37',
          '950': '#012d1f',
        }
      },
    },
  },
  plugins: [],
}
