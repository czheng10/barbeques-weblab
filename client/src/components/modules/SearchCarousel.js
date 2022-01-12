import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import "./SearchCarousel.css";

const SearchCarousel = (props) => {
  return (
    <Carousel>
      {props.results.map((user, i) => {
        <Carousel.Item key={i}></Carousel.Item>;
      })}
    </Carousel>
  );
};

export default SearchCarousel;
