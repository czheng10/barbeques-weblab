import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../utilities";
import "./PopupCard.css";

const PopupCard = ({ show, userId, data, updateAllergies, onHide }) => {
  const [allergies, setAllergies] = useState(data.length ? data : [""]);

  const submitAllergies = (event) => {
    event.preventDefault();
    post("/api/updateAllergies", { userId: userId, allergies: allergies }).then((result) => {
      updateAllergies(result);
      setAllergies(result);
      onHide();
    });
  };

  const handleChange = (index, event) => {
    setAllergies(
      allergies.map((allergy, i) => {
        if (i === index) {
          return event.target.value;
        }
        return allergy;
      })
    );
  };

  const handleRemove = (index, event) => {
    event.preventDefault();
    setAllergies(allergies.filter((allergy, i) => i !== index));
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setAllergies((prevState) => [...prevState, ""]);
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
        <Modal.Title id="contained-modal-title-vcenter">Allergies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add your Allergies! </h4>
        {allergies.map((allergy, i) => (
          <div className="row mb-2" key={i}>
            <div className="col-7">
              <input
                className="form-control"
                type="text"
                value={allergy}
                onChange={(event) => handleChange(i, event)}
              />
            </div>
            {allergies.length !== 1 && (
              <div className="col-3">
                <button className="btn btn-primary" onClick={(event) => handleRemove(i, event)}>
                  Remove
                </button>
              </div>
            )}
            {allergies.length - 1 === i && (
              <div className="col-2">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add
                </button>
              </div>
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitAllergies}>Submit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupCard;
