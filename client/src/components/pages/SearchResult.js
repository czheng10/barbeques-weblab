import React, { useState, useEffect } from "react";
import SearchCarousel from "../modules/SearchCarousel";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./SearchResult.css";

const SearchResult = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    get("/api/search", { phrase: props.searchPhrase ? props.searchPhrase : "" }).then((results) => {
      setSearchResults(results.filter((user) => user._id !== props.userId));
    });
  }, [props]);

  if (!props.userId) {
    return <div>Please log in to use the search feature</div>;
  }
  return (
    <>
      <h1 className="u-textCenter search-header my-3">
        {props.searchPhrase ? `Search Results for: ${props.searchPhrase}` : `All Search Results`}
      </h1>
      <SearchCarousel results={searchResults} userId={props.userId} />
    </>
  );
};

export default SearchResult;
