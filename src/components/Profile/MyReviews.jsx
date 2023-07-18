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
 <h2 className="font-bold underline">My Reviews</h2>
      <div className="flex flex-col">
        {reviews.map((review) => {
          if (review.user_id == storedId) {
            // Find the book object based on the review's ISBN
            const book = books.find((b) => b.isbn === review.nfBook_isbn || b.isbn === review.fictionBook_isbn || b.isbn === review.greaphicBook_isbn || b.isbn === review.bookClubBook_isbn || b.isbn === review.childrensBook_isbn );


            return (
                <div key={review.id} className="flex">
                  <div className="border p-4 flex">
                       
                       {/* book?.title if book isn't immediately accessed */}
                    {book && (
                        <a href={`/books/${book?.isbn}`} className="flex w-full justify-center">
                          <img src={book?.bookCover} alt="Book Cover"/>
                        </a>
                      )}

                      <div className="mt-4 justify-center text-left">
                        <a href={`/books/${book?.isbn}`} className="underline">

                          {/* book?.title if book isn't immediately accessed */}
                          <p className="font-bold mb-2">{book?.title}</p>
                        </a>  
                                            
                          <p className="mt-auto text-left">{review.content}</p>
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
