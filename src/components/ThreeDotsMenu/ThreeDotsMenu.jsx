import { deleteMyComment } from "../api-handlers";
import { useEffect, useState } from "react";

function ThreeDotsMenu({ comments }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);

  const handleDeleteComment = async () => {
    try {
      await deleteMyComment(comments.userid, comments[0].id);
      setIsCommentDeleted(true);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if (isCommentDeleted) {
        setIsCommentDeleted(false)
    }
  }, [comments])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  if (isCommentDeleted) {
    return null;
  }

  return (
    <>
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          ...
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleDeleteComment}>
              Delete Comment
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ThreeDotsMenu;
