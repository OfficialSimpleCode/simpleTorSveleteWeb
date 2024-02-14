/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        default: {
          "base-100": "#161618",
          "base-200": "#212124",
          "base-300": "#000000",
          primary: "#0088cc",
          // secondary: "#005dff",
          // accent: "#ff0000",
          // neutral: "#150f00",
          // info: "#00c3ff",
          success: "#b8dd0a",
          warning: "#ebca00",
          error: "#ff9ca3",
        },
      },
    ],
  },
};
