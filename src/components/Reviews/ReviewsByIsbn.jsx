import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchReviews,
  fetchUserById,
  fetchAllComments,
  postComment,
  deleteMyComment,
  deleteMyReview,
  updateReview,
  fetchAllUserData,
} from "../api-handlers/index";
import SingleComment from "./SingleComment";
import ReviewsMenu from "../Menus/ReviewsMenu";
import ReportReview from "../ReportReview/ReportReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GetAllReviewsByISBN = (props) => {
  const reviewsByIsbn = props.reviewsByIsbn
  const setReviewsByIsbn = props.setReviewsByIsbn
  const setShowAddReview = props.setShowAddReview
  const showAddReview = props.showAddReview
  const { isbn } = useParams();
  // const [reviewsByIsbn, setReviewsByIsbn] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [showEditReviewForm, setShowEditReviewForm] = useState(false);

  const storedUsername = localStorage.getItem("username");
  const myUserId = localStorage.getItem("userId");

  // Fetches the Reviews w/ usernames
  // useEffect(() => {
  //   const fetchReviewsAndUsernames = async () => {
  //     try {
  //       const fetchedReviews = await fetchReviews();
  //       const filteredReviews = fetchedReviews.filter(
  //         (review) =>
  //           review.nfBook_isbn === isbn ||
  //           review.fictionBook_isbn === isbn ||
  //           review.graphicBook_isbn === isbn ||
  //           review.bookClubBook_isbn === isbn ||
  //           review.childrensBook_isbn === isbn
  //       );

  //       const updatedReviews = await Promise.all(
  //         filteredReviews.map(async (review) => {
  //           const user = await fetchUserById(review.user_id);
  //           return { ...review, username: user.username };
  //         })
  //       );

  //       // setReviewsByIsbn(updatedReviews);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchReviewsAndUsernames();
  // }, []);

  // Fetches the comments based on toggle of ViewAll
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

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchAllUserData();

        return userData;
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  // Closes other Active ViewAlls
  const handleToggleComments = (reviewId) => {
    if (activeReviewId === reviewId) {
      setActiveReviewId(null);
    } else {
      setActiveReviewId(reviewId);
    }
  };

  // Updates commentText for the active reviewID
  const handleCommentText = (event, reviewId) => {
    const updatedCommentText = { ...commentText };
    updatedCommentText[reviewId] = event.target.value;
    setCommentText(updatedCommentText);
  };

  // Handles the Post Comment Button
  const handlePostComment = async (reviewId) => {
    if (!commentText[reviewId] || commentText[reviewId].trim() === "") {
      return; // Return early if comment is empty
    }

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

      setActiveReviewId(reviewId);
    } catch (error) {
      console.log(error);
    }
  };

  // Posts Edited Review
  const postEditedReview = async () => {
    try {
      const postUpdatedReview = await updateReview(reviewId, updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <section className="py-24 2xl:py-44 bg-blueGray-100 rounded-t-10xl overflow-hidden -mt-28">
      {reviewsByIsbn.map((review) => {
       
      return (
        <div key={review.id} className="container px-4 mx-auto my-14">
          <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
            <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-columbiaBlue bg-opacity-40">
              <div className="flex flex-wrap items-center justify-between">
                <Avatar>
                  <AvatarFallback>USER</AvatarFallback>
                </Avatar>

                <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                  {review.username}
                </h4>
                <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                <span className="mr-4 text-xl font-heading font-medium">
                  Score: {review.score}
                </span>
                <div className="inline-flex w-full md:w-1/3 text-right justify-center">
                  <p className="mb-8 text-sm text-gray-500 ">
                  {review.created_at.split("T")[0]} {review.created_at.split("T")[1].substring(0, 5)}
                  </p>
                </div>
                <div className="flex flex-row">
                  <div>
                    <ReviewsMenu
                      setShowAddReview={setShowAddReview}
                      reviewUserId={review.user_id}
                      reviewId={review.id}
                      review={review}
                      reviewsByIsbn={reviewsByIsbn}
                      setReviewsByIsbn={setReviewsByIsbn}
                      showAddReview={showAddReview}
                    />
                  </div>
                  <div>
                    <ReportReview reviewId={review.id} />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-gray-50">
              <div className="flex flex-wrap">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                  <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div>
            {token ? (
              <div className="space-x-4">
                <input
                  type="text"
                  value={commentText[review.id] || ""}
                  onChange={(event) => handleCommentText(event, review.id)}
                  placeholder="Enter your comment"
                />
                <button
                  className="bg-columbiaBlue px-6"
                  onClick={() => handlePostComment(review.id)}
                >
                  Post Comment
                </button>
                <button
                  className="bg-columbiaBlue"
                  onClick={() => handleToggleComments(review.id)}
                >
                  {activeReviewId === review.id ? "Hide Comments" : "View All Comments"}
                </button>
              </div>
            ) : (
              "Must Log in to comment on reviews"
            )}
          </div>



          <div>
            {activeReviewId === review.id && (
              <>
                {comments
                  .filter((comment) => comment.reviewid === review.id)
                  .map((comment) => (
                    <SingleComment
                      key={comment.id}
                      comment={comment}
                      comments={comments}
                      setComments={setComments}
                      activeReviewId={activeReviewId}
                      setActiveReviewId={setActiveReviewId}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )})}
    </section>
  );
};

export default GetAllReviewsByISBN;
