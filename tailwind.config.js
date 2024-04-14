/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "rgb(81, 108, 240)",
        customBlight: "rgb(7, 108, 240)",
        customtext: "rgb(107, 117, 125)",
        customLink: "rgb(217, 112, 0)",
        customAbout: "rgb(255, 133, 3)",
        customEva: "rgb(201, 57, 0)",
        customEvaText: "rgb(102, 102, 102)",
        customEvaFooter: "rgb(187, 255, 0)",
        // Add more custom colors as needed
      },
    },
    plugins: [],
  },
};
