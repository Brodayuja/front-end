/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import GetAllReviewsByISBN from "../Reviews/ReviewsByIsbn";
import AddReview from "../Reviews/AddReview";
import { fetchReviews, fetchUserById } from "../api-handlers";
import AverageReviewScore from "../AverageReviewScore/AverageReviewScore";

function SingleBookDetail({
  reviews,
  books,
  isLoggedIn,
  setIsLoggedIn,
  myUsername,
  setBooks,
}) {
  const { isbn } = useParams();
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);
  const [updatedReview, setUpdatedReview] = useState([]);
  const [userIds, setUserIds] = useState([])


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



          const updatedReviews = await Promise.all(
          filteredReviews.map(async (review) => {
            const user = await fetchUserById(review.user_id);
            return { ...review, username: user.username };
          })
        );

        setReviewsByIsbn(updatedReviews);
          
        const mappedReviews = updatedReviews.map((review) => review.user_id)

        setUserIds(mappedReviews)


      };
      getFetchedReviews();

    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddReview = () => {
    setShowAddReview(!showAddReview);
  };

  const handleCancelReview = () => {
    setShowAddReview(!showAddReview);
  };

  // const userIds = reviewsByIsbn.map((review) => review.user_id);
  const token = localStorage.getItem("token");

  return (
    <>
      <NavBar
        myUserId={myUserId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        reviews={reviews} />

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
                    setUserIds={setUserIds}
                    userIds={userIds}
                    myUserId={myUserId}
                    setShowAddReview={setShowAddReview}
                    handleCancelReview={handleCancelReview}
                    reviews={reviews}
                    setUpdatedReview={setUpdatedReview}
                    reviewsByIsbn={reviewsByIsbn}
                    setReviewsByIsbn={setReviewsByIsbn}
                  />
                </div>
              ) : (
                <div className="ml-6 mt-2 inline-block rounded-xl px-2">
                  {(!userIds.includes(Number(myUserId))) || (!userIds.length)? (
                    <button onClick={handleAddReview}>Add Review</button>
                  ) : (
                    <p className="ml-1 font-bold">Already reviewed</p>
                  )}
                </div>
              )}
            </>
          )}

          {reviewsByIsbn.length ? (
            <GetAllReviewsByISBN myUserId={myUserId} myUsername={myUsername} setShowAddReview={setShowAddReview} showAddReview={showAddReview} reviewsByIsbn={reviewsByIsbn} setReviewsByIsbn={setReviewsByIsbn} userIds={userIds} setUserIds={setUserIds}/>
          ) : (
            <p>No Reviews</p>
          )}

          
        </div>
      </div>
    </>
  );
}

export default SingleBookDetail;
