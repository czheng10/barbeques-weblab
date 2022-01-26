import React, { useState, useEffect } from "react";
import { Carousel, Dropdown } from "react-bootstrap";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";
import "./SearchCarousel.css";

const background = require("../../images/bbq-party.jpg");

const SearchCarousel = (props) => {
  const [activeParties, setActiveParties] = useState({});
  const [myParties, setMyParties] = useState({});

  useEffect(() => {
    if (props.userId) {
      props.results
        .map((user) => user._id)
        .map((id) => {
          get("/api/active-parties", { targetUserId: id, userId: props.userId }).then((result) => {
            setActiveParties((prevState) => ({ ...prevState, [id]: result }));
          });
          get("/api/myParties", { targetUserId: id, userId: props.userId }).then((result) => {
            setMyParties((prevState) => ({ ...prevState, [id]: result }));
          });
        });
    }
  }, [props]);

  const updateMyParties = ({ member, party }) => {
    setMyParties((prevState) => ({
      ...prevState,
      [member]: prevState[member].filter((items) => items._id !== party),
    }));
  };

  const updateActiveParties = ({ host, party }) => {
    setActiveParties((prevState) => ({
      ...prevState,
      [host]: prevState[host].filter((items) => items._id !== party),
    }));
  };

  const updateParties = (party) => {
    if (party.host !== props.userId) {
      setActiveParties((prevState) => ({
        ...prevState,
        [party.host]: prevState[party.host].concat(party),
      }));
    } else {
      setMyParties(myParties.map((party) => prevState[party].concat(party)));
    }
  };

  useEffect(() => {
    socket.on("acceptedNotif", updateMyParties);
    socket.on("joinedParty", updateActiveParties);
    socket.on("newParty", updateParties);
  }, []);

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
              <img className="profile-card-pfp" src={user.pfp} />
              <Link to={`/profile/${user._id}`} state={{ userId: props.userId }}>
                <h2 className="pt-3">{user.name}</h2>
              </Link>
            </div>
            <div className="profile-card-bottom py-3">
              <p className="userbio">{user.bio}</p>
              <p>Contact me at {user.email}</p>
              {user.allergies.length > 0 ? (
                <p>Dietary Restrictions: {user.allergies.join(", ")}</p>
              ) : (
                <p>Dietary Restrictions: N/A</p>
              )}
              <span className="d-flex u-flex-justifyCenter button-dropdown">
                <Dropdown className="search-dropdown">
                  <Dropdown.Toggle variant="light">Invite</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Select one of your parties</Dropdown.Header>
                    {myParties[user._id] && myParties[user._id].length ? (
                      myParties[user._id].map((party, j) => (
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
                    {activeParties[user._id] && activeParties[user._id].length ? (
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
