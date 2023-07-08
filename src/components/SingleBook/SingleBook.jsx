import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";
import GetAllReviewsByISBN from "../Reviews/ReviewsByIsbn";
import AddReview from "../Reviews/AddReview";

function SingleBookDetail({ books, isLoggedIn }) {
  const navigate = useNavigate();
  const { isbn } = useParams();

  const [showAddReview, setShowAddReview] = useState(false);

  const bookDetail = books.filter((singleBook) => {
    if (singleBook.isbn == Number(isbn)) {
      return singleBook;
    }
  });

  const handleAddReview = () => {
    setShowAddReview(true);
  };

  const handleCancelReview = () => {
    setShowAddReview(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
        <NavBar />
      </div>

      <div>
        {books.length ? (
          <div className="flex">
            <img
              className="object-contain"
              src={bookDetail[0].bookCover}
              alt="Image of Book cover"
            />
            <div className="p-8">
              <p className="underline text-start">Title: {bookDetail[0].title}</p>
              <p className="text-start">Author: {bookDetail[0].author}</p>
              <p className="text-xs text-start">Summary: {bookDetail[0].summary}</p>
              <p>Genres: {bookDetail[0].genre}</p>
              <p>
                Publisher: {bookDetail[0].publisher}, {bookDetail[0].yearPublished}
              </p>
              <p>Pages: {bookDetail[0].physicalDescription}</p>
            </div>
          </div>
        ) : (
          <p>Loading . . .</p>
        )}
        <div>
          {isLoggedIn && (
            <>
              {showAddReview ? (
                <div>
                  <AddReview />
                  <button onClick={handleCancelReview}>Cancel</button>
                </div>
              ) : (
                <>
                  <button onClick={handleAddReview}>Add Review</button>
                  <GetAllReviewsByISBN />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleBookDetail;
