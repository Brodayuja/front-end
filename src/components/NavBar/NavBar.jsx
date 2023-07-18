import pageTurnerLogo2 from "../images/pageTurnersLogo2.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
  const navigate = useNavigate();
  const setIsLoggedIn = props.setIsLoggedIn;
  const books = props.books;

  const handleSignOut = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    window.location.href = "http://localhost:3000/logout";
  };

  const myToken = localStorage.getItem("token");

  return (
    <div
      className="bg-cover bg-no-repeat w-screen h-28"
      style={{ backgroundImage: `url(${pageTurnerLogo2})` }}
    >
      <div className="flex justify-end mr-10 h-28 items-baseline ">
        <div className="mt-auto mb-2.5">
          <Link to="/browse" className="mx-8 text-black font-bold">
            Home
          </Link>
        </div>
        {myToken ? (
          <div className=" mt-auto mb-2.5">
            <Link to="/profile" className="mx-8 text-black font-bold">
              Profile
            </Link>
            <Link
              to="#"
              className="mx-8 text-black font-bold"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="mt-auto mb-2.5">
            <Link to="/login" className="mx-8 text-black font-bold">
              Log in
            </Link>
          </div>
        )}
        <div className="mt-auto">
          <SearchBar books={books} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
