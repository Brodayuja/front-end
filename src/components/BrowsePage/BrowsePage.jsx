import pageTurnerLogo from "../images/pageTurnersLogo.png";
import FictionShelf from "../FictionBooks/FictionBooksShelf";
import NFBooksShelf from "../NFBooks/NFBooksShelf";
import NavBar from "../NavBar/NavBar";
import RecentReviewsShelf from "../Reviews/RecentReviewsShelf";
import GraphicNovelsShelf from "../GraphicNovels/GraphicNovelsShelf";
import ChildrensBooksShelf from "../ChildrensBooks/ChildrensBooksShelf";

function Browse ({books, averageScores}) {
    
    return (
        <>
        <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>


        <div>
            <p>This is Browse</p>

            <RecentReviewsShelf books={books} averageScores={averageScores}/>

            <FictionShelf averageScores={averageScores}/>

            <NFBooksShelf averageScores={averageScores}/>

            <GraphicNovelsShelf averageScores={averageScores}/>

            <ChildrensBooksShelf averageScores={averageScores}/>

            


        </div>
</>
    )
}

export default Browse;