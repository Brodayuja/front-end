/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/App.jsx",
    "./src/components/LandingPage/LandingPage.jsx",
    "./src/components/Reviews/RecentReviewsShelf.jsx",
    "./src/components/SingleBook/SingleBook.jsx",
    "./src/components/NavBar/NavBar.jsx",
    "./src/components/Profile/Profile.jsx",
    "./src/components/Profile/EditProfile.jsx"


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





