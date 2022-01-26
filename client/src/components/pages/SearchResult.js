import React, { useState, useEffect } from "react";
import SearchCarousel from "../modules/SearchCarousel";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./SearchResult.css";

const SearchResult = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (props.userId) {
      get("/api/search", { phrase: props.searchPhrase ? props.searchPhrase : "" }).then(
        (results) => {
          setSearchResults(results.filter((user) => user._id !== props.userId));
        }
      );
    }
  }, [props]);

  if (!props.userId) {
    return <div>Please log in to use the search feature</div>;
  }
  return (
    <>
      <h1 className="u-textCenter search-header my-3">
        {props.searchPhrase ? `Search Results for: ${props.searchPhrase}` : `All Search Results`}
      </h1>
      {alert ? (
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          {alert}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlert("")}
          ></button>
        </div>
      ) : null}
      <SearchCarousel results={searchResults} userId={props.userId} updateAlert={setAlert} />
    </>
  );
};

export default SearchResult;
