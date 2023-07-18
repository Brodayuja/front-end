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
      <NavBar/>

      <div className="flex flex-wrap p-8"> 
        {searchResults.length ? (
          searchResults.map((book) => (
            <div className="w-150 pr-20" key={book.isbn}>

            <a href={`/books/${book.isbn}`}>
              <img src={book.bookCover} alt="Image of Book cover" />
              <h3 className="w-40 pr-8">{book.title}</h3>
              <p className="w-40">{book.author}</p>
              <p className="w-40 pb-4">{book.isbn}</p>
            </a>
            </div>
          ))
        ) : (
          <p>No matches found!</p>
        )}
      </div>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
};

export default SearchResults;