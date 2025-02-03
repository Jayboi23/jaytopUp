/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rBlack: ['Rubik-Black', 'sans-serif'],
        rBlackItalic: ['Rubik-BlackItalic', 'sans-serif'],
        rBold: ['Rubik-Bold', 'sans-serif'],
        rBoldItalic: ['Rubik-BoldItalic', 'sans-serif'],
        rExtraBold: ['Rubik-ExtraBold', 'sans-serif'],
        rExtraBoldItalic: ['Rubik-ExtraBoldItalic', 'sans-serif'],
        rItalic: ['Rubik-Italic', 'sans-serif'],
        rLight: ['Rubik-Light', 'sans-serif'],
        rLightItalic: ['Rubik-LightItalic', 'sans-serif'],
        rMedium: ['Rubik-Medium', 'sans-serif'],
        rMediumItalic: ['Rubik-MediumItalic', 'sans-serif'],
        rRegular: ['Rubik-Regular', 'sans-serif'],
        rSemiBold: ['Rubik-SemiBold', 'sans-serif'],
        rSemiBoldItalic: ['Rubik-SemiBoldItalic', 'sans-serif'],
      },
      colors:{
        primary: '#4169e1',
        bgButton: '#dbdbfe',
        textSubTitle: '#949494',
        placeHolderText: '#777b7e'
      }
    },
  },
  plugins: [],
}

