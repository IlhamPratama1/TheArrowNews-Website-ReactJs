module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'oswald': ['Oswald'],
      'mont': ['Montserrat'],
      'cooper': ['"Cooper Hewitt"'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'yellow': '#FCA311',
      'blue': '#14213D',
      'gray': '#E5E5E5',
    }),
    textColor: {
      'yellow': '#FCA311',
      'blue': '#14213D',
      'gray': '#E5E5E5',
      'white': '#FFFFFF',
      'red': '#CC0000'
    },
    extend: {
      height: {
        md : '18rem',
        lg: '20rem',
        xl: '32rem',
        'head': '30rem',
      },
      width: {
        '44r': '33rem',
        'head': '40.5rem',
        'headl': '33.75rem',
        '98': '32rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
