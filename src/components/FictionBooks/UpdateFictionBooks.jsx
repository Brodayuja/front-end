/* eslint-disable react/prop-types */
import { useState } from "react"
import { UpdateFiction } from "../UpdateBooks/UpdateFiction"
import { UpdateNonfiction } from "../UpdateBooks/UpdateNonfiction"
import { UpdateChildrens } from "../UpdateBooks/UpdateChildrens"
import { UpdateGraphicNovel } from "../UpdateBooks/UpdateGraphicNovel"
import { UpdateBookClubPick } from "../UpdateBooks/UpdateBookClubPick"


const UpdateFictionBook = () => {
    const [category, setCategory] = useState("")
    const currentToken = localStorage.getItem("token")

  return (
      <>
        <h2><b>Update Book:</b></h2>
        <form >
          <label htmlFor="category">Select category: </label>
          <select id="category" name="category">
            <option></option>
            <option value="Nonfiction Book"
            onChange={(event)=>{
              setCategory(event.target.value)
            }}
            >Nonfiction Book</option>
            <option value="Fiction Book"
            onChange={(event)=>{
              setCategory(event.target.value)
            }}
            >Fiction Book</option>
            <option value="Graphic Novel/Manga"
            onChange={(event)=>{
              setCategory(event.target.value)
            }}
            >Graphic Novel/Manga</option>
            <option value="Book Club Pick"
            onChange={(event)=>{
              setCategory(event.target.value)
            }}
            >Book Club Pick</option>
            <option value="Children's Book"
            onChange={(event)=>{
              setCategory(event.target.value)
            }}
            >Children's Book</option>
          </select>
        </form>
        {
          category == "Nonfiction Book" ? <UpdateNonfiction /> : null  
        }
        {
          category == "Fiction Book" ? <UpdateFiction /> : null  
        }
        {
          category == "Children's Book" ? <UpdateChildrens /> : null
        }
        {
          category == "Book Club Pick" ? <UpdateBookClubPick /> : null
        }
        {
          category == "Graphic Novel/Manga" ? <UpdateGraphicNovel /> : null
        }
       
      </>
    );
}
export default UpdateFictionBook