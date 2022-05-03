const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      maxHeight: {
        '90v': '90vh',
        height: {
          '600px': '600px',
        },
        animation: {
          slideIn: '1s ease-out 0s 1 slideIn',
        },
        width: {
          'fit-content': 'fit-content',
        },
        keyframes: {
          slideIn: {
            '0%': { transform: 'translateX(-30%)' },
            '100%': { transform: 'translateX(0%)' },
          },
        },
        borderRadius: {
          '4xl': '50px',
        },
      },
    },
    plugins: [],
  },
}
