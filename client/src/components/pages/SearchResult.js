import React, { useState, useEffect } from "react";
import SearchCarousel from "../modules/SearchCarousel";
import { Carousel } from "react-bootstrap";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./SearchResult.css";

const SearchResult = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    get(`/api/search/${props.searchPhrase ? props.searchPhrase : ""}`).then((results) => {
      setSearchResults(results);
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
      <SearchCarousel results={searchResults} userId={props.userId} />
    </>
  );
};

export default SearchResult;
