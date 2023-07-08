import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchReviews } from "../api-handlers/index"

const GetAllReviewsByISBN = () => {
    const {isbn} = useParams()
    const [reviewsByIsbn, setReviewsByIsbn] = useState([])
    
    useEffect(()=>{
        
        try {
            const getFetchedReviews = async () => {
                const fetchedReviews = await fetchReviews()
                const reviewsByIsbn = fetchedReviews.filter((review) =>{
                    if (review.nfBook_isbn == isbn || 
                    review.fictionBook_isbn == isbn ||
                    review.graphicBook_isbn == isbn ||
                    review.bookClubBook_isbn == isbn ||
                    review.childrensBook_isbn == isbn) {
                    return true
                    }
                }) 
                setReviewsByIsbn(reviewsByIsbn)
            }
            getFetchedReviews()
        } catch (error) {
            console.log(error)
        }
    }, [])
    

    return (
        <>
        {reviewsByIsbn.map((review) => (
            <div key={review.id}>
                <div>Review from user#: {review.user_id}</div>
                <div>Review: {review.content}</div>
            </div>
          ))}
        </>
            )
}
export default GetAllReviewsByISBN