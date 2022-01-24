import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { get, post } from "../../../src/utilities";

const MakeParty = (props) => {
  const [partyName, setPartyName] = useState("");

  const addParty = (event) => {
    event.preventDefault();
    post(`/api/newparty`, { userid: props.userId, name: partyName }).then((partyId) =>
      post(`/api/addparty`, { userid: props.userId, partyid: partyId }).then((user) => {
        props.updateUser(user);
        setPartyName("");
      })
    );
    props.onHide();
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add New Party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            type="text"
            placeholder="Party Name"
            onChange={(event) => setPartyName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addParty}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MakeParty;
