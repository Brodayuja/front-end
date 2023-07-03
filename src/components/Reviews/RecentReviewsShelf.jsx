import { useState, useEffect } from "react";
import { fetchAllBooks } from "../api-handlers";

function RecentReviewsShelf (props) {
    const books = props.books;
    
    return(

        <div>
        <h2 className="text-left">New Releases</h2>
        <div className="flex flex-row justify-between">
          {books.length ? (
            books.map((element) => (
              <div key={element.isbn} className="w-1/4 px-2 bg-columbiaBlue">
                <a href={`/books/${element.isbn}`}>
                  <img src={element.bookCover} alt="Image of Book cover" />
                  {/* <h4>{element.title}</h4> */}
                  {/* Need to be able to render Score Here*/}
                </a>
              </div>
            ))
          ) : (
            <p>Loading . . .</p>
          )}
            </div>
        </div>
    )
}

export default RecentReviewsShelf;