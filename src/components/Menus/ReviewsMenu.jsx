import { useState, useEffect } from "react";
import { deleteMyReview, updateReview } from "../api-handlers";

function ReviewsMenu({review, reviewUserId, reviewId, reviewsByIsbn, setReviewsByIsbn}){
    const [reviewContentToEdit, setReviewContentToEdit] = useState({})
    const [reviewScoreToEdit, setReviewScoreToEdit] = useState({})
    const [showEditForm, setShowEditForm] = useState(false)

    const storedUserId = localStorage.getItem("userId");

// Delete My Review
  const handleDeleteReview = async (userId, reviewId) => {
    try {
      await deleteMyReview(userId, reviewId);
      setReviewsByIsbn((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId))

      
    } catch (error) {
      console.log(error);
    }
  };

// Posts Update Review
const postEditedReview = async (event) => {
    event.preventDefault()
    try {
        const postUpdatedReview = await updateReview(reviewId, reviewContentToEdit, reviewScoreToEdit )
        if(postUpdatedReview){
            const filteredReviews = reviewsByIsbn.filter((newReview)=>{
                if(newReview.id !== reviewId){
                    return true;
                }
            })
            const userName = localStorage.getItem("username")
            postUpdatedReview.username = userName
            setReviewsByIsbn([postUpdatedReview, ...filteredReviews])
        }
        setShowEditForm(!showEditForm)
    } catch (error) {
        console.log(error)
    }
}

  // Handle Toggle Edit
  const handleToggleEdit = () => {
    setShowEditForm(!showEditForm)
  }

  useEffect(()=>{
    if(review){
        setReviewScoreToEdit(review.score)
        setReviewContentToEdit(review.content)
    }
  },[review])


        return (
            <>
              {review.user_id == storedUserId && (
                <>
                  {showEditForm ? (
                    <>
                      <form onSubmit={postEditedReview}>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={reviewScoreToEdit}
                          onChange={(event) => {
                            setReviewScoreToEdit(event.target.value);
                          }}
                        />
          
                        <input
                          type="text"
                          value={reviewContentToEdit}
                          onChange={(event) => setReviewContentToEdit(event.target.value)}
                        />
                        <button type="submit">Update</button>
                      </form>
                    </>
                  ) : (
                    <>
                      <button onClick={handleToggleEdit}>Edit</button>
                      <button onClick={() => handleDeleteReview(reviewUserId, reviewId)}>Delete</button>
                    </>
                  )}
                </>
              )}
            </>
          );
        }
export default ReviewsMenu;