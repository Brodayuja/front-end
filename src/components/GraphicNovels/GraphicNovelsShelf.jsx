import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import { Link } from "react-router-dom";

function GraphicNovelsShelf() {
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
                <h2>Graphic Novels</h2>
                <Link to="/graphicNovels">View All</Link>
            </div>
        <div className="flex flex-row justify-between">

            {firstFiveBooks.map((book) => (
                <div key={book.isbn} className="w-1/4 px-2 bg-columbiaBlue">
                    <a href={`/books/${book.isbn}`}>
                        <img src={book.bookCover} alt="Image of Book cover" />
                       </a>
                </div>
            ))}
        </div>
        </div>
    );
}

export default GraphicNovelsShelf;
