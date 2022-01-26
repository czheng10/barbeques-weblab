import React, { useState, useEffect } from "react";
import { get } from "../../../src/utilities";
const criteria = ["always on time", "great at working the grill",
  "good at spicy food", "pro at seasoning",
  "pro planner", "desert master",
  "really good at finding restaurants", "a really good host",
  "always willing to try every dish", " great at dinner conversation",
  "good at appetizer", "great at meat dishes", "great at plating",
  "pro at soups", "makes really good drinks", "makes really good healthy dishes",
  "Really good at making sauces", "seafood pro", "really good at vegetable dishes",
  "breakfast food pro", "good noodles"];
const category = ["Punctual Peach","GrillBoss","Spice Girl","Seasoned Veteran","Smart Cookie","Icing on the Cake","Restaurant Egg-xpert","Hearty Host",
  "Chomp Champ","Winner Winner Chicken Dinner","Appetizer Ace","Protein pro","Presentation Pea","Soup-erhero","Pitcher Perfect","Health Honey",
  "Saucy Sensation","Seafood splash","Vegetable visionary","Breakfast bunch","Un-pho-gettable"];
const imgsrc = ["punctualpeach.png","grillboss.png","spicegirl.png","seasonedveteran.png","smartcookie.png","icingonthecake.png",
"restauranteggxpert.png","heartyhost.png","chompchamp.png","winnerwinnerchickendinner.png","appetizerace.png","proteinpro.png","presentationpea.png",
"souperhero.png","pitcherperfect.png","healthhoney.png","saucysensation.png","seafoodsplash.png","vegetablevisionary.png","unphogettable.png"];
const Achievement = ({userId }) => {
  const [user, setUser] = useState(null);
  const [achievement, setAchievement] = useState([]);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result.name);
        setAchievement(result.achievements)
      });
    }
  }, [userId]);
  

  return (
    <>
    {achievement.filter((item) => item >= 10).map((item, index) => 
        <>
            <img border = "5px solid;" src = {require("../../images/" + imgsrc[index]).default}/>
            <figcaption>{criteria[index]}</figcaption>
        </>
    )}
    </>
  );
};

export default Achievement;
