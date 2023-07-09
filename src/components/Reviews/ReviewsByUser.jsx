import { fetchAllBooks, fetchReviews } from "../api-handlers/index"


const GetAllReviewsByUser = async () => {
    const currentUserId = localStorage.getItem("userId")
    try {
        const allReviews = await fetchReviews()
        allReviews.map((review) => {
            if (currentUserId == review.user_id) {
                return review
            }
        })

    } catch (error) {
        console.log(error)
    }

    const bookReviewed = async () => {
        const books = await fetchAllBooks()
          if (review.nfBook_isbn == books.isbn || 
                review.fictionBook_isbn == books.isbn ||
                review.graphicBook_isbn == books.isbn ||
                review.bookClubBook_isbn == books.isbn ||
                review.childrensBook_isbn == books.isbn) {
            return books
        
    }
    }
    bookReviewed()

    return (
        <div>
            <p>User#: {currentUserId}</p>
            <p>Book: {books.title}, Book ISBN: {books.isbn} </p>
            <p>Review: {review.content}</p>
            <p>User rating: {review.score} </p>
        </div>
    )
}

export default GetAllReviewsByUser