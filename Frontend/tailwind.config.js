/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        // GREENS
        "shade-1": "#0d1811",
        "shade-2": "#1b3022",
        "shade-3": "#284834",
        "shade-4": "#366045",
        "shade-5": "#437856",
        "shade-6": "#508f67",
        "shade-7": "#5ea778",
        "shade-8": "#6bbf8a",
        "shade-9": "#79d79b",
        "shade-10": "#86efac",
        "tint-1": "#92f0b4",
        "tint-2": "#9ef2bd",
        "tint-3": "#aaf4c5",
        "tint-4": "#b6f5cd",
        "tint-5": "#c3f7d6",
        "tint-6": "#cff9de",
        "tint-7": "#dbfae6",
        "tint-8": "#e7fcee",
        "tint-9": "#f3fdf7",
        "tint-10": "#ffffff",
      },
      boxShadow: {
        "custom-1": "0px 4px 10px 2px rgba(0, 0, 0, 0.6)",
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        "custom-1": "1fr 4fr",
        "custom-2": "1fr 2fr",
        "custom-3": "4fr 1fr",
        "custom-4": "1fr",
      },
      gridTemplateColumns: {
        // Complex site-specific row configuration
        "custom-1": "1fr 13rem",
        "custom-2": "2fr 1fr 2fr 2fr 2fr",
        "1/2": "1fr 2fr",
        "cart-item": "8rem 1fr",
        "cart-item-md": "10rem 1fr",
        testimony: "1fr 10rem",
        testimonyItem: "7rem 1fr",
      },
      backgroundImage: {
        "woods-image": "url('./resources/highFive.png')",
      },
      maxHeight: {
        "vh-80": "50px",
      },
      width: {
        "30-percent": "25%",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
