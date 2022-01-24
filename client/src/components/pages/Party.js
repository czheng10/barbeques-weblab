import React, { useState, useEffect, Component} from "react";
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
    </div>
  );
};

export default Party;
