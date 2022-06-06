module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",

  theme: {
    extend: {
      colors: {
        "wires-title": "#ffffff",
        "wires-text": "#4A5571",
        "wires-main": "#3F57DB",
        "menu": "#667C8A",
        "name": "#0D1C2E",
        "chips": "#E96344",
        "chips-inactive": "#F0927C",
      },
    },

    fontFamily: {
      Inter: ["Inter, sans-serif"],
    },

    container: {
      center: true,
      screen: {
        lg: "1024px",
        xl: "1024px",
        "2xl": "1024",
      },
    },
  },
  plugins: [],
};
