import { useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import SearchBar from "../SearchBar/SearchBar";
import RecentReviewsShelf from "../Reviews/RecentReviewsShelf";
import Login from "../Login/Login";

function LandingPage(props) {
  const books = props.books;
  const setMyUserId = props.setMyUserId;
  const setIsLoggedIn = props.setIsLoggedIn;
  const setMyUsername = props.setMyUsername;
  const averageScores = props.averageScores


  return (
    <>
      <div>
        <img className="w-screen" src={pageTurnerLogo} />
      </div>

      <div className="flex">
              <p className="w-1/3 ml-8 font-bold pr-6 pt-8">Deciding what to read next?
                <br/>
                You’re in the right
                place. Tell us what titles or genres you’ve enjoyed in the past, and
                we’ll give you surprisingly insightful recommendations.
              </p>

              <p className="w-1/3 font-bold pr-6 pt-8"> What are your friends reading?
                <br/>
                Chances are your
                friends are discussing their favorite (and least favorite) books on
                Page Turners.
              </p>
        

        <div className="bg-columbiaBlue w-1/4 rounded-xl -translate-y-1/2">
          <Login setIsLoggedIn={setIsLoggedIn}
                setMyUsername={setMyUsername}
                setMyUserId={setMyUserId}/>
        </div>
      </div>


      <div>
        <RecentReviewsShelf books={books} averageScores={averageScores}/>
      </div>

      <div>
        <SearchBar books={books} />
      </div>

      <div>
            <Link to="/nonfiction">Non-Fiction</Link>
            <Link to="/childbooks">Children's Books</Link>
            <Link to="/fiction">Fiction</Link>
            <Link to="/graphicnovels">Graphic Novels</Link>
      </div>
    </>
  );
}

export default LandingPage;
