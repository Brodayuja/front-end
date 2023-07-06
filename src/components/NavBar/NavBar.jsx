import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


const NavBar = (props) => {
  const books = props.books;
 
  const [showSignOut, setShowSignOut] = useState(false);


  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };


  return (
    <>
      <div className="flex">
        <Link to="/browse" className="mx-8">
          Home
        </Link>
        <Link to="/mybooks" className="mx-8">
          My Books
        </Link>
        <Link
          to="/profile/"
          className="mx-8"
          onMouseEnter={() => setShowSignOut(true)}
          onMouseLeave={() => setShowSignOut(false)}
        >
          Profile
          {showSignOut && (
            <div className="absolute bg-white rounded shadow mt-2">
              <button
                className="px-4 py-2 hover:bg-gray-200"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </Link>
      </div>
      <div>
        <SearchBar books={books} />
      </div>
    </>
  );
};


export default NavBar;



