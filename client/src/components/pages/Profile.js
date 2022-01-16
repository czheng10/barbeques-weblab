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
  useEffect(() => {
    get(`/api/allergy`, { userid: props.targetUserId }).then((allergy) => setAllergy(allergy));
  }, [modalShow]);
  const renderAllergy = () => {
    if (allergies == []) {
      return "N/A";
    }
    return allergies.join(", ");
  };
  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="profile-all u-flex u-flex-spaceAround">
        <div className="col-4 u-textCenter">
          <img className="profile-pfp" src={pfp.default} alt="Profile picture" />
          <div className="profile-username">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-intro u-flexColumn">
            <p className="profile-Text">
              Hi I'm {user.name}! Contact me at {user.email}.
            </p>
            <form>
              <input type="text" placeholder="Personalize your bio" />
              <button type="submit"> Add </button>
            </form>
          </div>
        </div>
        <div className="col-6">
          <div className="profile-allergies row">
            <h3 className="profile-titles">Allergies</h3>
            <div className="profile-allergiesList u-flexColumn">
              <p className="profile-allergiesContainer profile-Text">{renderAllergy()}</p>
              <button className="profile-allergiesEditButton" onClick={() => toggleModal(true)}>
                {" "}
                Edit{" "}
              </button>
              <PopupCard
                show={modalShow}
                userId={props.userId}
                data={allergies}
                onHide={() => toggleModal(false)}
              />
            </div>
          </div>
          <div className="row">
            <div className="profile-achievements col justify-content-center">
              <h3 className="profile-titles">Achievements</h3>
              <p className="profile-achievementsContainer profile-Text">Coming Soon</p>
            </div>
            <div className="profile-parties col justify-content-center">
              <h3 className="profile-titles">Parties</h3>
              <p className="profile-partiesContainer profile-Text">Coming Soon</p>
            </div>
          </div>
          <Button onClick = {() => toggleParty(true)}> Add Party </Button>
          <MakeParty show = {partyShow} userId = {props.userId} onHide = {() => toggleParty(false)}/>
        </div>
      </div>
    </>
  );
};

export default Profile;
