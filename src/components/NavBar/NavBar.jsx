import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    const books = props.books;
    const navigate = useNavigate();

    return(
        <>
            <div className="flex">
                <Link to="/browse" className="mx-8">Home</Link>
                <Link to="/mybooks" className="mx-8">My Books</Link>
                <Link to="/profile" className="mx-8">Profile</Link>
            </div>
            <div>
                <SearchBar books={books} />
            </div>
            </>
    )
}


export default NavBar;