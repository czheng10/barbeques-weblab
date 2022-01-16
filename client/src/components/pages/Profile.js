import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import PopupCard from "../modules/popup.js";
import MakeParty from "../modules/MakeParty.js";

const Profile = (props) => {
  const pfp = require("../../images/logo2.jpg");
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [partyShow, setPartyShow] = useState(false);
  const [allergies, setAllergy] = useState([]);
  const toggleModal = (toggle) => {
    setModalShow(toggle);
  }
  const toggleParty = (toggle) => {
    setPartyShow(toggle);
  }
  useEffect(() => {
    get("/api/user", { userid: props.targetUserId }).then((userObj) => setUser(userObj));
  }, []);
 useEffect(() =>{
    get(`/api/allergy`, {userid: props.targetUserId}).then((allergy) => setAllergy(allergy));
  }, [modalShow]);
  const renderAllergy = () =>{
    if(allergies == []){
      return "N/A";
    }
    return allergies.join(", ");
  }
  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
  <>
    <div>
      <div className="u-flexColumn u-flex-alignCenter">
        <img className="profile-pfp" src={pfp.default} alt="Profile picture" />
        <div className="profile-username">{user.name}</div>
        <div className="profile-email">{user.email}</div>
          <div className="profile-intro u-flexColumn">
            <div className="profile-bio">
              <p className="profile-introText">
                Hi I'm {user.name}! Contact me at {user.email}.
              </p>
              <form>
                <input type="text" placeholder="Personalize your bio" />
                <button type="submit"> Add </button>
              </form>
            </div>
          </div>
      </div>
    <div className="u-inlineBlock">
      <div className="profile-allergies">
        <h3 className="profile-titles">Allergies</h3>
        <div className="profile-allergiesList profile-Text">
          <p className="profile-allergiesContainer">{renderAllergy()}</p>
          <button className="profile-allergiesEditButton" onClick={() => toggleModal(true)}> Edit </button>
          <PopupCard show = {modalShow} userId = {props.userId} data = {allergies} onHide = {() => toggleModal(false)} />
          <Button onClick={() => toggleModal(true)}> Edit Allergies</Button>
        </div>
      </div>
    </div>
    <Button onClick = {() => toggleParty(true)}> Add Party </Button>
    <MakeParty show = {partyShow} userId = {props.userId} onHide = {() => toggleParty(false)}/>
  </div>
</>
  );
};

export default Profile;
