const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./react-notion/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...defaultTheme.colors,
      gray: colors.gray,
      tan: "#f8f3e6",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
