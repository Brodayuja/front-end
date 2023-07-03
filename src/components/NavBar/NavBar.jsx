import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    const books = props.books;
    const navigate = useNavigate();

    return(

        <div>
            <Link to="/">Home</Link>
            <Link to="/mybooks">My Books</Link>
            <Link to="/profile">Profile</Link>
            <SearchBar books={books}/>
        </div>
    )
}


export default NavBar;