import React, { useState, useEffect } from "react";
import { Carousel, Dropdown } from "react-bootstrap";
import TEST_PFP from "../../images/logo2.jpg";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities.js";
import "./SearchCarousel.css";

const background = require("../../images/bbq-party.jpg");

const SearchCarousel = (props) => {
  const [activeParties, setActiveParties] = useState({});

  useEffect(() => {
    const userIds = props.results.map((user) => user._id).concat([props.userId]);
    const parties = {};
    userIds.map((id) => {
      get("/api/active-parties", { userId: id }).then((result) => {
        setActiveParties((prevState) => ({ ...prevState, [id]: result }));
      });
    });
  }, [props]);

  const handleInvite = (userId, partyId) => {
    post("/api/invite", {
      from: props.userId,
      to: userId,
      partyId: partyId,
    });
  };

  if (!Object.keys(activeParties)) {
    return <div>Loading...</div>;
  }
  return (
    <Carousel variant="dark" className="u-flex-alignCenter" indicators={false} interval={null}>
      {props.results.map((user, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block mx-auto profile-background"
            src={background.default}
            alt="background"
          />
          <Carousel.Caption className="profile-card p-0">
            <div className="profile-card-top py-3">
              <img className="profile-card-pfp" src={TEST_PFP} />
              <Link to={`/profile/${user._id}`}>
                <h2 className="pt-3">{user.name}</h2>
              </Link>
            </div>
            <div className="profile-card-bottom py-3">
              <p>{user.bio}</p>
              <strong>Dietary Restrictions</strong>
              {user.allergies ? <p>Allergies: {user.allergies.join(", ")}</p> : <p>N/A</p>}
              <span className="d-flex u-flex-justifyCenter button-dropdown">
                <Dropdown className="search-dropdown">
                  <Dropdown.Toggle variant="light">Invite</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Select one of your parties</Dropdown.Header>
                    {activeParties[props.userId] ? (
                      activeParties[props.userId].map((party, j) => (
                        <Dropdown.Item key={j} onClick={() => handleInvite(user._id, party._id)}>
                          {party.name}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Header>No available parties.</Dropdown.Header>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="light">Ask to Join</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Select one of their Parties</Dropdown.Header>
                    {activeParties[user._id] ? (
                      activeParties[user._id].map((party, j) => (
                        <Dropdown.Item key={j} onClick={() => handleInvite(user._id, party._id)}>
                          {party.name}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Header>No available parties.</Dropdown.Header>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </Carousel.Caption>
          {/* <Carousel.Caption className="u-flex-justifyCenter">
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SearchCarousel;
