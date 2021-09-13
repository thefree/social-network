module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        groupoblue: "#091f43",
        groupofondblue: "#112341",
        groupopink: "#d1515a",
        groupogris: "#adadad",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
