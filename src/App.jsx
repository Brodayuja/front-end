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
import Browse from "./components/BrowsePage/BrowsePage";
import FictionPage from "./components/FictionBooks/FictionBooks";
import NFBooks from "./components/NFBooks/NFBooks";
import GraphicNovels from "./components/GraphicNovels/GraphicNovels";
import ChildrensBooks from "./components/ChildrensBooks/ChildrensBooks";

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
        <Route path="/browse" element={<Browse books={books}/>} />
        <Route path="/mybooks" />
        <Route path="/profile" element={<Profile username={myUsername}/>} />
        <Route path="/nonfiction" element={<NFBooks/>}/>
        <Route path="/childbooks" element={<ChildrensBooks/>}/>
        <Route path="/fiction" element={<FictionPage/>}/>
        <Route path="/graphicnovels" element={<GraphicNovels/>}/>
        <Route path="/add-books" element={<AddBook />}></Route>

      </Routes>
    </>
  );
}

export default App;
