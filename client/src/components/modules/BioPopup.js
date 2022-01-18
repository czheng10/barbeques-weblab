import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";
import "./BioPopup.css";

const BioPopupCard = (props) => {
  let bio = props.data;

  const handleReopen = () => {
    props.onHide();
  };
  const editBio = (event) => {
    bio = event.target.value;
  };

  if (!props.show) {
    get(`/api/user`, { userid: props.userId }).then((user) => {
      bio = user.bio;
    });
  }
  const updateBio = () => {
    post(`/api/updatedbio`, { userid: props.userId, newBio: bio }).then(props.onHide());
  };
  return (
    <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Bio</Modal.Title>
        <Button
          type="button"
          className="close btn-light btn-outline-dark"
          data-dismiss="modal"
          onClick={() => handleReopen()}
        >
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body>
        <h5>Personalize your bio! </h5>
        <FormGroup>
          <FormControl type="text" defaultValue={bio} onChange={(event) => editBio(event)} />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => updateBio()}>Submit</Button>
        <Button onClick={() => handleReopen()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BioPopupCard;
