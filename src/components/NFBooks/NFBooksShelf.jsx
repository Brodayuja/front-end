import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import { Link } from "react-router-dom";

function NFBooksShelf() {
    const [NFBooks, setNFBooks] = useState([]);

    useEffect(() => {
        async function fetchNFBooks() {
            try {
                const response = await fetch(`${BASE_URL}/nonfiction-books`);
                const data = await response.json();
          
                setNFBooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNFBooks();
    }, []);

    const firstFiveBooks = NFBooks.slice(0, 5);

    return (
        <div>
            <div className="flex justify-between">
                <h2>Non-Fiction</h2>
                <Link to="/nonfiction">View All</Link>
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

export default NFBooksShelf;
