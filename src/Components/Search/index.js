import React from "react";
// css
import "./style.css";
//icon
import { TfiSearch } from "react-icons/tfi";
const Search = () => {
  const handleSearchRoot = (e) => {};
  return (
    <>
      <div className="search-wrapper">
        <div className="search_icon">
          <TfiSearch />
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="search here..."
            onChange={(e) => handleSearchRoot(e)}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
