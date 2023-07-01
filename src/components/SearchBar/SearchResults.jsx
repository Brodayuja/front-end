import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      {searchResults.length ? (
        searchResults.map((book) => (
          <div key={book.ISBN}>
            <h4>{book.title}</h4>
            <img src={book.bookCover} alt="Image of Book cover" />
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