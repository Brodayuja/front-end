import { useState, useEffect } from "react";
import { deleteMyReview, updateReview } from "../api-handlers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ReviewsMenu(props) {
  const userIds = props.userIds
  const setUserIds = props.setUserIds
  const review = props.review
  const reviewUserId = props.reviewUserId
  const reviewId = props.reviewId
  const reviewsByIsbn = props.reviewsByIsbn
  const setReviewsByIsbn = props.setReviewsByIsbn
  const setShowAddReview = props.setShowAddReview
  const showAddReview = props.showAddReview
  const [reviewContentToEdit, setReviewContentToEdit] = useState({});
  const [reviewScoreToEdit, setReviewScoreToEdit] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const storedUserId = localStorage.getItem("userId");

  // Delete My Review
  const handleDeleteReview = async (userId, reviewId) => {

    try {
      await deleteMyReview(userId, reviewId);
      setReviewsByIsbn((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      
      const userIdExists = userIds.includes(userId);
        if (userIdExists) {
      setUserIds((prevUserIds) => prevUserIds.filter((id) => id !== userId));
      }

      setShowAddReview(false);

    } catch (error) {
      console.log(error);
    }
  };

  // Posts Update Review
  const postEditedReview = async (event) => {
    event.preventDefault();
    try {
      const postUpdatedReview = await updateReview(
        reviewId,
        reviewContentToEdit,
        reviewScoreToEdit
      );
      if (postUpdatedReview) {
        const filteredReviews = reviewsByIsbn.filter((newReview) => {
          if (newReview.id !== reviewId) {
            return true;
          }
        });
        const userName = localStorage.getItem("username");
        postUpdatedReview.username = userName;
        setReviewsByIsbn([postUpdatedReview, ...filteredReviews]);
        setReviewScoreToEdit(review.score);
        setReviewContentToEdit(review.content)
      }
      setShowEditForm(!showEditForm);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Toggle Edit
  const handleToggleEdit = () => {
    setShowEditForm(!showEditForm);

  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SettingsIcon />
        </DropdownMenuTrigger>
        {review.user_id == storedUserId && (
          <>
            {showEditForm ? (
              <DialogContent>
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
                    onChange={(event) =>
                      setReviewContentToEdit(event.target.value)
                    }
                  />

                  <button type="submit">Update</button>
                </form>
              </DialogContent>
            ) : (
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <button onClick={handleToggleEdit}>Edit</button>
                </DialogTrigger>

                <button
                  onClick={() => handleDeleteReview(reviewUserId, reviewId)}
                >
                  Delete
                </button>
              </DropdownMenuContent>
            )}
          </>
        )}
      </DropdownMenu>
    </Dialog>
  );
}
export default ReviewsMenu;
