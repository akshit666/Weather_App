import React from "react";
import "../style/Style.css";
import search from "../assets/search.svg";

export default function SearchBar({
  handleSearchChange,
  handleSearch,
  error,
  location, // Accept location prop
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };
  return (
    <>
      <div className="search-container">
        <div className="search-city">
          <input
            type="text"
            placeholder="Search city..."
            className="search-bar"
            value={location} // Set location as the value
            onChange={handleSearchChange}
             onKeyDown={handleKeyDown} 
          />
          <button onClick={handleSearch} className="search-button">
            <img src={search} alt="" />
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
