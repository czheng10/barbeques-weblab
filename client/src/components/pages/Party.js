import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { get } from "../../utilities";
import "./Party.css";

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

  return (
    <>
      <h1 className="u-textCenter">Feedback for Party: {party}</h1>
      <p>
        <b>Host: {user} </b>
      </p>
      {members.map((item) => 
        <Card>
        <Card.Header as="h5">{item}</Card.Header>
        <Card.Body>
          <Card.Title>Check All applicable boxes</Card.Title>
          <div class=""><input type="checkbox"/>a</div>
          <div class=""><input type="checkbox"/>b</div>
          <div class=""><input type="checkbox"/>c</div>
        </Card.Body>
      </Card>)}
    </>
  );
};

export default Party;
