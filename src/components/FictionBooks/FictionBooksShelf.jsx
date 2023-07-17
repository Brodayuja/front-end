import shelf from "../images/shelf.png";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import { Link } from "react-router-dom";

function FictionShelf({ averageScores }) {
  const [fictionBooks, setFictionBooks] = useState([]);

  useEffect(() => {
    async function fetchFictionBooks() {
      try {
        const response = await fetch(`${BASE_URL}/fiction-books`);
        const data = await response.json();

        setFictionBooks(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFictionBooks();
  }, []);

  const firstFiveBooks = fictionBooks.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between">
        <h2 class="underline underline-offset-1 font-bold">Fiction</h2>
        <Link class="underline underline-offset-1 font-bold" to="/fiction">View All</Link>
      </div>

      <div className="flex bg-contain justify-around"
      style={{ backgroundImage: `url(${shelf})`}}>
        {firstFiveBooks.map((book) => (
          <div key={book.isbn}>
            <a href={`/books/${book.isbn}`}>
              <img src={book.bookCover} alt="Image of Book cover" />
            </a>
            {averageScores && averageScores[book.isbn] && (
              <p className="font-bold">Rating: {averageScores[book.isbn].toFixed(2)}/5</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FictionShelf;


