import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search-results?searchTerm=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title / Author / ISBN"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="text-black font-bold">Search</button>
    </form>
  );
};

export default SearchBar;