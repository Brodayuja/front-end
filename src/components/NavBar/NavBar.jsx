import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ books, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const myToken = localStorage.getItem("token");

  return (
    <div className="flex justify-between">
      <div>
        <Link to="/browse" className="mx-8">
          Home
        </Link>
        <Link to="/mybooks" className="mx-8">
          My Books
        </Link>
      </div>
      {myToken ? (
        <div>
          <Link to="/profile" className="mx-8">Profile</Link>
          <Link to="/" className="mx-8" onClick={handleSignOut}>
            Sign Out
          </Link>
        </div>
      ) : (
        <Link to="/login" className="mx-8">
          Log in
        </Link>
      )}
      <div>
        <SearchBar books={books} />
      </div>
    </div>
  );
};

export default NavBar;
