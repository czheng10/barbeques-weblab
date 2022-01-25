import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import "./Feedback.css";

const Survey = ({ location, userId, partyId }) => {
  const criteria = {"Punctual Peach": "always on time","GrillBoss": "great at working the grill",
  "Spice Girl": "good at spicy food","Seasoned Veteran": "pro at seasoning",
  "Smart Cookie": "pro planner","Icing on the Cake": "desert master",
  "Restaurant Egg-xpert": "really good at finding restaurants","Hearty Host": "a really good host",
  "Chomp Champ": "always willing to try every dish","Winner Winner Chicken Dinner": " great at dinner conversation",
  "Appetizer Ace": "good at appetizer","Protein pro": "great at meat dishes","Presentation Pea": "great at plating",
  "Soup-erhero": "pro at soups","Perfect Pitch": "makes really good drinks ","Health Honey": "makes really good healthy dishes",
  "Saucy Sensation": "Really good at making sauces","Seafood splash": "seafood pro","Vegetable visionary": "really good at vegetable dishes",
  "Breakfast bunch": "breakfast food pro","Un-pho-gettable": "good noodles"};
  const category = ["Punctual Peach","GrillBoss","Spice Girl","Seasoned Veteran","Smart Cookie","Icing on the Cake","Restaurant Egg-xpert","Hearty Host",
  "Chomp Champ","Winner Winner Chicken Dinner","Appetizer Ace","Protein pro","Presentation Pea","Soup-erhero","Perfect Pitch","Health Honey",
  "Saucy Sensation","Seafood splash","Vegetable visionary","Breakfast bunch","Un-pho-gettable"]
  const [user, setUser] = useState(null);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState([]);
  const [memberId, setId] = useState([]);
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
      const ids = result.map((users) => users._id).concat([userId]);
      setId(ids);
    });
  }, []);

  
  if (!userId) {
    return <div>Please login first</div>;
  }

  if (!user || !party || !members) {
    return <div>Loading</div>;
  }

  const finishFeedback = () => {
    console.log(memberId);
    post("/api/finish", {users: memberId, partyid: partyId}).then((result) => {console.log("done")}
    );
  }
  return (
    <>
      <h1 className="u-textCenter">Feedback for Party: {party}</h1>
      <p>
        <b>Host: {user} </b>
      </p>
      {members.map((item, index) => 
        <Card key = {index}>
        <Card.Header as="h5">{item}</Card.Header>
        <Card.Body>
          <Card.Title>Check All Applicable Boxes</Card.Title>
          <div className = "categories">
          {category.map((item, index) => 
            <div key = {index}>
              <input type="checkbox"/>
              <label> {criteria[item]}</label>
            </div>
          )}
          </div>
        </Card.Body>
      </Card>)}
      <Link
      to={userId ? `/profile/${userId}` : "/"}
      ><button hidden = {location.state.show.showButtons} onClick={() => finishFeedback()}> Submit Feedback </button></Link>
    </>
  );
};

export default Survey;
