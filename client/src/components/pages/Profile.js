import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import PopupCard from "../modules/popup.js";

const Profile = (props) => {
  const pfp = require("../../images/logo2.jpg");
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [allergies, setAllergy] = useState([]);
  const toggleModal = (toggle) => {
    setModalShow(toggle);
<<<<<<< HEAD
  }
=======
  };
  console.log(modalShow);

>>>>>>> ea927995f52891fdb8f97158ac7287809310f8a5
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
<<<<<<< HEAD
  return (
    <>
      <div>{user.name}</div>
      <div>{renderAllergy()}</div>
      <button onClick = {() => toggleModal(true)}> Edit </button>
      <PopupCard show = {modalShow} userId = {props.userId} data = {allergies} onHide = {() => toggleModal(false)}/>
      <div>{user.email}</div>
=======
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
            Hi I'm {user.name}! Contact me at {user.email}.
          </p>
          <form>
            <input type="text" placeholder="Personalize your bio" />
            <button type="submit"> Add </button>
          </form>
        </div>
        <div className="profile-allergies">
          <h3>Allergies</h3>
          <p className="profile-introText">{allergies}</p>
        </div>
        <button onClick={() => toggleModal(true)}> Edit </button>
        <PopupCard show={modalShow} onHide={() => toggleModal(false)} />
      </div>
>>>>>>> ea927995f52891fdb8f97158ac7287809310f8a5
    </>
  );
};

export default Profile;
