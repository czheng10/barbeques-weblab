/*import React, { useState, useEffect, Component} from "react";
import { get, post } from "../../utilities";
const Party = (props) => {
  const[members, setMembers] = useEffect([]);
  const[name, setName] = useEffect("");
  let finished = 0;
  get(`/api/partyinfo`, {partyid: props.partyId}).then((party) => {
    setName(party.name)
    console.log(party.members);
    setMembers(party.members.map((id) => {
      if(id != props.userId){
        console.log(id);
        get(`/api/user`, {userid: id}).then((results) => {
          console.log(results.name);
          return results.name;
        });
      }
    }))
  });
  console.log(members,name);
  return (
    <div>
      <h1>Feedback for Party: {name} </h1>
      {members.map((item) => 
        <Card>
        <Card.Header as="h5">{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>Check All applicable boxes</Card.Title>
          <div class=""><input type="checkbox"/>a</div>
          <div class=""><input type="checkbox"/>b</div>
          <div class=""><input type="checkbox"/>c</div>
        </Card.Body>
      </Card>
      )}
    </div>*/
import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./Party.css";

const Party = ({ userId, partyId }) => {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result);
      });
    }
  }, [userId]);

  useEffect(() => {
    get("/api/party", { partyId: partyId }).then((result) => {
      setParty(result);
      get("/api/partyMembers", { partyId: partyId }).then((partyMems) => {
        setMembers(partyMems);
      });
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
      <h1 className="u-textCenter">Party: {party.name}</h1>
      <p>
        <b>Host: </b>
        {members.host.name}
      </p>
      <p>
        <b>Members: </b>
        {members.members
          .filter((member) => member._id !== members.host._id)
          .map((member) => member.name)
          .join(", ")}
      </p>
    </>
  );
};

export default Party;
