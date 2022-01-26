import React, { useState, useEffect } from "react";
import { get } from "../../../src/utilities";
import "../../utilities.css";
import "./Achievements.css";
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
  "Yummy noodles"
];
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
const imgsrc = [
  "punctualpeach.png",
  "grillboss.png",
  "spicegirl.png",
  "seasonedveteran.png",
  "smartcookie.png",
  "icingonthecake.png",
  "restauranteggxpert.png",
  "heartyhost.png",
  "chompchamp.png",
  "winnerwinnerchickendinner.png",
  "appetizerace.png",
  "proteinpro.png",
  "presentationpea.png",
  "souperhero.png",
  "pitcherperfect.png",
  "healthhoney.png",
  "saucysensation.png",
  "seafoodsplash.png",
  "vegetablevisionary.png",
  "breakfastbunch.png",
  "unphogettable.png"
];
const Achievement = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [achievement, setAchievement] = useState([]);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result.name);
        setAchievement(result.achievements);
      });
    }
  }, [userId]);
  return (
    <div className = "achievement-list">
    {achievement
      .map((item, index) => (
        item > 2 ?
        <div className="rewards" key={index}>
          <div className="front">
            <img className="icons" src={require("../../images/" + imgsrc[index]).default} />
            <p className="rewardtitle">{category[index]}</p>
          </div>
          <div className="back">
            <p className="rewardtitle">{criteria[index]}</p>
          </div>
        </div> :
        <></>
      ))}
      </div>
  );
};

export default Achievement;
