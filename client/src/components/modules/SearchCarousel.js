import React, { useState, useEffect } from "react";
import { Carousel, Dropdown } from "react-bootstrap";

import { get } from "../../utilities.js";
import "./SearchCarousel.css";

const background = require("../../images/black-background.jpg");

const SearchCarousel = (props) => {
  const [activeParties, setActiveParties] = useState(null);

  useEffect(() => {
    const userIds = props.results.map((user) => user._id).concat([props.userId]);
    const parties = {};
    userIds.map((id) => {
      get("/api/active-parties", { userId: id }).then((result) => {
        parties[id] = result;
      });
    });
    setActiveParties(parties);
  }, []);

  const handleInvite = (userId, partyId) => {
    //TODO: send invite to userId to join partyId;
  };

  const handleAsk = (userId, partyId) => {
    //TODO: ask host userId to join partyId;
  };

  if (!activeParties) {
    return <div>Loading...</div>;
  }
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
              <Dropdown>
                <Dropdown.Toggle variant="light">Ask to Join Party</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Select one of their Parties</Dropdown.Header>
                  {activeParties[user.id] ? (
                    activeParties[user.id].map((party) => (
                      <Dropdown.Item onClick={() => handleAsk(user.id, party.id)}>
                        party.name
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Header>No available parties.</Dropdown.Header>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light">Invite to Party</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Select one of your parties</Dropdown.Header>
                  {activeParties[props.userId] ? (
                    activeParties[props.userId].map((party) => (
                      <Dropdown.Item onClick={() => handleInvite(user.id, party.id)}>
                        party.name
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Header>No available parties.</Dropdown.Header>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SearchCarousel;
