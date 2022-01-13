import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import "./SearchCarousel.css";

const background = require("../../images/black-background.jpg");

const SearchCarousel = (props) => {
  return (
    <Carousel className="u-flex-alignCenter" indicators={false} interval={null}>
      {props.results.map((user, i) => (
        <Carousel.Item key={i}>
          <img className="d-block mx-auto w-100" src={background.default} alt="background" />
          <Carousel.Caption className="u-flex-justifyCenter">
            <h2>{user.name}</h2>
            <br />
            <p>{user.bio}</p>
            <span className="d-flex Carousel-buttons">
              <button className="btn btn-light">Ask to Join Party</button>
              <button className="btn btn-light">Invite to Party</button>
            </span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SearchCarousel;
