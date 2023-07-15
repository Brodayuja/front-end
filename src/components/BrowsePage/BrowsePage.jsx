import pageTurnerLogo from "../images/pageTurnersLogo.png";
import FictionShelf from "../FictionBooks/FictionBooksShelf";
import NFBooksShelf from "../NFBooks/NFBooksShelf";
import NavBar from "../NavBar/NavBar";
import RecentReviewsShelf from "../Reviews/RecentReviewsShelf";
import GraphicNovelsShelf from "../GraphicNovels/GraphicNovelsShelf";
import ChildrensBooksShelf from "../ChildrensBooks/ChildrensBooksShelf";
import Cookies from "js-cookie";

function Browse({ books, averageScores, setMyUserId }) {
  const myToken = localStorage.getItem("token");

  if (!myToken) {
    const handleGoogleSuccess = () => {
      const cookieToken = Cookies.get("token");
      const cookieUsername = Cookies.get("username");
      const cookieId = Cookies.get("id");
      localStorage.setItem("token", cookieToken);
      localStorage.setItem("username", cookieUsername);
      localStorage.setItem("id", cookieId);
      setMyUserId(cookieId);
    };
    handleGoogleSuccess();
  }

  return (
    <>
      <div className="flex justify-between">
        <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
        <NavBar />
      </div>

      <div>
        <p>This is Browse</p>

        <RecentReviewsShelf books={books} averageScores={averageScores} />

        <FictionShelf averageScores={averageScores} />

        <NFBooksShelf averageScores={averageScores} />

        <GraphicNovelsShelf averageScores={averageScores} />

        <ChildrensBooksShelf averageScores={averageScores} />
      </div>
    </>
  );
}

export default Browse;
