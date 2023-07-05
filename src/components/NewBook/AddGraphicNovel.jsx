import { useState, useEffect } from "react"
import { fetchNFBooks, fetchFictionBooks, fetchBookClubPicks, fetchChildrenBooks, fetchGraphicNovels, BASE_URL } from "../api-handlers/index"

const AddGraphicNovel = () => {
    const [nfBooks, setNFBooks] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newArtist, setNewArtist] = useState("")
    const [newISBN, setNewISBN] = useState("")
    const [newSummary, setNewSummary] = useState("")
    const [newGenre, setNewGenre] = useState([])
    const [newPublisher, setNewPublisher] = useState("")
    const [newYearPublished, setNewYearPublished] = useState("")
    const [newPhysicalDescription, setNewPhysicalDescription] = useState("")
    const [newBookCover, setNewBookCover] = useState("")
    const currentToken = localStorage.getItem("token")

    const sendNewBookRequest = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/graphic-books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${currentToken}`
                }, 
                body: JSON.stringify({
                     post: {
                        title: newTitle,
                        author: newAuthor,
                        artist: newArtist,
                        isbn: newISBN,
                        summary: newSummary,
                        publisher: newPublisher,
                        yearPublished: newYearPublished,
                        bookCover: newBookCover,
                        genre: newGenre,
                        physicalDescription: newPhysicalDescription
                    }
                })
            });
            const data = await response.json();
            setNFBooks([...nfBooks, data])
            } catch (error) {
                console.log (error)
        }
    }

    return (
      <>
        <form onSubmit={sendNewBookRequest}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            name="title"
            type="text"
            placeholder="Title of Book"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="author">Author:</label>
          <br />
          <input
            name="author"
            type="text"
            placeholder="Author of Book"
            value={newAuthor}
            onChange={(event) => {
              setNewAuthor(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="artist">Artist:</label>
          <br />
          <input
            name="artist"
            type="text"
            placeholder="Artist/Colorist of Book"
            value={newArtist}
            onChange={(event) => {
              setNewArtist(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="isbn">Enter Book ISBN:</label>
          <br />
          <input
            name="ISBN"
            type="text"
            placeholder="Enter 13 digit ISBN with no special characters"
            value={newISBN}
            onChange={(event) => {
              setNewISBN(event.target.value);
            }}
          ></input> <br />

          <label htmlFor="summary">Enter Book Summary Below:</label>
          <br />
          <input
            name="summary"
            type="textarea"
            placeholder="New Book Summary Goes Here"
            value={newSummary}
            onChange={(event) => {
              setNewSummary(event.target.value);
            }}
          ></input> <br />


          <label htmlFor="bookCover">Enter Book Cover URL:</label>
          <br />
          <input
            name="bookCover"
            type="url"
            placeholder="Copy Book Cover URL from worldcat.org"
            value={newBookCover}
            onChange={(event) => {
              setNewBookCover(event.target.value);
            }}
          ></input> <br />

          <fieldset>
              <legend>Book Genres:</legend>
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
                <label htmlFor="genre">Fiction</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Fiction"
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
                <label htmlFor="genre">Manga</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Manga"
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
                <label htmlFor="genre">Narrative</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Narrative"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Nonfiction</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Nonfiction"
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
                <label htmlFor="genre">Superhero</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Superhero"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
          </fieldset>

          <label htmlFor="publisher">Enter Book Publisher:</label>
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

          <label htmlFor="yearPublished">Enter Year of Publication:</label>
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
          <label htmlFor="physicalDescription">Enter Number of Pages:</label>
          <br />
          <input
            name="physicalDescription"
            type="text"
            placeholder="ex. 388 p."
            value={newPhysicalDescription}
            onChange={(event) => {
              setNewPhysicalDescription(event.target.value);
              console.log(event.target.value)
            }}
          ></input> <br />

          <button type="submit">Submit!</button>
        </form>
      </>
    );
}
export default AddGraphicNovel