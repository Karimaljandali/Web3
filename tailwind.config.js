module.exports = {
  content: ["./pages/*.{html,js}", "./components/*.{html,js}", "./components/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem'
      },   
      colors: {
        'green': {
          100: '#56c819',
          200: '#56c819',
          300: '#56c819',
          400: '#56c819',
          500: '#56c819',
          600: '#56c819',
          700: '#56c819',
          800: '#56c819',
          900: '#173607',
        },
        fontFamily: {
          pumpkin: ["PumpkinKing"]
        },
      }
    },
  },
  plugins: [],
}
