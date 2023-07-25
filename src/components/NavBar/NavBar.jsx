import pageTurnerLogo2 from "../images/pageTurnersLogo2.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { BASE_URL } from "../api-handlers";

const NavBar = (props) => {
  const navigate = useNavigate();
  const setIsLoggedIn = props.setIsLoggedIn;
  const books = props.books;

  const handleSignOut = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    // HEY KIDS CHANGE THIS BEFORE DEPLOYING!!!
    window.location.href = "https://main.d2t4p7pc5iy3t6.amplifyapp.com/logout";
    //"http://localhost:3000/logout";
    navigate("/");
  };

  const myToken = localStorage.getItem("token");

  return (
    <div
      className="flex flex-wrap bg-cover bg-no-repeat place-content-end h-28"
      style={{ backgroundImage: `url(${pageTurnerLogo2})` }}
    >
      <Link to="/browse" className=" text-black font-bold p-4 ">
        Home
      </Link>
      {myToken ? (
        <>
          <Link to="/profile" className=" text-black font-bold p-4 ">
            Profile
          </Link>
          <Link
            to="/"
            className=" text-black font-bold p-4 "
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <Link to="/login" className=" text-black font-bold p-4 ">
          Log in
        </Link>
      )}
      <div className="p-1 ">
        <SearchBar books={books} />
      </div>
    </div>
  );
};

export default NavBar;
