import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return(

        <div>
            <Link to="/">Home</Link>
            <Link to="/mybooks">My Books</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}


export default NavBar;