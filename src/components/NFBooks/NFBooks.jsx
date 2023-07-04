import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function NFBooks() {
    const [NFBooks, setNFBooks] = useState([]);

    useEffect(()=>{
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

    return (
        <>
        <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>
        
        <div>
            <h1>Non-Fiction Books</h1>
            {NFBooks.map(book => (
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

export default NFBooks;
