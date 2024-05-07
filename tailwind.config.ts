import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#319795',
        },
        secondary: {
          light: '#FBD38D',
          DEFAULT: '#F6AD55',
          dark: '#ED8936',
        },
        background: {
          light: '#F7FAFC',
          dark: '#2D3748',
        },
        text: {
          light: '#2D3748',
          dark: '#F7FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config;
