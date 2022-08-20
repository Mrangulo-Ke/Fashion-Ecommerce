module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        veryDarkViolet: '#6366f1',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        newRed: '#df2020',
        hoverNewRed: '#212245',
        lightNewRed: '#fde4e4',
      },
    },
  },
  plugins: [],
};
