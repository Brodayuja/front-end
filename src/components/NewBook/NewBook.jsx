import { useState, useEffect } from "react"
import { fetchNFBooks, fetchFictionBooks, fetchBookClubPicks, fetchChildrenBooks, fetchGraphicNovels, BASE_URL } from "../api-handlers/index"
import AddNonfictionBook from "./AddNFBook"
import AddFictionBook from "./AddFictionBook"
import AddGraphicNovel from "./AddGraphicNovel"
import AddBookClubPick from "./AddBookClubPick"
import AddChildrensBook from "./AddChildrensBook"

const AddBook = () => {
    const currentToken = localStorage.getItem("token")
    const [category, setCategory] = useState("")

    return (
      <>
        <form>
          <fieldset>
              <legend>Select the category for the book being added:</legend>

              <div>
                <label htmlFor="category">Fiction Book</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Fiction Book"
                  onChange={(event)=> {
                    setCategory(event.target.value)
                    console.log(category)
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Nonfiction Book</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Nonfiction Book"
                  onChange={(event)=> {
                    setCategory(event.target.value)
                    console.log(event.target.value)
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Graphic Novel/Manga</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Graphic Novel/Manga"
                  onChange={(event)=> {
                    setCategory(event.target.value)
                    console.log(category)
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Book Club Pick</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Book Club Pick"
                  onChange={(event)=> {
                    setCategory(event.target.value)
                    console.log(category)
                  }
                  }>
                  </input> 
              </div>
              <div>
                <label htmlFor="category">Children's Book</label>
                <input 
                  type="radio" 
                  id="category" 
                  name="category" 
                  value="Children's Book"
                  onChange={(event)=> {
                    setCategory(event.target.value)
                    console.log(category)
                  }
                  }>
                  </input> 
              </div>
   
          </fieldset>
        </form>
        {
          category == "Nonfiction Book" ? <AddNonfictionBook /> : null  
        }
        {
          category == "Fiction Book" ? <AddFictionBook /> : null
        }
        {
            category == "Graphic Novel/Manga" ? <AddGraphicNovel /> : null
        }
        {
            category == "Book Club Pick" ? <AddBookClubPick /> : null
        }
        {
            category == "Children's Book" ? <AddChildrensBook /> : null
        }
      </>
    
    );
}
export default AddBook