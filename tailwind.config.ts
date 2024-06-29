import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#A62626",
      white: "#FFFFFF",
      black: "#000000",
      grey: {
        100: "#F8F8F7",
        200: "#EBEBEB",
        300: "#E0E0E0",
        400: "#868686",
      },
    },
  },
  plugins: [],
};
export default config;
