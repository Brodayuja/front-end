import shelf from "../images/shelf.png";
import { Link } from "react-router-dom";

function RecentReviewsShelf(props) {
  const books = props.books;
  const averageScores = props.averageScores;

  return (
    <>
    <h2 className="underline underline-offset-1 font-bold">New Releases</h2>

      <div className="flex bg-contain justify-around py-4 px-2 shadow-xl"
      style={{ backgroundImage: `url(${shelf})`}}>
        {books.length ? (
          books
            .filter((element) => {
              const publicationYear = element.yearPublished;
              const currentYear = new Date().getFullYear();
              return publicationYear === currentYear;
            })
            .slice(0, 5)
            .map((element) => {
              const averageScore = averageScores[element.isbn];
              return (
                <div key={element.isbn} className="px-1">
                  <Link to={`/books/${element.isbn}`}>
                    <img src={element.bookCover} alt="Image of Book cover" />
                  </Link>
                  {averageScore !== undefined && (
                    <p className="font-bold">Rating: {averageScore.toFixed(2)}/5</p>
                  )}
                </div>
              );
            })
        ) : (
          <p>Loading . . .</p>
        )}
      </div>
    </>
  );
}

export default RecentReviewsShelf;

