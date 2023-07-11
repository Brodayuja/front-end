import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
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
import EditProfile from "./components/Profile/EditProfile";
import NavBar from "./components/NavBar/NavBar";


function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [myUserId, setMyUserId] = useState(null)
  const navigate = useNavigate();


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


  useEffect(()=> {
    try {
      const myToken = localStorage.getItem("token")
      const token_id = localStorage.getItem("userId")
      const username = localStorage.getItem("username")
     
      if (myToken && token_id){
        setMyUserId(token_id)
        setIsLoggedIn(true)
      }

    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(()=>{
    if (isLoggedIn && location.pathname === "/"){
      navigate("/browse")
    }
  },[isLoggedIn, location.pathname])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage books={books} setMyUserId={setMyUserId} setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername} />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
              setMyUserId={setMyUserId}
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
          element={<SingleBookDetail books={books} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} myUserId={myUserId} setBooks={setBooks}/>}
        />
        <Route path="/browse" element={<Browse books={books}/>} />
        <Route path="/mybooks" />
        <Route path="/profile" element={<Profile  myUserId={myUserId} books={books}/>} />
        <Route path="/nonfiction" element={<NFBooks/>}/>
        <Route path="/childbooks" element={<ChildrensBooks/>}/>
        <Route path="/fiction" element={<FictionPage/>}/>
        <Route path="/graphicnovels" element={<GraphicNovels/>}/>
        <Route path="/add-books" element={<AddBook />}></Route>
        <Route path="/profile-edit" element={<EditProfile myUserId={myUserId}/>}/>
        <Route path="/navBar" element={<NavBar myUserId={myUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>


      </Routes>
    </>
  );
}


export default App;