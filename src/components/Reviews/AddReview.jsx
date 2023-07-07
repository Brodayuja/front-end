import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchReviews, BASE_URL } from "../api-handlers/index"

const AddReview = () => {
    const [allReviews, setAllReviews] = useState([])
    const [newContent, setNewContent] = useState("")
    const [newScore, setNewScore] = useState(0)
    const [isbn_nf, setIsbn_nf] = useState("")
    const [isbn_fic, setIsbn_fic] = useState("")
    const [isbn_club, setIsbn_club] = useState("")
    const [isbn_gn, setIsbn_gn] = useState("")
    const [isbn_childrens, setIsbn_childrens] = useState("")
    const { isbn } = useParams();

    useEffect( () => {
        const settingISBN = async () => {
            try {
                const allReviews = await fetchReviews()
                setAllReviews(allReviews)
                allReviews.find((review) =>{
                    if (review.nfBook_isbn == isbn) {
                        setIsbn_nf(Number(isbn))
                    } if (review.nfBook_isbn != isbn) {
                        setIsbn_nf(null)
                        console.log(isbn_nf)
                    } 
                      if (review.fictionBook_isbn == isbn) {
                    setIsbn_fic(Number(isbn))
                    } if (review.ficBook_isbn != isbn) {
                        setIsbn_fic(null)
                        console.log(isbn_fic)
                    } 
                    if (review.graphicBook_isbn == isbn) {
                        setIsbn_gn(Number(isbn))
                    } if (review.gnBook_isbn != isbn) {
                            setIsbn_gn(null)
                            console.log(isbn_gn)
                    } if (review.bookClubBook_isbn == isbn) {
                        setIsbn_club(Number(isbn))
                    } if (review.clubBook_isbn != isbn) {
                        setIsbn_club(null)
                        console.log(isbn_club)
                    } if (review.childrensBook_isbn == isbn) {
                        setIsbn_childrens(Number(isbn))
                    } if (review.childrensBook_isbn != isbn) {
                        setIsbn_childrens(null)
                        console.log(isbn_childrens)
                    } 
                }
                )
                
            } catch (error) {
                console.log(error)
            }
        }
        settingISBN()


    }, [])

    const currentToken = localStorage.getItem("token")
    const currentUserId = localStorage.getItem("userId")

    const sendNewReview = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }, 
                body: JSON.stringify({ 
                    content: newContent,
                    score: newScore,
                    user_id: currentUserId,
                    nfBookISBN: isbn_nf,
                    fictionBookISBN: isbn_fic,
                    graphicBookISBN: isbn_gn,
                    bookClubBookISBN: isbn_club,
                    childrensBookISBN: isbn_childrens,
                    isInappropriate: false,
                    isNotAccurate: false,
                    comment: null
                })
            });
            const data = await response.json();
            console.log(data, "I AM DATA!")
            setAllReviews([...allReviews, data])
            } catch (error) {
                console.log (error)
        }
    }

    return (
      <>
        <form onSubmit={sendNewReview}>
          <label htmlFor="content">Write Your Book Review Here:</label>
          <br />
          <input
            name="content"
            type="textarea"
            value={newContent}
            onChange={(event) => {
              setNewContent(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="score">What rating do you give this book?</label>
          <br />
          <input
            name="score"
            type="number"
            id="score"
            min="1"
            max="5"
            value={newScore}
            onChange={(event) => {
              setNewScore(event.target.value);
            }}
          ></input> <br />

        <button type="submit">Submit!</button>
        </form>
      </>
    );
}
export default AddReview