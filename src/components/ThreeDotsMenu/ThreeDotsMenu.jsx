import { useEffect, useState } from "react";


function ThreeDotsMenu({ comments, commentId, handleDeleteComment }) {

  const [isCommentDeleted, setIsCommentDeleted] = useState(false);

  const storedUserId = localStorage.getItem("userId");

  useEffect(()=>{
    if (isCommentDeleted) {
        setIsCommentDeleted(false)
    }
  }, [comments])

  console.log(comments)

  return (
    <>
    
    <button>Edit</button>

    <button onClick={() => handleDeleteComment(comments.userid, commentId)}>Delete</button>

  </>
  );
}
  export default ThreeDotsMenu