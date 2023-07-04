import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";

function GraphicNovels() {
    const [graphicNovels, setgraphicNovels] = useState([]);

    useEffect(()=>{
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

    return (
        <>
        <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>

        <div>
            <h1>Grapic Novels / Manga</h1>
            {graphicNovels.map(book => (
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

export default GraphicNovels;
