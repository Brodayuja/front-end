import { useEffect, useState } from "react";
import { fetchReviews } from "../api-handlers";

function MyReviews({books}) {
  const [reviews, setReviews] = useState([]);
  const storedId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
        
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
            // Find the book object based on the review's ISBN
            const book = books.find((b) => b.isbn === review.nfBook_isbn || b.isbn === review.fictionBook_isbn || b.isbn === review.greaphicBook_isbn || b.isbn === review.bookClubBook_isbn || b.isbn === review.childrensBook_isbn );


            return (
                <div key={review.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                  <div className="border rounded-lg p-4 flex">
                       {/* book?.title if book isn't immediately accessed */}
                    <a href={`/books/${book?.isbn}`} className="flex">
                      {book && (
                        <div className="w-1/4">
                          <img src={book?.bookCover} alt="Book Cover" className="w-full" />
                        </div>
                      )}
                      <div className="ml-4">
                        {/* book?.title if book isn't immediately accessed */}
                        <p className="font-bold mb-2">{book?.title}</p>
                        <p className="mt-auto">{review.content}</p>
                      </div>
                    </a>
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
