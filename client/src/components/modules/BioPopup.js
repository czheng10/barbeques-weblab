import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";
import "./BioPopup.css";

const BioPopupCard = ({ show, userId, data, updateBio, onHide }) => {
  const [bio, setBio] = useState(data);

  const submitBio = (event) => {
    event.preventDefault();
    post(`/api/updatedbio`, { userid: userId, newBio: bio }).then((result) => {
      updateBio(result);
      setBio(result);
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Bio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Personalize your bio! </h5>
        <FormGroup>
          <FormControl type="text" value={bio} onChange={(event) => setBio(event.target.value)} />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitBio}>Submit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BioPopupCard;
