import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { get, post } from "../../utilities";
import "./Party.css";
import { Link, navigate } from "@reach/router";

const Party = ({ userId, partyId }) => {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result.name);
      });
    }
  }, [userId]);

  useEffect(() => {
    get("/api/partyinfo", { partyid: partyId }).then((result) => {
      setParty(result.name);
    });
  }, []);

  useEffect(() => {
    get("/api/users", { partyid: partyId, userid: userId }).then((result) => {
      setMembers(result.map((users) => users.name));
    });
  }, []);
  
  if (!userId) {
    return <div>Please login first</div>;
  }

  if (!user || !party || !members) {
    return <div>Loading</div>;
  }

  const closeParty = () => {
    post("/api/close", {partyid: partyId}).then((result) => {
    });
  }
  return (
    <>
      <h1 className="u-textCenter">Party Summary: {party}</h1>
      <p>
        <b>Host: {user} </b> 
        <Link
              to={userId ? `/profile/${userId}` : "/"}
            >
              <button hidden = {location.state.show.showButtons} onClick = {() => closeParty()}>Close Party</button>
              </Link>
      </p>
      <h2>Members:</h2>
      {members.length === 0 ? <h4>No Members So Far</h4>: members.map((item, index) => 
        <h5 key = {index}>{item}</h5>)}
    </>
  );
};

export default Party;
