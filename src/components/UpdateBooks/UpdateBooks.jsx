/* eslint-disable react/prop-types */
import { useState } from "react"
import UpdateFiction from "./UpdateFiction"
import UpdateNonfiction from "./UpdateNonfiction"
import UpdateGraphicNovel from "./UpdateGraphicNovel"
import UpdateBookClubPick from "./UpdateBookClubPick"
import UpdateChildrens from "./UpdateChildrens"

const UpdateFictionBook = () => {
    const [category, setCategory] = useState("")
    const currentToken = localStorage.getItem("token")

  return (
      <>
        <h2><b>Update Book</b></h2>
        <form >
          <fieldset>
              <legend> <b>What category is this book?</b></legend>

              <div>
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
                <label htmlFor="category"> Fiction Book</label>
              </div>
              <div>
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
                <label htmlFor="category"> Nonfiction Book</label>
              </div>
              <div>
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
                <label htmlFor="category"> Graphic Novel/Manga</label>
              </div>
              <div>
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
                <label htmlFor="category"> Book Club Pick</label>
              </div>
              <div>
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
                <label htmlFor="category"> Children's Book </label>
                <br></br>
              </div>
   
          </fieldset>
        </form>
        {
          category == "Nonfiction Book" ? <UpdateNonfiction /> : null  
        }
        {
          category == "Fiction Book" ? <UpdateFiction /> : null
        }
        {
            category == "Graphic Novel/Manga" ? <UpdateGraphicNovel /> : null
        }
        {
            category == "Book Club Pick" ? <UpdateBookClubPick /> : null
        }
        {
            category == "Children's Book" ? <UpdateChildrens /> : null
        }
      </>
    );
}
export default UpdateFictionBook