import { useState } from "react"
import { BASE_URL } from "../api-handlers/index"

const AddChildrensBook = () => {
    const [ficBooks, setFicBooks] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newIllustrator, setNewIllustrator] = useState("")
    const [newISBN, setNewISBN] = useState(9780000000000)
    const [newSummary, setNewSummary] = useState("")
    const [newGenre, setNewGenre] = useState([])
    const [newPublisher, setNewPublisher] = useState("")
    const [newYearPublished, setNewYearPublished] = useState("")
    const [newPhysicalDescription, setNewPhysicalDescription] = useState("")
    const [newBookCover, setNewBookCover] = useState("")
    const [newAudience, setNewAudience] = useState("")
    const currentToken = localStorage.getItem("token")

    const sendNewBookRequest = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/childrens-books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }, 
                body: JSON.stringify({
                        title: newTitle,
                        author: newAuthor,
                        illustrator: newIllustrator,
                        isbn: newISBN,
                        summary: newSummary,
                        publisher: newPublisher,
                        yearPublished: newYearPublished,
                        bookCover: newBookCover,
                        genre: newGenre,
                        audience: newAudience,
                        physicalDescription: newPhysicalDescription
                })
            });
            const data = await response.json();
            setFicBooks([...ficBooks, data])
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

          <label htmlFor="illustrator">Illustrator:</label>
          <br />
          <input
            name="illustrator"
            type="text"
            placeholder="Illustrator of Book"
            value={newIllustrator}
            onChange={(event) => {
              setNewIllustrator(event.target.value);
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
              setNewISBN(Number(event.target.value));
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
                <label htmlFor="genre">Biography/Autobiography</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Biography/Autobiography"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Concepts: ABCs, 123s, Colors</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Concepts: ABCs, 123s, Colors"
                  onChange={(event)=> {
                    setNewGenre([...newGenre, event.target.value])
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="genre">Fairy Tale/Folktale</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Fairy Tale/Folktale"
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
                <label htmlFor="genre">Picture Book</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Picture Book"
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
                <label htmlFor="genre">Self-Help</label>
                <input 
                  type="checkbox" 
                  id="genre" 
                  name="genre" 
                  value="Self-Help"
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
            <fieldset>
              <legend>Select the audience for the book being added:</legend>

              <div>
                <label htmlFor="category">Ages 0-2</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Ages 0-2"
                  onChange={(event)=> {
                    setNewAudience(event.target.value)

                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Ages 2-5</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Ages 2-5"
                  onChange={(event)=> {
                    setNewAudience(event.target.value)

                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Ages 5-8</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Ages 5-8"
                  onChange={(event)=> {
                    setNewAudience(event.target.value)

                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Ages 9-12</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Ages 9-12"
                  onChange={(event)=> {
                    setNewAudience(event.target.value)

                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Ages 13-18+</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Ages 13-18+"
                  onChange={(event)=> {
                    setNewAudience(event.target.value)

                  }
                  }>
                  </input> 
              </div>
   
          </fieldset>
          <label htmlFor="physicalDescription">Enter Number of Pages:</label>
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

          <button type="submit">Submit!</button>
        </form>
      </>
    );
}
export default AddChildrensBook