import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import "./Feedback.css";
import "../../utilities.css";

const criteria = {
  "GrillBoss": "Great at working the grill",
  "Punctual Peach": "Always on time",
  "Spice Girl": "Pro at spicy food",
  "Seasoned Veteran": "Pro at seasoning",
  "Smart Cookie": "Pro planner",
  "Icing on the Cake": "Dessert master",
  "Restaurant Egg-xpert": "Yelp Boss",
  "Hearty Host": "Good host",
  "Chomp Champ": "Brave taste-tester",
  "Winner Winner Chicken Dinner": "Dinner conversation pro",
  "Appetizer Ace": "Delicious appetizers",
  "Protein Pro": "Pro with meat dishes",
  "Presentation Pea": "Pretty plating",
  "Soup-erhero": "Soup master",
  "Pitcher Perfect": "Really good drinks",
  "Health Honey": "Healthy dishes pro",
  "Saucy Sensation": "Really good sauces",
  "Seafood Splash": "Seafood pro",
  "Vegetable Visionary": "Yummy vegetables",
  "Breakfast Bunch": "Breakfast food pro",
  "Un-pho-gettable": "Yummy noodles",
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
  "Protein Pro",
  "Presentation Pea",
  "Soup-erhero",
  "Pitcher Perfect",
  "Health Honey",
  "Saucy Sensation",
  "Seafood Splash",
  "Vegetable Visionary",
  "Breakfast Bunch",
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
      {members.map((item, index) => (
        <div key={index}>
          <Card>
            <Card.Header className="person" as="h5">
              {item}
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
                    <label className="titles"> {criteria[item]}</label>
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
