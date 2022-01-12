import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const PopupCard = (props) =>{
    return (
        <Modal
        show = {props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Allergies
            </Modal.Title>
            <button type="button" class="close" data-dismiss="modal" onClick={props.onHide}>&times;</button>
        </Modal.Header>
        <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
                hi
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>);
}

export default PopupCard;