import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";
import "./pfp.css";

const Pfp = (props) => {
    const [pfp, setPfp] = useState("../../images/logo2.jpg");
    let newPath = "../../images/logo2.jpg";
    const useForceUpdate = () => {
        return () => setPfp(newPath);
    };
    const changePfp = () => {
        post(`/api/newPfp`, {userid: props.userId, newPfp: pfpPath}).then(
            (results) => {
                useForceUpdate();
            }
            );
    }
    const handleChange = (event) => {
        console.log("yes");
        newPath = event.target.value;
        console.log(newPath);
      };   
  return (
      <>
        <img className="profile-pfp" src={require(pfp).default} alt="Profile picture"/>
        <div>
            <label>Change profile picture:</label>
        </div>
        <div>
            <input
            type="file"
            className=""
            accept="image/png, image/jpeg"
            onChange = {(event) => handleChange(event)}
            onClick = {(event) => event.target.value = null}
            />
            <Button onClick={() => changePfp()}>Upload</Button>
        </div>
      </>
  );
};

export default Pfp;
