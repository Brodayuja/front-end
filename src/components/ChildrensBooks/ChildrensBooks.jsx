import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function ChildrensBooks() {
    const [childrensBooks, setChildrensBooks] = useState([]);

    useEffect(()=>{
        async function fetchChildrensBooks() {
            try {
                const response = await fetch(`${BASE_URL}/childrens-books`);
                const data = await response.json();
                
                setChildrensBooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchChildrensBooks();
    }, []);

    return (
        <>
        <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>

        <div>
            <h1>Children's Books</h1>
            {childrensBooks.map(book => (
                <div key={book.isbn}>
                    <a href={`/books/${book.isbn}`}>
                        <img src={book.bookCover} alt="Image of Book cover" />
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </a>
                </div>
            ))}
        </div>
        </>
    );
}

export default ChildrensBooks;
