/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import GetAllReviewsByISBN from "../Reviews/ReviewsByIsbn";
import AddReview from "../Reviews/AddReview";
import { fetchReviews } from "../api-handlers";
import AverageReviewScore from "../AverageReviewScore/AverageReviewScore";

function SingleBookDetail({
  books,
  isLoggedIn,
  setIsLoggedIn,
  myUsername,
  setBooks,
}) {
  const { isbn } = useParams();
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);

  const bookDetail = books.filter((singleBook) => {
    if (singleBook.isbn == Number(isbn)) {
      return singleBook;
    }
  });

  const myUserId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const getFetchedReviews = async () => {
        const fetchedReviews = await fetchReviews();
        const filteredReviews = fetchedReviews.filter((review) => {
          return (
            review.nfBook_isbn === isbn ||
            review.fictionBook_isbn === isbn ||
            review.graphicBook_isbn === isbn ||
            review.bookClubBook_isbn === isbn ||
            review.childrensBook_isbn === isbn
          );
        });
        setReviewsByIsbn(filteredReviews);
      };
      getFetchedReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddReview = () => {
    setShowAddReview(true);
  };

  const handleCancelReview = () => {
    setShowAddReview(false);
  };

  const userIds = reviewsByIsbn.map((review) => review.user_id);
  const token = localStorage.getItem("token");

  return (
    <>
      <NavBar />

      <div className="mx-12 mt-6">
            {books.length ? (
              <div className="flex items-start">
                <img
                  className="w-52 h-auto object-contain flex-shrink-0 shadow-xl"
                  src={bookDetail[0].bookCover}
                  alt="Image of Book cover"
                />
                <div className="px-8">
                  <h2 className="underline text-start font-bold pb-2">
                    {bookDetail[0].title}
                  </h2>

              <p className="text-start pb-2">Author: {bookDetail[0].author}</p>

              <AverageReviewScore reviews={reviewsByIsbn} />

              <p className="text-sm text-start mb-2">
                Summary: {bookDetail[0].summary}
              </p>

              <p><span className="font-bold">Genres:</span> {bookDetail[0].genre}</p>

              <p>
                Publisher: {bookDetail[0].publisher},{" "}
                {bookDetail[0].yearPublished}
              </p>
              <p>Pages: {bookDetail[0].physicalDescription}</p>
            </div>
          </div>
        ) : (
          <p>Loading . . .</p>
        )}
       
          
        
        <div>
          {token && (
            <>
              {showAddReview ? (
                <div className="flex justify-center bg-columbiaBlue rounded-xl border p-2 w-2/3 mt-4">
                  <AddReview
                    myUserId={myUserId}
                    setShowAddReview={setShowAddReview}
                    handleCancelReview={handleCancelReview}
                  />
                </div>
              ) : (
                <div className="ml-6 mt-2 inline-block rounded-xl px-2">
                  {!userIds.includes(Number(myUserId)) ? (
                    <button onClick={handleAddReview}>Add Review</button>
                  ) : (
                    <p className="ml-1 font-bold">Already reviewed</p>
                  )}
                </div>
              )}
            </>
          )}

          <GetAllReviewsByISBN myUserId={myUserId} myUsername={myUsername} />
        </div>
      </div>
    </>
  );
}

export default SingleBookDetail;
