import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../utilities";
import "./PopupCard.css";

const PopupCard = (props) => {
  let allergies = props.data.concat("");
  const [value, setState] = useState(true);
  const useForceUpdate = () => {
    return () => setState(!value);
  };
  const addAllergy = () => {
    post(`/api/newallergy`, {
      userid: props.userId,
      new_allergies: allergies.filter((word) => word.length > 0),
    }).then(props.onHide());
  };
  const handleReopen = () => {
    props.onHide();
  };
  const handleChange = (index, event) => {
    allergies[index] = event.target.value;
  };
  if (!props.show) {
    get(`/api/allergy`, { userid: props.userId }).then((allergy) => {
      allergies = allergy;
    });
  }
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleReopen}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Allergies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add your Allergies! </h4>
        <Button
          className="add btn-light btn-outline-danger"
          onClick={props.show ? useForceUpdate() : undefined}
        >
          {" "}
          +{" "}
        </Button>
        {allergies.map((item, index) => (
          <FormGroup key={item}>
            <FormControl
              type="text"
              placeholder={item ? "" : "Add Allergy"}
              defaultValue={item}
              onChange={(event) => handleChange(index, event)}
            />
          </FormGroup>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => addAllergy()}>Submit</Button>
        <Button onClick={() => handleReopen()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupCard;
