import React, { useState, useEffect } from "react";
import { get } from "../../../src/utilities";
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
  "Always willing to try every dish",
  " Great at dinner conversation",
  "Delicious appetizers",
  "Pro with meat dishes",
  "Pretty plating",
  "Soup master",
  "Really good drinks",
  "Great at making healthy dishes",
  "Really good sauces",
  "Seafood pro",
  "Delicious vegetable dishes",
  "Breakfast food pro",
  "Yummy noodles",
];
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
  "unphogettable.png",
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
    <>
      {achievement
        .filter((item) => item >= 10)
        .map((item, index) => (
          <>
            <img className="icons" src={require("../../images/" + imgsrc[index]).default} />
            <figcaption>{criteria[index]}</figcaption>
          </>
        ))}
    </>
  );
};

export default Achievement;
