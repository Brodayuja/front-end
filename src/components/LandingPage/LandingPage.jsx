import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png"
import SearchBar from "../SearchBar/SearchBar";
import RecentReviewsShelf from "../Reviews/RecentReviewsShelf";

// commented out to keep from breaking




function LandingPage(props) {
  const books = props.books;


  return (
    <>
    <div>
      <img className="Logo" src={pageTurnerLogo}/>
    </div>
  
    <div>
      <h1>Page Turners</h1>
      {/* Background Header Img */}
    </div>

    <div>
      {/* Log in Component */}
    </div>

    <article>
      <p><b>Deciding what to read next?</b> <br></br> You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations. </p>

      <p><b>What are your friends reading?</b> <br></br> Chances are your friends are discussing their favorite (and least favorite) books on Page Turners. </p>
    </article>

    <div>
     <RecentReviewsShelf books={books}/>
    </div>

    <div>
      {/* commented out to keep from breaking */}
      <SearchBar books={books}/>
    </div>

    <div>
      {/* Global Search Companent */}

      {/* Links to Categories */}
    </div>
    
    
    </>
  );
}

export default LandingPage;
