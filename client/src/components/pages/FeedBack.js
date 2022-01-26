import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import "./Feedback.css";
import "../../utilities.css"
const criteria = {
  "Punctual Peach": "always on time",
  "GrillBoss": "great at working the grill",
  "Spice Girl": "good at spicy food",
  "Seasoned Veteran": "pro at seasoning",
  "Smart Cookie": "pro planner",
  "Icing on the Cake": "desert master",
  "Restaurant Egg-xpert": "really good at finding restaurants",
  "Hearty Host": "a really good host",
  "Chomp Champ": "always willing to try every dish",
  "Winner Winner Chicken Dinner": " great at dinner conversation",
  "Appetizer Ace": "good at appetizer",
  "Protein pro": "great at meat dishes",
  "Presentation Pea": "great at plating",
  "Soup-erhero": "pro at soups",
  "Pitcher Perfect": "makes really good drinks ",
  "Health Honey": "makes really good healthy dishes",
  "Saucy Sensation": "Really good at making sauces",
  "Seafood splash": "seafood pro",
  "Vegetable visionary": "really good at vegetable dishes",
  "Breakfast bunch": "breakfast food pro",
  "Un-pho-gettable": "good noodles",
};
const category = [
  "Punctual Peach",
  "GrillBoss",
  "Spice Girl",
  "Seasoned Veteran",
  "Smart Cookie",
  "Icing on the Cake",
  "Restaurant Egg-xpert",
  "Hearty Host",
  "Chomp Champ",
  "Winner Winner Chicken Dinner",
  "Appetizer Ace",
  "Protein pro",
  "Presentation Pea",
  "Soup-erhero",
  "Pitcher Perfect",
  "Health Honey",
  "Saucy Sensation",
  "Seafood splash",
  "Vegetable visionary",
  "Breakfast bunch",
  "Un-pho-gettable",
];
const Survey = ({ location, userId, partyId }) => {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState([]);
  const [memberId, setId] = useState([]);
  const [collectInfo, setCollect] = useState([]);
  const [host, setHost] = useState("");
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
      get("/api/user", { userid: result.host }).then((result) => {
        setHost(result.name);
      });
    });
  }, []);

  useEffect(() => {
    get("/api/otherusers", { partyid: partyId, userid: userId }).then((result) => {
      setMembers(result.map((users) => users.name));
      setId(result.map((users) => users._id));
      let ary = [];
      for (let i = 0; i < result.length; i++) {
        ary.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
      setCollect(ary);
    });
  }, [userId]);

  if (!userId) {
    return <div>Please login first</div>;
  }

  if (!user || !party || !members) {
    return <div>Loading</div>;
  }

  const collectFeedback = (event, index, idx) => {
    if (event.target.checked) {
      collectInfo[index][idx] = 1;
    } else {
      collectInfo[index][idx] = 0;
    }
  };
  const finishFeedback = () => {
    
    post("/api/survey", {users:memberId, achievement: collectInfo}).then(() => 
    {
      post("/api/finish", {userid: userId, partyid: partyId}).then((result) => 
      {
        navigate(`/profile/${userId}`);
      });
    });
  };
  return (
    <>
      <h1 className="u-textCenter">Feedback for Party: <span className = "partyName">{party}</span></h1>
      <p>
      Host: <span className = "hostName">{host}</span>
      </p>
      {members.map((item, index) => 
        <Card key={index}>
          <Card.Header as="h5">{item}</Card.Header>
          <Card.Body>
            <Card.Title>Check All Applicable Boxes</Card.Title>
            <div className="categories">
              {category.map((item, idx) => (
                <div key={idx}>
                  <input type="checkbox" onChange={(event) => collectFeedback(event, index, idx)} />
                  <label> {criteria[item]}</label>
                </div>
              ))}
            </div>
            </Card.Body>
        </Card>
      )}
      <button hidden = {location.state.show.showButtons} onClick={() => finishFeedback()}> Submit Feedback </button>
    </>
  );
};

export default Survey;
