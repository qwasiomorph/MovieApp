import React, { useState } from "react";

const Search = () => {
  const [searchRated, setSearchRated] = useState(true);
  const handleRadio = () => {
    setSearchRated(!searchRated);
  };
  return (
    <div className="search">
      <div className="radioWrap">
        <div className="searchRatedRadio">
          <label className={`radioLabel${searchRated ? " checked" : ""}`}>
            <input
              className="defRadio"
              onChange={handleRadio}
              type="radio"
              name="searchRated"
            />
            Search
          </label>
          <label className={`radioLabel${!searchRated ? " checked" : ""}`}>
            <input
              className="defRadio"
              onChange={handleRadio}
              type="radio"
              name="searchRated"
            />
            Rated
          </label>
        </div>
      </div>
      <div className="inputWrap">
        <input
          className="search__input"
          placeholder="Type to search..."
          type="text"
        />
      </div>
    </div>
  );
};

export default Search;
