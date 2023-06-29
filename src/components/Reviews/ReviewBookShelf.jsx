import { useState, useEffect } from "react";
import { fetchAllBooks } from "../api-handlers";

function ReviewBookShelf () {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const getBooks = async () => {
            try {
                const result = await fetchAllBooks();
                setBooks(result);
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks();
    }, [])



    return(
        <>
    <h2>I am reviews</h2>
    {/* {console.log(books)} */}

        <div className="flex-row">
            {books.length ? (
                books.map((element) => (
                    <div key={element.ISBN}>

                        <img src={element.bookCover} alt="Image of Book cover"></img>
                        <h4>{element.title}</h4>
                        {/* Need to be able to render Score Here*/}
                        
                    </div>
                ))
            ) : (
                <p>Loading . . .</p>
            )}

        </div>

        </>
    )
}

export default ReviewBookShelf;