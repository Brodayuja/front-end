import { useEffect, useState } from "react";
import { BASE_URL } from "../api-handlers";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

function GraphicNovels({
  myUserId,
  isLoggedIn,
  setIsLoggedIn,
  reviews}) {
  const [graphicNovels, setGraphicNovels] = useState([]);
  const [sortBy, setSortBy] = useState(""); 

  useEffect(() => {
    async function fetchGraphicNovels() {
      try {
        const response = await fetch(`${BASE_URL}/graphic-books`);
        const data = await response.json();

        setGraphicNovels(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGraphicNovels();
  }, []);

  
  const handleSort = (event) => {
    const selectedOption = event.target.value;
    let sortedNovels = [...graphicNovels];
    if (selectedOption === "Release Date") {
      sortedNovels = sortedNovels.sort((a, b) => {
        return a.yearPublished - b.yearPublished;
      });
    } else if (selectedOption === "Title") {
      sortedNovels = sortedNovels.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    setGraphicNovels(sortedNovels);
    setSortBy(selectedOption);
  };

  return (
    <>
      <NavBar
        myUserId={myUserId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        reviews={reviews} />

      <div className="mx-8">
        <h1>Graphic Novels / Manga</h1>
        <div>
          <label htmlFor="sortDropdown">Sort By:</label>
          <select id="sortDropdown" value={sortBy} onChange={handleSort}>
            <option value="">-- Select Option --</option>
            <option value="Release Date">Release Date</option>
            <option value="Title">Title</option>
          </select>
          {sortBy && <p>Sorted by: {sortBy}</p>}
        </div>
        <div className="flex flex-wrap p-8 justify-center">
          {graphicNovels.map((book) => (
            <div className="w-150 pr-20" key={book.isbn}>
              <Link to={`/books/${book.isbn}`}>
                <img src={book.bookCover} alt="Image of Book cover" />
                <h3 className="w-40 pr-8">{book.title}</h3>
                <p className="w-40 pb-4">{book.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GraphicNovels;
