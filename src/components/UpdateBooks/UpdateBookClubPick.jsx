/* eslint-disable react/prop-types */
import { useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../api-handlers/index"

const UpdateBookClubPick = ({books, setBooks}) => {

    const [newSummary, setNewSummary] = useState("")
    const [newGenre, setNewGenre] = useState([])
    const [newPublisher, setNewPublisher] = useState("")
    const [newYearPublished, setNewYearPublished] = useState("")
    const [newPhysicalDescription, setNewPhysicalDescription] = useState("")
    const currentToken = localStorage.getItem("token")
    const {isbn} = useParams()

    const sendBookUpdates = async (event) => {
        event.preventDefault()
        const updatedBook = {}



        if (newSummary) {
            updatedBook.summary = newSummary
        }
        if (newGenre.length) {
            updatedBook.genre = newGenre
        }
        if (newPublisher) {
            updatedBook.publisher = newPublisher
        }
        if (newYearPublished) {
            updatedBook.yearPublished = newYearPublished
        }
        if (newPhysicalDescription) {
            updatedBook.physicalDescription = newPhysicalDescription
        }

        try {
            const response = await fetch(`${BASE_URL}/book-club-picks/${isbn}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }, 
                body: JSON.stringify(updatedBook)
            });
            
            const data = await response.json();
            const booksWithNoChange = books.filter((e) => { 
              return (e.isbn !== isbn)
            })
            setBooks([...booksWithNoChange, data])
          } catch (error) {
            console.log (error)
          }
        }

        return (
      <>
        <form onSubmit={sendBookUpdates}>

          <label htmlFor="summary">Update Book Summary Below:</label>
          <br />
          <input
            name="summary"
            type="textarea"
            placeholder="Updated Summary Here"
            value={newSummary}
            onChange={(event) => {
              setNewSummary(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="genre">Update Genre:</label>
          <br />
          <input
            name="genre"
            type="text"
            placeholder="ex. Mystery"
            value={newGenre}
            onChange={(event) => {
              setNewGenre(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="publisher">Update Publisher:</label>
          <br />
          <input
            name="publisher"
            type="text"
            placeholder="example: Random House"
            value={newPublisher}
            onChange={(event) => {
              setNewPublisher(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="yearPublished">Update Year of Publication:</label>
          <br />
          <input
            name="yearPublished"
            type="text"
            placeholder="ex. 2023"
            value={newYearPublished}
            onChange={(event) => {
              setNewYearPublished(event.target.value);
            }}
          ></input> <br />
          <label htmlFor="physicalDescription">Update Number of Pages:</label>
          <br />
          <input
            name="physcialDescription"
            type="text"
            placeholder="ex. 388 p."
            value={newPhysicalDescription}
            onChange={(event) => {
              setNewPhysicalDescription(event.target.value);
            }}
          ></input> <br />

          <button type="submit">Submit Updates!</button>
        </form>
      </>
    );
}
export default UpdateBookClubPick