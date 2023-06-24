import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import colors from "tailwindcss/colors";

module.exports = {
  theme: {
    colors: {
      ...colors,
      base: {
        50: "#ffffff",
        100: "#F7F7FB",
        200: "#E6E6F0",
        300: "#BCBCD1",
        400: "#9191AB",
        600: "#5C5C73",
        700: "#444461",
      },
      primary: "#6E6EED",
      "primary-dark": "#4C4CC0",
    },
    boxShadow: {
      base: "0 0 50px 10px #F7F7FB",
      sm: "0 3px 10px #00000020",
      "2xl": "0 30px 50px #00000020",
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
};
