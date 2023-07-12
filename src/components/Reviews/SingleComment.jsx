import { useEffect, useState } from "react";
import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";

function SingleComment({comment, comments, setComments, activeReviewId, setActiveReviewId}){
    const [showEditForm, setShowEditForm] = useState(false)
    const [commentToEdit, setCommentToEdit] = useState("")

    useEffect(()=>{
        if(comment){
            setCommentToEdit(comment.content)
        }
    },[comment])
    
    return(
        <div className="border rounded-md p-2 mt-2">
        {showEditForm ? (
          <input
            type="text"
            value={commentToEdit}
            onChange={(event) =>
              setCommentToEdit(event.target.value )
            }
          />
        ) : (
          <div>

            <p>From: {comment.username}</p>
            <p>{comment.content}</p>
          </div>
        )}

        <ThreeDotsMenu
          comments={comments}
          setComments={setComments}
          commentId={comment.id}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          commentToEdit={commentToEdit}
          activeReviewId={activeReviewId}
          setActiveReviewId={setActiveReviewId} 
        />
      </div>
    )
}

export default SingleComment;