import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";
import "./pfp.css";

const Pfp = (props) => {
  const [pfp, setPfp] = useState(props.pfp);
  const [modalShow, setShow] = useState(false);
  let tempPath = "";
  const toggleModal = (toggle) => {
    setShow(toggle);
  };
  const changePfp = () => {
    if (tempPath.includes("/d/")) {
      const id = tempPath.split("/d/");
      tempPath = "https://drive.google.com/uc?id=" + id[1].split("/")[0];
      console.log(tempPath);
    }
    post(`/api/newPfp`, { userid: props.userId, newPfp: tempPath }).then((results) => {
      toggleModal(false);
      setPfp(tempPath);
    });
  };
  const handleChange = (event) => {
    tempPath = event.target.value;
  };
  return (
    <>
      <img crossOrigin={null} className="profile-pfp" src={pfp} alt="Profile picture" />
      <div>
        <Button hidden={props.showButton} onClick={() => toggleModal(true)}>
          Upload
        </Button>
        <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Change Profile Picture</Modal.Title>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              data-dismiss="modal"
              onClick={() => toggleModal(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <input type="text" placeholder="Image Link" onChange={(event) => handleChange(event)} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => changePfp()}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Pfp;
