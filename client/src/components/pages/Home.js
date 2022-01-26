import React, { Component } from "react";
import "../../utilities.css";
import "./Home.css";
import galleryphoto from "../../images/home-gallery.png";
import searchphoto from "../../images/home-search.png";
import partyphoto from "../../images/home-party.png";

const Home = () => {
  return (
    <div className="home-container" id="animate-area">
      <h4 className="home-oneliner"> A One-stop Shop for Food and Friendship </h4>
      <div className="row home-galleryIntro">
        <img className="col-6 home-introImage" src={galleryphoto} />
        <div className="col-1"></div>
        <div className="col-5 home-Text">
          <h3>Show Off Your Cooking Skills</h3>
          <p>A space to share your beautiful dishes for all to see.</p>
        </div>
      </div>
      <div className="row home-partiesIntro">
        <div className="col-5 home-Text">
          <h3>Host and Join Parties with Besties</h3>
          <p>Plan a dinner with friends, old and new, or join one of theirs!</p>
        </div>
        <div className="col-1"></div>
        <img className="col-6 home-introImage" src={partyphoto} />
      </div>
      <div className="row home-searchIntro">
        <img className="col-6 home-introImage" src={searchphoto} />
        <div className="col-1"></div>
        <div className="col-5 home-Text">
          <h3>Meet New People with the Same Taste</h3>
          <p>Find friends who crave (and avoid) the same foods as you.</p>
        </div>
      </div>
      <div className="disclaimers">
        <p className="disclaim">
          Our site is here to help you take the initial steps for planning a get-together.{" "}
        </p>
        <p className="disclaim">
          Please keep Covid policies in mind and contact others through their given email.{" "}
        </p>
        <p className="disclaim">Thank you!</p>
        <p>- Amanda, Cindy, Peihua </p>
      </div>
    </div>
  );
};

export default Home;
