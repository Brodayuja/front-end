import shelf from "../images/shelf.png";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import { Link } from "react-router-dom";

function GraphicNovelsShelf({averageScores}) {
    const [graphicNovels, setgraphicNovels] = useState([]);

    useEffect(() => {
        async function fetchgraphicNovels() {
            try {
                const response = await fetch(`${BASE_URL}/graphic-books`);
                const data = await response.json();
          
                setgraphicNovels(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchgraphicNovels();
    }, []);

    const firstFiveBooks = graphicNovels.slice(0, 5);

    return (
        <div>
          <div className="flex justify-between">
            <h2 className="underline underline-offset-1 font-bold">Graphic Novels</h2>
            <Link className="underline underline-offset-1 font-bold" to="/graphicNovels">View All</Link>
          </div>

          <div className="flex bg-contain justify-around py-4 px-2"
          style={{ backgroundImage: `url(${shelf})`}}>
            {firstFiveBooks.map((book) => (
              <div key={book.isbn} className="px-2">
                <a href={`/books/${book.isbn}`}>
                  <img src={book.bookCover} alt="Image of Book cover" />
                </a>
                {averageScores && averageScores[book.isbn] && (
                  <p className="font-bold"> Rating: {averageScores[book.isbn].toFixed(2)}/5</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

export default GraphicNovelsShelf;
