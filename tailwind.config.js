/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './path/to/fonts/**/*.{woff,woff2,ttf,otf}'],
  theme: {
    extend: {
      colors: {
        customPurple: '#D9B8FF',
        customBlue: '#80CAFF',
        bgDev: '#FFFFF0',
        customGray: '#3d3f40'
      },
      fontFamily: {
        Galmuri11: ['Galmuri11', 'sans-serif']
      }
    },
    corePlugins: {
      aspectRatio: false
    },
    plugins: [require('@tailwindcss/aspect-ratio')]
  }
};
