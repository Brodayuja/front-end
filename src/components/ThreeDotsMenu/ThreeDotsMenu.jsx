import { useEffect, useState } from "react";
import { updateComment } from "../api-handlers";
import { deleteMyComment } from "../api-handlers";

function ThreeDotsMenu({ comments, setComments, activeReviewId, setActiveReviewId, commentId, showEditForm, setShowEditForm, commentToEdit }) {
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (isCommentDeleted) {
      setIsCommentDeleted(false);
    }
  }, [comments.content]);
  
  // Find the comment matching the commentId
  const comment = comments.find((c) => c.id === commentId);

  // Handle Toggle Edit
  const handleToggleEdit = () => {
    setShowEditForm(!showEditForm)
  }

    // Handles the Delete Comment Button
    const handleDeleteComment = async (userId, commentId) => {
      try {
        await deleteMyComment(userId, commentId);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.reviewid !== activeReviewId && comment.id === commentId)
        );
        console.log("Comment Deleted");
        setActiveReviewId(null);
      } catch (error) {
        console.log(error);
      }
    };

    // Posts Updated Comment
    const postEditedComment = async () => {
      try {
        await updateComment(commentId, commentToEdit);
        setShowEditForm(!showEditForm)
      } catch (error) {
        console.log(error);
      }
    };
    

  return (
    <>
      {comment && comment.userid == storedUserId && (
        <>
          {showEditForm ? (
            <>
            <button onClick={handleToggleEdit}>Cancel</button>

            <button onClick={postEditedComment}>Update</button>
            </>
          ) : (
            <>
            <button onClick={handleToggleEdit}>Edit</button>
            
            <button onClick={() => handleDeleteComment(comment.userid, commentId)}>
            Delete
          </button>
            
            </>
          )}

        </>
      )}
    </>
  );
}
export default ThreeDotsMenu;