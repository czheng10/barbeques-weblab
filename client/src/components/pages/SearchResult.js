import React, { useState, useEffect } from "react";
import SearchCarousel from "../modules/SearchCarousel";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./SearchResult.css";

const SearchResult = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    get("/api/search", { phrase: props.searchPhrase ? props.searchPhrase : "" }).then((results) => {
      setSearchResults(results.filter((id) => id !== props.userId));
    });
  }, [props.searchPhrase]);

  if (!props.userId) {
    return <div>Please log in to use the search feature</div>;
  }
  return (
    <>
      <h1 className="u-textCenter">
        {props.searchPhrase ? `Search Results for: ${props.searchPhrase}` : `All Search Results`}
      </h1>
      <button onClick={handleParty}>Make Party</button>
      <SearchCarousel results={searchResults} userId={props.userId} />
    </>
  );
};

export default SearchResult;
