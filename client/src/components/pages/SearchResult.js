import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./SearchResult.css";

const SearchResult = (props) => {
  const searchPhrase = props["searchPhrase?"];

  if (!props.userId) {
    return <div>Please log in to use the search feature</div>;
  }
  return (
    <>
      <h1 className="u-textCenter">
        {searchPhrase ? `Search Results for: ${searchPhrase}` : `All Search Results`}
      </h1>
    </>
  );
};

export default SearchResult;
