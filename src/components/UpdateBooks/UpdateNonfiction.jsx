/* eslint-disable react/prop-types */
import { useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../api-handlers/index"

const UpdateNonfiction = ({books, setBooks}) => {

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
            const response = await fetch(`${BASE_URL}/nonfiction-books/${isbn}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }, 
                body: JSON.stringify(updatedBook)
            });
            
            const data = await response.json();
            const booksWithNoChange = books.filter((e) => { 
              console.log(e.isbn, typeof e.isbn)
              return (e.isbn !== isbn)
            })
            console.log( data, booksWithNoChange)
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

          <fieldset>
              <legend>Update Book Genre:</legend>
              <div>
                <label htmlFor="genre">Contemporary Fiction</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Contemporary Fiction"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Fantasy</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Fantasy"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Historical Fiction</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Historical Fiction"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Horror</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Horror"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">LGBTQ+</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="LGBTQ+"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Mystery</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Mystery"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Romance</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Romance"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Science Fiction</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Science Fiction"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Short Story </label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Short Story"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
          </fieldset>

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
export default UpdateNonfiction