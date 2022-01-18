import React, { Component } from "react";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container" id="animate-area">
      <h1 className=" home-welcome">
        Welcome to <span className="home-brand">Barbeques</span>
      </h1>
      <h4>Please log in to use our site.</h4>
    </div>
  );
};

export default Home;
