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
        <h2>Fiction</h2>
        <Link to="/fiction">View All</Link>
      </div>
      <div className="flex flex-row justify-between">
        {firstFiveBooks.map((book) => (
          <div key={book.isbn} className="w-1/4 px-2 bg-columbiaBlue">
            <a href={`/books/${book.isbn}`}>
              <img src={book.bookCover} alt="Image of Book cover" />
            </a>
            {averageScores && averageScores[book.isbn] && (
              <p>Rating: {averageScores[book.isbn].toFixed(2)}/5</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FictionShelf;


