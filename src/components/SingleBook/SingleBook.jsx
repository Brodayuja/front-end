import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";
import GetAllReviewsByISBN from "../Reviews/ReviewsByIsbn"
import AddReview from "../Reviews/AddReview";

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
        <>
       <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>
        
        
        <div>
            {books.length ? (
                <div className="flex">
                <img className="object-contain" src={bookDetail[0].bookCover} alt="Image of Book cover" />
                    <div className="p-8">
                        <p className="underline text-start">Title: {bookDetail[0].title}</p>
                        <p className="text-start">Author: {bookDetail[0].author}</p>
                        <p className="text-xs text-start">Summary: {bookDetail[0].summary}</p>
                        <p>Genres: {bookDetail[0].genre}</p>
                        <p>Publisher: {bookDetail[0].publisher}, {bookDetail[0].yearPublished}</p>
                        <p>Pages: {bookDetail[0].physicalDescription}</p>
                    </div>
                </div>

            ): (
                <p>Loading . . .</p>
            )}
                <GetAllReviewsByISBN />
                <AddReview /> 
                {/* wrap add review in a button */}
                <button onClick={handleGoBack}>Go Back</button>
            
            
        </div>
       </>
    )
}

export default SingleBookDetail;


