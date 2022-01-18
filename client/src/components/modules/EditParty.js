import React, { useState, useEffect, Component } from "react";
import { Dropdown, Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { get, post } from "../../../src/utilities";

const EditParty = (props) => {
  const [allParties, setParties] = useState(props.data);
  const [changing, setChange] = useState(false);
  let newParty = "ns";
  let oldParty = "";
  let index = 0;
  const handleChange = (event) => {
    console.log("setting",changing);
    newParty = event.target.value;
    for(let i = 0; i < allParties.length; i++){
      if(oldParty === newParty){
        index = i;
      }
    }
    console.log(newParty);
  }
  const selectedParty = (event) => {
    oldParty = event.target.value;
  }
  const changeParty = () => {
    console.log("changing", props.dataIds[index], newParty);
    post(`/api/changeparty`, {userid: props.userId, oldId:props.dataIds[index], newName: newParty}).then( (results) =>
      {props.onHide();
      }
    );
  }
  return (
        <>
          <Form.Select aria-label="Default select example" onChange = {(event) => selectedParty(event)}>
          {allParties.map((item, index) => (
            <option key = {index} value = {item}> {item}</option>
          ))}
          </Form.Select>
          <Modal
            show = {props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                New Party Name
                </Modal.Title>
                <Button type="button" className="close btn-light btn-outline-dark" data-dismiss="modal" onClick={props.onHide}>&times;</Button>
            </Modal.Header>
            <Modal.Body>
                <input type="text" placeholder="New Party Name" onChange = {(event) => handleChange(event)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => changeParty()}>Submit</Button>
            </Modal.Footer>
            </Modal>
        </>

  );
};

export default EditParty;
