import { useEffect, useState } from "react";
function ThreeDotsMenu({ comments, commentId, handleDeleteComment, handleEditComment, showEditForm, setShowEditForm }) {
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (isCommentDeleted) {
      setIsCommentDeleted(false);
    }
  }, [comments]);
  console.log(comments);
  // Find the comment matching the commentId
  const comment = comments.find((c) => c.id === commentId);

  // Handle Toggle Edit
  const handleToggleEdit = () => {
    setShowEditForm(!showEditForm)
  }

  return (
    <>
     
      {comment && comment.userid == storedUserId && (
        <>
         <button onClick={handleToggleEdit}>Edit</button>

        <button
          onClick={() => handleDeleteComment(comment.userid, commentId)}
        >Delete
        </button>
        
        </>
      )}
    </>
  );
}
export default ThreeDotsMenu;