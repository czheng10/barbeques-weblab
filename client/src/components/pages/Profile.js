import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import "../../utilities.css";
import PopupCard from "../modules/popup.js";
import "./Profile.css";
const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = (toggle) => {
    setModalShow(toggle);
  }
  console.log(modalShow);
  useEffect(() => {
    get(`/api/user`, { userid: props.targetUserId }).then((userObj) => setUser(userObj));
  }, []);
  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  const allergies = (user.allergies == [] ? user.allergies.join(", ") : "N/A");


  return (
    <>
      <div>{user.name}</div>
      <div>{allergies}</div>
      <button onClick = {() => toggleModal(true)}> Edit </button>
      <PopupCard show = {modalShow} onHide = {() => toggleModal(false)}/>
      <div>{user.email}</div>
    </>
  );
};

export default Profile;
