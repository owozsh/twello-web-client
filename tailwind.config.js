import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import colors from "tailwindcss/colors";

module.exports = {
  theme: {
    colors: {
      ...colors,
      base: {
        50: "#ffffff",
        100: "#F7F7F7",
        200: "#E6E6E6",
        300: "#BCBCBC",
        400: "#919191",
        600: "#5C5C5C",
        700: "#444444",
      },
      primary: "#4D79EC",
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
