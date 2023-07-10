import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews, fetchUserById, fetchAllComments, postComment } from "../api-handlers/index";


const GetAllReviewsByISBN = ({myUserId}) => {
  const { isbn } = useParams();
  const [reviewsByIsbn, setReviewsByIsbn] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const storedUsername = localStorage.getItem("username")


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


  useEffect(() => {
    const getComments = async () => {
      try {
        const fetchedComments = await fetchAllComments();
        const filteredComments = fetchedComments.filter(comment => comment.reviewId === reviewsByIsbn.id);
        setComments(filteredComments);
      } catch (error) {
        console.log(error);
      }
    };
 
    getComments();
  }, [reviewsByIsbn]);
 
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };


  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };


const handlePostComment = async (reviewId) => {
  try {
    const newComment = await postComment(myUserId, commentText, storedUsername, reviewId);
    console.log(myUserId, "UserId")
    console.log(commentText, "content")
    console.log(storedUsername, "myUsername")
    console.log(reviewId, "reviewId")
    setComments([...comments, newComment]);
    setCommentText("");
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
            {showComments && (
              <>
                {comments.filter((comment) => comment.reviewid === review.id)
                  .map((comment) => (
                    <div key={comment.id} className="border rounded-md p-2 mt-2">
                      <p>From: {comment.username}</p>
                      <p>{comment.content}</p>
                    </div>
                  ))}
              </>
            )}
          </div>


          <div>
            {/* Reply box */}
            <input
              type="text"
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Enter your comment"
            />
            <button onClick={() => handlePostComment(review.id)}>Post Comment</button>
          </div>


          <button onClick={handleToggleComments}>
            {showComments ? "Hide Comments" : "View All Comments"}
          </button>
        </div>
      ))}
    </div>
  </>
);
};


export default GetAllReviewsByISBN;



