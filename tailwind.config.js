const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Serif ", "serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
