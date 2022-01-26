import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import "./FeedBack.css";
import "../../utilities.css";

const criteria = [
  "Always on time",
  "Great at working the grill",
  "Pro at spicy food",
  "Pro at seasoning",
  "Pro planner",
  "Dessert master",
  "Yelp Boss",
  "Good host",
  "Brave taste-tester",
  "Dinner conversation pro",
  "Delicious appetizers",
  "Pro with meat dishes",
  "Pretty plating",
  "Soup master",
  "Really good drinks",
  "Healthy dishes pro",
  "Really good sauces",
  "Seafood pro",
  "Yummy vegetables",
  "Breakfast food pro",
  "Yummy noodles"];
const category = [
  "Punctual Peach",
  "Grill Boss",
  "Spice Girl",
  "Seasoned Veteran",
  "Smart Cookie",
  "Icing on the Cake",
  "Restaurant Egg-xpert",
  "Hearty Host",
  "Chomp Champ",
  "Winner Winner Chicken Dinner",
  "Appetizer Ace",
  "Protein Pro",
  "Presentation Pea",
  "Soup-erhero",
  "Pitcher Perfect",
  "Health Honey",
  "Saucy Sensation",
  "Seafood Splash",
  "Vegetable Visionary",
  "Breakfast Bunch",
  "Un-pho-gettable"
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
    post("/api/survey", { users: memberId, achievement: collectInfo }).then(() => {
      post("/api/finish", { userid: userId, partyid: partyId }).then((result) => {
        navigate(`/profile/${userId}`);
      });
    });
  };
  return (
    <>
      <h1 className="u-textCenter fb-header">
        Feedback for Party: <span className="partyName">{party}</span>
      </h1>
      <div className="hosting">
        <h4>
          Host: <span className="hostName">{host} </span>
        </h4>
      </div>
      {members.map((person, index) => (
        <div key={index}>
          <Card>
            <Card.Header className="person" as="h5">
              {person}
            </Card.Header>
            <Card.Body>
              <Card.Title>Check All Applicable Boxes:</Card.Title>
              <div className="categories">
                {category.map((item, idx) => (
                  <div key={idx}>
                    <input
                      type="checkbox"
                      onChange={(event) => collectFeedback(event, index, idx)}
                    />
                    <label className="titles"> {criteria[idx]}</label>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
      <button
        className="btn submit-button"
        hidden={location.state.show.showButtons}
        onClick={() => finishFeedback()}
      >
        {" "}
        Submit Feedback{" "}
      </button>
    </>
  );
};

export default Survey;
