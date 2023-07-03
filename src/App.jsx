import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import { fetchAllBooks } from "./components/api-handlers";
import SearchResults from "./components/SearchBar/SearchResults";
import SingleBookDetail from "./components/SingleBook/SingleBook";




function App() {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const getBooks = async () => {
            try {
                const result = await fetchAllBooks();
                setBooks(result);
                // console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks();
    }, [])

  return (
    <>

    <Routes>
      <Route path='/' element={<LandingPage books={books}/>}></Route>
      {/* <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>*/}
      <Route path="/search-results" element={<SearchResults books={books} />} />
      <Route path="/books/:isbn" element={<SingleBookDetail books={books}/> } />
      <Route path="/mybooks"/>
      <Route path="/profile"/>
    </Routes>
      
    
    </>
  );
}

export default App;
