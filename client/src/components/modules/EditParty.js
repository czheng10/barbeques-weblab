import React, { useState, useEffect, Component } from "react";
import { Dropdown, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { get, post } from "../../../src/utilities";

const EditParty = (props) => {
  const [ids, setIds] = useState([]);
  const [allParties, setParties] = useState([]);
  const [newParty, setNewName] = useState("new");
  const [oldParty, setOldName] = useState("old");
  const [start, setStart] = useState(false);

  const getParties = () => {
    get(`/api/parties`, { userid: props.userId }).then((results) => {
      setParties(results.map((item) => item.name));
      setIds(results.map((item) => item._id));
      if (!start) {
        setStart(true);
      }
      props.changer();
    });
  };
  if (!start) {
    getParties();
  }
  if (props.toggle) {
    getParties();
  }
  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const selectedParty = (event) => {
    setOldName(event.target.value);
  };
  const changeParty = () => {
    let idx = 0;
    for (let i = 0; i < allParties.length; i++) {
      if (oldParty === allParties[i]) {
        idx = i;
      }
    }
    post(`/api/changeparty`, { userid: props.userId, oldId: ids[idx], newName: newParty }).then(
      (results) => {
        props.onHide();
        setStart(false);
      }
    );
  };

  return (
    <>
      {allParties.length === 0 ? (
        <h4>No Parties So Far</h4>
      ) : (
        <>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => selectedParty(event)}
          >
            {allParties.map((item, index) => (
              <option key={index} value={item}>
                {" "}
                {item}
              </option>
            ))}
          </Form.Select>
          <div>{allParties.map}</div>
          <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.onHide}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">New Party Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control"
                type="text"
                placeholder="New Party Name"
                onChange={(event) => handleChange(event)}
              />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn" onClick={() => changeParty()}>
                Submit
              </button>
            </Modal.Footer>
          </Modal>
          <button hidden = {props.showButton} className="btn mt-3" onClick={props.func}>
            {" "}
            Change Party Name
          </button>
        </>
      )}
    </>
  );
};

export default EditParty;
