import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";
import EditParty from "../modules/EditParty.js";

const MakeParty = (props) => {
    let partyName = "";
    const [modalShow, setModalShow] = useState(false);
    const toggleModal = (toggle) => {
        setModalShow(toggle);
    }
    const handleReopen = () => {
        props.onHide();

    }
    const addParty = () => {
        post(`/api/newparty`, {userid: props.userId, name: partyName}).then(
            (partyId) => post(`/api/addparty`, {userid: props.userId, partyid: partyId})
        );
        props.onHide();
    }
    const handleChange = (event) => {
        //console.log(partyName);
        partyName = event.target.value;
    }
    console.log("makeparty");
    return (
        <>
        <Modal
        show = {props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Add New Party
            </Modal.Title>
            <Button type="button" className="close btn-light btn-outline-dark" data-dismiss="modal" onClick={() => handleReopen()}>&times;</Button>
        </Modal.Header>
        <Modal.Body>
            <input type="text" placeholder="Party Name" onChange = {(event) => handleChange(event)} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => addParty()}>Submit</Button>
        </Modal.Footer>
        </Modal>
        <h1> My Parties: </h1>
        <EditParty userId = {props.userId} show = {modalShow} onHide  = {() => toggleModal(false)}/> <Button onClick = {() => toggleModal(true)}> Change Party Name</Button> <h4>No Parties So Far</h4>
  
        </>  
    ); 
};

export default MakeParty;
