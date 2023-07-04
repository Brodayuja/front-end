import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function FictionPage() {
    const [fictionBooks, setFictionBooks] = useState([]);

    useEffect(()=>{
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

    return (
        <>
        <div>
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>

        <div>
            <h1>Fiction Books</h1>
            {fictionBooks.map(book => (
                <div key={book.isbn}>
                    <a href={`/fiction-books/${book.isbn}`}>
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

export default FictionPage;
