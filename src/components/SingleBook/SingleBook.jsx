/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";
import GetAllReviewsByISBN from "../Reviews/ReviewsByIsbn";
import AddReview from "../Reviews/AddReview";
import { fetchReviews } from "../api-handlers";
import UpdateFictionBook from "../FictionBooks/UpdateFictionBooks";
import AverageReviewScore from "../AverageReviewScore/AverageReviewScore";


function SingleBookDetail({ books, isLoggedIn, setIsLoggedIn, myUsername, setBooks}) {
  const { isbn } = useParams();
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);

  const bookDetail = books.filter((singleBook) => {
    if (singleBook.isbn == Number(isbn)) {
      return singleBook;
    }
  });

const myUserId = localStorage.getItem("userId")

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
      <AverageReviewScore reviews={reviewsByIsbn} />
        </div>
        <div>
          {isLoggedIn && (
            <>
              {showAddReview ? (
                <div>
                  <AddReview myUserId={myUserId} />
                  <button onClick={handleCancelReview}>Cancel</button>
                </div>
              ) : (
                <>
                  {!userIds.includes(Number(myUserId)) ? (
                    <button onClick={handleAddReview}>Add Review</button>
                  ) : (
                    <p>You have already reviewed this book.</p>
                  )}
                </>
              )}
            </>
          )}
          <UpdateFictionBook books={books} bookDetail={bookDetail} setBooks={setBooks}/>
          <GetAllReviewsByISBN myUserId={myUserId} myUsername={myUsername}/>
        </div>
      </div>
    </>
  );
}


export default SingleBookDetail;





