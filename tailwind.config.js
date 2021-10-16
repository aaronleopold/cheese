module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          950: 'rgb(23,23,23)',
          900: 'rgb(25,25,25)',
          850: 'rgb(30,30,30)',
          800: 'rgb(36,36,36)',
          700: 'rgb(40,40,40)',
          600: '#2D2D2D',
          500: 'rgb(50,50,50)',
          400: '#3d3d3d',
          300: '#b2b2b2',
          200: 'rgb(223,223,223)',
          twilight: 'rgb(30, 30, 30)',
          stacking: 'rgba(25,25,25,0.2)',
        },
      },
      maxWidth: {
        '90vw': '90vw',
        '95vw': '95vw',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
