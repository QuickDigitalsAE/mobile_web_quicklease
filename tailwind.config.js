/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}",
"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    fontSize: {
      'xs': '.75rem',   // Example custom font size
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',  
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'black': '#000',
      'primary': '#401a89',
      secondary: '#401a89',
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
      Mluvka: ['Mluvka-SemiBold', 'sans-serif'],
      MluvkaRegular: ['Mluvka-Regular', 'sans-serif'],
      MluvkaBold: ['Mluvka-Bold', 'sans-serif'],
      MluvkaLight: ['Mluvka-Light', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 8px 30px rgba(80, 85, 136, 0.06)',
      },
  },
  plugins: [],
  
}