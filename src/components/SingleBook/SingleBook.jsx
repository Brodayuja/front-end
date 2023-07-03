import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleBookDetail (props) {
    const navigate = useNavigate();
    const { isbn } = useParams();
    const books = props.books;
   

    const bookDetail = books.filter((singleBook)=> {
        if (singleBook.isbn == Number(isbn)) {
            
            return singleBook;
        }
    })

    const handleGoBack = () => {
        navigate("/");
      };

    return (
       <div>
        <h2>This is the detail page</h2>

        <div>
            {books.length ? (
                <div>
                <img src={bookDetail[0].bookCover} alt="Image of Book cover" />
                <p>Title: {bookDetail[0].title}</p>
                <p>Author: {bookDetail[0].author}</p>
                <p>Summary: {bookDetail[0].summary}</p>
                <p>Genres: {bookDetail[0].genre}</p>
                <p>Publisher: {bookDetail[0].publisher}, {bookDetail[0].yearPublished}</p>
                <p>Pages: {bookDetail[0].physicalDescription}</p>
                </div>

            ): (
                <p>Loading . . .</p>
            )}
             <button onClick={handleGoBack}>Go Back</button>
        </div>
       </div>
    )
}

export default SingleBookDetail;


