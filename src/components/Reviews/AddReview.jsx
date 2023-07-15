import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL, fetchAllBooksTable, fetchReviews } from "../api-handlers/index"

const AddReview = ({myUserId}) => {
  
    const [newContent, setNewContent] = useState("")
    const [newScore, setNewScore] = useState(0)
    const [isbn_nf, setIsbn_nf] = useState(null)
    const [isbn_fic, setIsbn_fic] = useState(null)
    const [isbn_club, setIsbn_club] = useState(null)
    const [isbn_gn, setIsbn_gn] = useState(null)
    const [isbn_childrens, setIsbn_childrens] = useState(null)
    const { isbn } = useParams();

       useEffect(()=> {
        const settingISBN = async () => {
            try {
                const result = await fetchAllBooksTable();
                const currentBook = result.find(book => book.isbn === isbn)
                  
                if (currentBook.booktype == "bookClubPicksBooks" && currentBook.booktype !== "childrensBooks" && currentBook.booktype !== "fictionBooks" && currentBook.booktype !== "graphicNovelsAndMangaBooks" && currentBook.booktype !== "nfBooks" ) {
                    setIsbn_club(currentBook.isbn)

                } else if (currentBook.booktype !== "bookClubPicksBooks" && currentBook.booktype == "childrensBooks" && currentBook.booktype !== "fictionBooks" && currentBook.booktype !== "graphicNovelsAndMangaBooks" && currentBook.booktype !== "nfBooks" ) {
                    setIsbn_childrens(currentBook.isbn)
                    
                } else if (currentBook.booktype !== "bookClubPicksBooks" && currentBook.booktype !== "childrensBooks" && currentBook.booktype == "fictionBooks" && currentBook.booktype !== "graphicNovelsAndMangaBooks" && currentBook.booktype !== "nfBooks" ) {
                    setIsbn_fic(currentBook.isbn)
                    
                } else if (currentBook.booktype !== "bookClubPicksBooks" && currentBook.booktype !== "childrensBooks" && currentBook.booktype !== "fictionBooks" && currentBook.booktype == "graphicNovelsAndMangaBooks" && currentBook.booktype !== "nfBooks" ) {
                    setIsbn_gn(currentBook.isbn)

                } else if (currentBook.booktype !== "bookClubPicksBooks" && currentBook.booktype !== "childrensBooks" && currentBook.booktype !== "fictionBooks" && currentBook.booktype !== "graphicNovelsAndMangaBooks" && currentBook.booktype == "nfBooks" ) {
                    setIsbn_nf(currentBook.isbn)
                } else {
                    console.log("ISBN not found")
                }
                    
                }
                catch (error) {
                console.log(error)
            }
        }
        settingISBN();
    },[])
    
    const currentToken = localStorage.getItem("token")
  
    const sendNewReview = async (event) => {
        // event.preventDefault()

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
                    userId: myUserId,
                    nfBookISBN: isbn_nf,
                    fictionBookISBN: isbn_fic,
                    graphicBookISBN: isbn_gn,
                    bookClubBookISBN: isbn_club,
                    childrensBookISBN: isbn_childrens,
                    isInappropriate: 0,
                    isNotAccurate: 0,
                    comment: null
                })
            });
            const data = await response.json();
            console.log(data)
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Submit!
          </button>
        </form>
      </>
    );
}
export default AddReview