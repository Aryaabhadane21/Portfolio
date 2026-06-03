/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["'Syne'", "sans-serif"],
        outfit: ["'Outfit'", "sans-serif"],
      },
      colors: {
        bg: "#050814",
        surface: "#0d1224",
        surface2: "#141930",
        accent: "#7c6ffd",
        accent2: "#06d6a0",
        accent3: "#ff6b6b",
        muted: "#8890b5",
      },
      animation: {
        "rotate-cube": "rotateCube 10s linear infinite",
        "fade-up": "fadeUp 0.8s ease both",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        rotateCube: {
          from: { transform: "rotateX(20deg) rotateY(0deg)" },
          to:   { transform: "rotateX(20deg) rotateY(360deg)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(124,111,253,0.3)" },
          "50%":     { boxShadow: "0 0 40px rgba(124,111,253,0.7)" },
        },
      },
    },
  },
  plugins: [],
}
