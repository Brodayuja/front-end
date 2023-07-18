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
      <img className="w-screen" src={pageTurnerLogo} />

      <div className="flex">
        <p className="w-1/3 ml-8 pr-6 pt-8">
          <span className="font-bold">Deciding what to read next?</span>
          <br />
          You’re in the right place. Explore our book reviews to discover the perfect literey gem for your next adventure!
        </p>

        <p className="w-1/3 pr-6 pt-8">
          <span className="font-bold">What is everyone reading and what are their thoughts?</span>
          <br />
          Chances are your friends are discussing their favorite (and least favorite) books on Page Turners.
        </p>


        

        <div className="bg-columbiaBlue w-1/4 rounded-xl -translate-y-1/2">
          <Login setIsLoggedIn={setIsLoggedIn}
                setMyUsername={setMyUsername}
                setMyUserId={setMyUserId}/>
        </div>
      </div>


      <div className="-mt-40 mx-8">
        <RecentReviewsShelf books={books} averageScores={averageScores}/>
      </div>

      <div className="flex justify-around items-baseline my-2">
        <SearchBar books={books} />
        <div>
          <Link className="px-4 underline" to="/nonfiction">Non-Fiction</Link>
          <Link className="px-4 underline" to="/childbooks">Children's Books</Link>
          <Link className="px-4 underline" to="/fiction">Fiction</Link>
          <Link className="px-4 underline" to="/graphicnovels">Graphic Novels</Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
