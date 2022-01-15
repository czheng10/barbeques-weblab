import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import "../../utilities.css";
import PopupCard from "../modules/popup.js";
import "./Profile.css";
const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [allergies, setAllergy] = useState([]);
  const toggleModal = (toggle) => {
    setModalShow(toggle);
  }
  useEffect(() => {
    get(`/api/user`, { userid: props.targetUserId }).then((userObj) => setUser(userObj));
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
      <div>{user.name}</div>
      <div>{renderAllergy()}</div>
      <button onClick = {() => toggleModal(true)}> Edit </button>
      <PopupCard show = {modalShow} userId = {props.userId} data = {allergies} onHide = {() => toggleModal(false)}/>
      <div>{user.email}</div>
    </>
  );
};

export default Profile;
