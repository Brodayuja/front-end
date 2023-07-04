function RecentReviewsShelf (props) {
    const books = props.books;
    
    return(

        <div>
          <div className="flex justify-between">
            <h2>New Releases</h2>
          </div>

        <div className="flex flex-row justify-between">
          {books.length ? (
            books.filter((element)=>{
              const publicationYear = element.yearPublished;
              const currentYear = new Date().getFullYear();
              return publicationYear === currentYear;
            })
            .slice(0,5).map((element) => (
              <div key={element.isbn} className="w-1/4 px-2 bg-columbiaBlue">
                <a href={`/books/${element.isbn}`}>
                  <img src={element.bookCover} alt="Image of Book cover" />
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