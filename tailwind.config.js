/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/App.jsx",
    "./src/components/LandingPage/LandingPage.jsx",
    "./src/components/Reviews/ReviewBookShelf.jsx"
  ],
  theme: {
    extend: {
      colors: {
        columbiaBlue: "#AECFDF"
      }
    },
  },
  plugins: [],
}

