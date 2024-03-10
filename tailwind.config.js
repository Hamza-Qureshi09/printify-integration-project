/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial-border":
          "linear-gradient(180deg, rgba(255, 187, 0, 0) 0.16%, rgba(255, 187, 0, 0.42) 44%, rgba(0, 0, 0, 0) 100%, rgba(255, 187, 0, 0) 100%);",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xs: "14px",
        sm: "16px",
        base: "20px",
        lg: "24px",
        xl: "40px",
        "2xl": "50px",
        "3xl": "60px",
      },
    },
  },
  plugins: [],
};
