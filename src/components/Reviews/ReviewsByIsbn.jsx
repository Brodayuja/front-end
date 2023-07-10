import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews, fetchUserById } from "../api-handlers/index";

const GetAllReviewsByISBN = () => {
  const { isbn } = useParams();
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);

  useEffect(() => {
    const fetchReviewsAndUsernames = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviewsAndUsernames();
  }, []);

  return (
    <>
     <div>
  {reviewsByIsbn.map((review) => (
    <div key={review.id} className="border rounded-md p-4 mb-4">
      <p className="font-bold">Username: {review.username}</p>
      <div className="mt-2">Review: {review.content}</div>
      
      <button>View All Comments</button>

    </div>
  ))}
</div>

    </>
  );
};

export default GetAllReviewsByISBN;