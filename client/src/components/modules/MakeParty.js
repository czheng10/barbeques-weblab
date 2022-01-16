import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { get, post } from "../../../src/utilities";

const MakeParty = (props) => {
    const handleReopen = () => {
        props.onHide();

    }
    return (
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
            <input type="text" placeholder="Party Name" />
        </Modal.Body>
        <Modal.Footer>
            <Button>Submit</Button>
        </Modal.Footer>
        </Modal>);
}

export default MakeParty;