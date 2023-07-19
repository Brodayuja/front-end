import { useEffect, useState } from "react";
import { fetchReviews } from "../api-handlers";
import { Link } from "react-router-dom";

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
 <h2 className="font-bold underline text-start">My Reviews</h2>
      <div className="flex flex-col">
        {reviews.map((review) => {
          if (review.user_id == storedId) {
            // Find the book object based on the review's ISBN
            const book = books.find((b) => b.isbn === review.nfBook_isbn || b.isbn === review.fictionBook_isbn || b.isbn === review.graphicBook_isbn || b.isbn === review.bookClubBook_isbn || b.isbn === review.childrensBook_isbn );


            return (
              <div className="border my-2" key={review.id}>
                  <p className="text-right mr-8 underline">Date Posted: {review.created_at.split("T")[0]} {review.created_at.split("T")[1].substring(0, 5)}</p>
                <div className="flex items-start">
                  {book && (
                    <div className="w-52 h-auto p-8 flex-shrink-0">
                      <Link to={`/books/${book?.isbn}`}>
                        <img src={book?.bookCover} alt="Book Cover" className="w-full h-full object-cover" />
                      </Link>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="text-left p-4">
                      <Link to={`/books/${book?.isbn}`} className="underline">
                        <p className="font-bold mb-2">{book?.title}</p>
                      </Link>  
                      <p className="text-left">{review.content}</p>
                    </div>
                  </div>
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
