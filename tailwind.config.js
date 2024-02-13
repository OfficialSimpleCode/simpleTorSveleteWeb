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
          "primary": "#ef00ff",
          "secondary": "#005dff",
          "accent": "#ff0000",
          "neutral": "#150f00",
          "base-100": "#102d22",
          "info": "#00c3ff",
          "success": "#b8dd0a",
          "warning": "#ebca00",
          "error": "#ff9ca3",
        },
      },
    ],
  },
};

