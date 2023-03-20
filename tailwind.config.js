module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        "dark-teal": "rgb(1 68 81 / 1)",
        "light-white": "rgba(255,255,255,0.18)",
        "highlight": "#38b2ac",
        "dark-emarald": "#12322d",
        "emarald":"#19443d ",
        "light-emarald":"#b1baab",
        "light": "##eeeee4",
        "light-light":"#ece4e2",
        "dark-light":"#8b9b9c"
      }
    },
  },

  plugins: [ 
    require("daisyui"),
  ]

}