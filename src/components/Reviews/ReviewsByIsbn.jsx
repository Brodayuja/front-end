import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews, fetchUserById, fetchAllComments, postComment, deleteMyComment } from "../api-handlers/index";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";

const GetAllReviewsByISBN = ({ myUserId }) => {
  const { isbn } = useParams();
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [commentText, setCommentText] = useState({});

  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchReviewsAndUsernames = async () => {
      try {
        const fetchedReviews = await fetchReviews();
        const filteredReviews = fetchedReviews.filter(
          (review) =>
            review.nfBook_isbn === isbn ||
            review.fictionBook_isbn === isbn ||
            review.graphicBook_isbn === isbn ||
            review.bookClubBook_isbn === isbn ||
            review.childrensBook_isbn === isbn
        );

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

  useEffect(() => {
    const getComments = async () => {
      try {
        const fetchedComments = await fetchAllComments();
        const filteredComments = fetchedComments.filter(
          (comment) => comment.reviewid === activeReviewId
        );
        setComments(filteredComments);
      } catch (error) {
        console.log(error);
      }
    };

    if (activeReviewId) {
      getComments();
    }
  }, [activeReviewId]);

  const handleToggleComments = (reviewId) => {
    if (activeReviewId === reviewId) {
      setActiveReviewId(null);
    } else {
      setActiveReviewId(reviewId);
    }
  };

  const handleCommentChange = (event, reviewId) => {
    const updatedCommentText = { ...commentText };
    updatedCommentText[reviewId] = event.target.value;
    setCommentText(updatedCommentText);
  };

  const handlePostComment = async (reviewId) => {
    try {
      const newComment = await postComment(
        myUserId,
        commentText[reviewId],
        storedUsername,
        reviewId
      );

      setComments((prevComments) => [...prevComments, newComment]);

      setCommentText((prevCommentText) => {
        const updatedCommentText = { ...prevCommentText };
        delete updatedCommentText[reviewId];
        return updatedCommentText;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {reviewsByIsbn.map((review) => (
          <div key={review.id} className="border rounded-md p-4 mb-4">
            <p className="font-bold">Username: {review.username}</p>
            <div className="mt-2">Score: {review.score}</div>
            <div className="mt-2">Review: {review.content}</div>

            <div>
              {activeReviewId === review.id && (
                <>
                  {comments
                    .filter((comment) => comment.reviewid === review.id)
                    .map((comment) => (
                      <div key={comment.id} className="border rounded-md p-2 mt-2">
                        <p>From: {comment.username}</p>
                        <p>{comment.content}</p>
                        
                        <ThreeDotsMenu comments={comments} />
                      </div>
                    ))}
                </>
              )}
            </div>

            <div>
              {/* Reply box */}
              <input
                type="text"
                value={commentText[review.id] || ""} 
                onChange={(event) => handleCommentChange(event, review.id)}
                placeholder="Enter your comment"
              />
              <button onClick={() => handlePostComment(review.id)}>Post Comment</button>
            </div>

            <button onClick={() => handleToggleComments(review.id)}>
              {activeReviewId === review.id ? "Hide Comments" : "View All Comments"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default GetAllReviewsByISBN;
