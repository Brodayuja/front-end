import FictionShelf from "../FictionBooks/FictionBooksShelf";
import NFBooksShelf from "../NFBooks/NFBooksShelf";
import NavBar from "../NavBar/NavBar";
import RecentReviewsShelf from "../Reviews/RecentReviewsShelf";
import GraphicNovelsShelf from "../GraphicNovels/GraphicNovelsShelf";
import ChildrensBooksShelf from "../ChildrensBooks/ChildrensBooksShelf";
import Cookies from "js-cookies";
import { useEffect } from "react";

function Browse({
  books,
  averageScores,
  setMyUserId,
  myUserId,
  isLoggedIn,
  setIsLoggedIn,
  reviews,
}) {
  const myToken = localStorage.getItem("token");

  useEffect(() => {
    if (!myToken) {
      const handleGoogleSuccess = () => {
        const cookieToken = Cookies.getItem("token");
        const cookieUsername = Cookies.getItem("username");
        const cookieId = Cookies.getItem("id");
        localStorage.setItem("token", cookieToken);
        localStorage.setItem("username", cookieUsername);
        localStorage.setItem("userId", cookieId);
      };
      handleGoogleSuccess();
    }
  }, []);

  return (
    <>
      <NavBar
        myUserId={myUserId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        reviews={reviews}
      />

      <div className="mx-8 py-8">
        <RecentReviewsShelf books={books} averageScores={averageScores} />
        <br />
        <FictionShelf averageScores={averageScores} />
        <br />
        <NFBooksShelf averageScores={averageScores} />
        <br />
        <GraphicNovelsShelf averageScores={averageScores} />
        <br />
        <ChildrensBooksShelf averageScores={averageScores} />
      </div>
    </>
  );
}

export default Browse;
