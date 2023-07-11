import { useEffect, useState } from "react";
import { fetchReviews } from "../api-handlers";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const storedId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>My Reviews</h2>
      <div className="flex flex-wrap">
        {reviews.map((review) => {
          if (review.user_id == storedId) {
            return (
              <div key={review.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                <div className="border rounded-lg p-4">
                  <p className="text-lg font-bold mb-2">{review.content}</p>
                  {/* Add additional review details or styling as needed */}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}

export default MyReviews;
