import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import { fetchAllBooks } from "./components/api-handlers";
import SearchResults from "./components/SearchBar/SearchResults";
import SingleBookDetail from "./components/SingleBook/SingleBook";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Profile from "./components/Profile/Profile";
import AddBook from "./components/NewBook/NewBook";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUsername, setMyUsername] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const result = await fetchAllBooks();
        setBooks(result);
        // console.log(result)
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage books={books} />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Registration
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
            />
          }
        ></Route>
        <Route
          path="/search-results"
          element={<SearchResults books={books} />}
        />
        <Route
          path="/books/:isbn"
          element={<SingleBookDetail books={books} />}
        />
        <Route path="/mybooks" />
        <Route path="/profile" element={<Profile username={myUsername}/>} />
        <Route path="/nonfiction" />
        <Route path="/childbooks" />
        <Route path="/fiction" />
        <Route path="/graphicnovels" />
        <Route path="/add-books" element={<AddBook />}></Route>

      </Routes>
    </>
  );
}

export default App;
