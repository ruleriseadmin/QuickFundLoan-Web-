import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FCFCFC",
        foreground: "var(--foreground)",
        navcolor: "#FFFFFF",
        navfont: "#282828",
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        comic: ['var(--font-comic)', 'sans-serif'],
        patrick: ['var(--font-patrick)', 'sans-serif'],
        kumbh: ['var(--font-kumbh)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        saira: ['var(--font-saira)', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      lineHeight: {
        '70': '70px',
        '35': '35.28px',
        '80': '80px',
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(101.65deg, #58E427 -11.07%, #4D8A28 76.56%)',
        'gradient2': 'linear-gradient(101.65deg, #F97870 -11.07%, #B57C0F 76.56%)',
        'gradient3': 'linear-gradient(101.65deg, #CBC6C5 -11.07%, #464542 76.56%)',
        'gradient4': 'linear-gradient(304.63deg, #F24C5D 17.17%, #13171D 76.96%)',
        'gradient6': 'linear-gradient(274.94deg, #F24C5D 60.47%, #13171D 95.86%)',
        'gradient7': 'linear-gradient(272.62deg, #3F1A6B -12.06%, #E76229 102.84%)',
        'gradient8': 'linear-gradient(279.76deg, #2A2F2D 0%, #4F040C 51.24%, rgba(0, 0, 0, 0.92) 109.32%)',
        'gradient9': 'linear-gradient(279.76deg, #424DB1 0%, rgba(66, 77, 177, 0.9625) 51.24%, rgba(66, 77, 177, 0.92) 109.32%)',
        'gradient10': 'linear-gradient(90deg, #FF2626 0%, #13171D 100%)',
        'gradient11': 'linear-gradient(149.87deg, #FFFFFF -10.32%, #72B3BD 201.33%)',
      },
      borderRadius: {
        'circle': '50%', 
      },
      dropShadow: {
        'customshadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      boxShadow:{
        'customshadow': '0px 0px 20px 4px #0000001A',
      }
    },
  },
  plugins: [],
};

export default config;
