import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function NFBooks() {
    const [NFBooks, setNFBooks] = useState([]);
    const [sortBy, setSortBy] = useState(""); 
  
    useEffect(() => {
      async function fetchNFBooks() {
        try {
          const response = await fetch(`${BASE_URL}/nonfiction-books`);
          const data = await response.json();
  
          setNFBooks(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchNFBooks();
    }, []);
  
    
    const handleSort = (event) => {
      const selectedOption = event.target.value;
      let sortedNovels = [...NFBooks];
      if (selectedOption === "Release Date") {
        sortedNovels = sortedNovels.sort((a, b) => {
          return a.yearPublished - b.yearPublished;
        });
      } else if (selectedOption === "Title") {
        sortedNovels = sortedNovels.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }
      setNFBooks(sortedNovels);
      setSortBy(selectedOption);
    };
  
    return (
      <>
        <div className="flex justify-between">
          <NavBar />
        </div>
  
        <div>
          <h1>Non-Fiction Books</h1>
          <div>
            <label htmlFor="sortDropdown">Sort By:</label>
            <select id="sortDropdown" value={sortBy} onChange={handleSort}>
              <option value="">-- Select Option --</option>
              <option value="Release Date">Release Date</option>
              <option value="Title">Title</option>
            </select>
            {sortBy && <p>Sorted by: {sortBy}</p>}
          </div>
          <div className="flex flex-wrap p-8">
            {NFBooks.map((book) => (
              <div className="w-150 pr-20" key={book.isbn}>
                <a href={`/books/${book.isbn}`}>
                  <img src={book.bookCover} alt="Image of Book cover" />
                  <h3 className="w-40 pr-8">{book.title}</h3>
                  <p className="w-40 pb-4">{book.author}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

export default NFBooks;
