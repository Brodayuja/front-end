import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";


const SearchResults = ({ books }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm");

  const searchResults = books.filter((book) => {
    const { isbn, title, author } = book;
    return (
      isbn.includes(searchTerm) ||
      (typeof title === "string" &&
        title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof author === "string" &&
        author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>
      {searchResults.length ? (
        searchResults.map((book) => (
          <div key={book.isbn}>

          <a href={`/books/${book.isbn}`}>
            <img src={book.bookCover} alt="Image of Book cover" />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
          </a>
          </div>
        ))
      ) : (
        <p>No matches found!</p>
      )}
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
};

export default SearchResults;