import { useState, useEffect } from "react";
import { fetchAllBooks } from "../api-handlers";

function ReviewBookShelf (props) {
    const books = props.books;
    
    return(

            <div>
                <h2 className="text-left">New Releases</h2>
                <div className="flex flex-row justify-between">
                    {books.length ? (
                        books.map((element) => (
                           
                            <div key={element.ISBN} className="w-1/4 px-2 bg-columbiaBlue">

                                <img src={element.bookCover} alt="Image of Book cover"></img>
                                {/* <h4>{element.title}</h4> */}
                                {/* Need to be able to render Score Here*/}
                                
                            </div>
                        ))
                    ) : (
                        <p>Loading . . .</p>
                    )}

                </div>

        </div>
    )
}

export default ReviewBookShelf;