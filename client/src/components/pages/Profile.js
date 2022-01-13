import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import PopupCard from "../modules/popup.js";

const Profile = (props) => {
  const pfp = require("../../images/logo2.jpg");
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = (toggle) => {
    setModalShow(toggle);
  };
  console.log(modalShow);

  useEffect(() => {
    get("/api/user", { userid: props.targetUserId }).then((userObj) => setUser(userObj));
  }, []);
  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  const allergies = user.allergies == [] ? user.allergies.join(", ") : "N/A";
  return (
    <>
      <div className="u-flexColumn u-flex-alignCenter">
        <img className="profile-pfp" src={pfp.default} alt="Profile picture" />
        <div className="profile-username">{user.name}</div>
        <div className="profile-email">{user.email}</div>
      </div>
      <div className="profile-intro u-flexColumn">
        <div className="profile-bio">
          <h3>Bio</h3>
          <p className="profile-introText">
            Hi I'm {user.name}! I can't really cook, but I'm looking for someone to explore cafes
            with! Contact me at {user.email}.
          </p>
        </div>
        <div className="profile-allergies">
          <h3>Allergies</h3>
          <p className="profile-introText">{allergies}</p>
        </div>
        <button onClick={() => toggleModal(true)}> Edit </button>
        <PopupCard show={modalShow} onHide={() => toggleModal(false)} />
      </div>
    </>
  );
};

export default Profile;
