module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '500px',
      // => @media (min-width: 640px) { ... }

      md: '575px',
      // => @media (min-width: 768px) { ... }

      lg: '700px',
      // => @media (min-width: 1024px) { ... }

      xl: '750px',
      // => @media (min-width: 1280px) { ... }
    },
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
