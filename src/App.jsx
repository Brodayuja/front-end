import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import { fetchAllBooks, fetchReviews } from "./components/api-handlers";
import SearchResults from "./components/SearchBar/SearchResults";
import SingleBookDetail from "./components/SingleBook/SingleBook";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Profile from "./components/Profile/Profile";
import AddBook from "./components/NewBook/NewBook";
import Browse from "./components/BrowsePage/BrowsePage";
import FictionPage from "./components/FictionBooks/FictionBooks";
import NFBooks from "./components/NFBooks/NFBooks";
import GraphicNovels from "./components/GraphicNovels/GraphicNovels";
import ChildrensBooks from "./components/ChildrensBooks/ChildrensBooks";
import EditProfile from "./components/Profile/EditProfile";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageScores, setAverageScores] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && location.pathname === "/") {
      navigate("/browse");
    }
  }, [navigate, location]);

  useEffect(() => {
    const myUserId = localStorage.getItem("userId");
    if (myUserId) {
      setIsLoggedIn(true);
      setMyUserId(myUserId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const fetchedReviews = await fetchReviews();
        setReviews(fetchedReviews);
        calculateAverageScores(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }

      try {
        const fetchedBooks = await fetchAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllData();
  }, []);

  const calculateAverageScores = (reviews) => {
    const averageScores = {};
    const isbnKeys = [
      "bookClubBook_isbn",
      "fictionBook_isbn",
      "graphicBook_isbn",
      "nfBook_isbn",
      "childrensBook_isbn",
    ];

    for (const review of reviews) {
      for (const key of isbnKeys) {
        const isbn = review[key];
        if (isbn !== null) {
          if (!averageScores[isbn]) {
            averageScores[isbn] = {
              totalScore: 0,
              count: 0,
            };
          }
          averageScores[isbn].totalScore += review.score;
          averageScores[isbn].count += 1;
        }
      }
    }

    // Calculate average scores
    for (const isbn in averageScores) {
      averageScores[isbn] =
        averageScores[isbn].totalScore / averageScores[isbn].count;
    }

    setAverageScores(averageScores);
  };

  return (
    <div className="h-">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              books={books}
              setMyUserId={setMyUserId}
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
              averageScores={averageScores}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
              setMyUserId={setMyUserId}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Registration
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
              setMyUserId={setMyUserId}
            />
          }
        />
        <Route
          path="/search-results"
          element={<SearchResults books={books} />}
        />
        <Route
          path="/books/:isbn"
          element={
            <SingleBookDetail
              books={books}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              myUserId={myUserId}
              setBooks={setBooks}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/browse"
          element={
            <Browse
              books={books}
              averageScores={averageScores}
              setMyUserId={setMyUserId}
            />
          }
        />
        <Route path="/mybooks" />
        <Route
          path="/profile"
          element={
            <Profile myUserId={myUserId} books={books} reviews={reviews} />
          }
        />
        <Route path="/nonfiction" element={<NFBooks />} />
        <Route path="/childbooks" element={<ChildrensBooks />} />
        <Route path="/fiction" element={<FictionPage />} />
        <Route path="/graphicnovels" element={<GraphicNovels />} />
        <Route path="/add-books" element={<AddBook />} />
        <Route
          path="/profile-edit"
          element={<EditProfile myUserId={myUserId} />}
        />
        <Route
          path="/navBar"
          element={
            <NavBar
              myUserId={myUserId}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              reviews={reviews}
            />
          }
        />
      </Routes>

      <div className="bg-columbiaBlue">
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
