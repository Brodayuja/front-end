import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import { Link } from "react-router-dom";

function ChildrensBooksShelf() {
    const [childrensBooks, setChildrensBooks] = useState([]);

    useEffect(() => {
        async function fetchchildrensBooks() {
            try {
                const response = await fetch(`${BASE_URL}/childrens-books`);
                const data = await response.json();
          
                setChildrensBooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchchildrensBooks();
    }, []);

    const firstFiveBooks = childrensBooks.slice(0, 5);

    return (
        <div>
            <div className="flex justify-between">
                <h2>Children's Books</h2>
                <Link to="/childbooks">View All</Link>
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

export default ChildrensBooksShelf;
