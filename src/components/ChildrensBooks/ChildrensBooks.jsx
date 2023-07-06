import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function ChildrensBooks() {
    const [childrensBooks, setChildrensBooks] = useState([]);
    const [sortBy, setSortBy] = useState(""); 
  
    useEffect(() => {
      async function fetchchildrensBooks() {
        try {
          const response = await fetch(`${BASE_URL}/childrens-books`);
          const data = await response.json();
  
          setChildrensBooks(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchchildrensBooks();
    }, []);
  
    
    const handleSort = (event) => {
      const selectedOption = event.target.value;
      let sortedNovels = [...childrensBooks];
      if (selectedOption === "Release Date") {
        sortedNovels = sortedNovels.sort((a, b) => {
          return a.yearPublished - b.yearPublished;
        });
      } else if (selectedOption === "Title") {
        sortedNovels = sortedNovels.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }
      setChildrensBooks(sortedNovels);
      setSortBy(selectedOption);
    };
  
    return (
      <>
        <div className="flex justify-between">
          <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
          <NavBar />
        </div>
  
        <div>
          <h1>Fiction Books</h1>
          <div>
            <label htmlFor="sortDropdown">Sort By:</label>
            <select id="sortDropdown" value={sortBy} onChange={handleSort}>
              <option value="">-- Select Option --</option>
              <option value="Release Date">Release Date</option>
              <option value="Title">Title</option>
            </select>
            {sortBy && <p>Sorted by: {sortBy}</p>}
          </div>
          {childrensBooks.map((book) => (
            <div key={book.isbn}>
              <a href={`/books/${book.isbn}`}>
                <img src={book.bookCover} alt="Image of Book cover" />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </a>
            </div>
          ))}
        </div>
      </>
    );
  }

export default ChildrensBooks;

