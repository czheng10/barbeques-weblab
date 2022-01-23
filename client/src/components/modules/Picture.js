import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Picture = (props) => {
    console.log("wee");
    let tempPath = "";
    const addPics = () => {
        console.log(tempPath);
        if (tempPath.includes("/d/")){
            const id = tempPath.split("/d/");
            tempPath = "https://drive.google.com/uc?id=" + id[1].split("/")[0];
        }
        post(`/api/addPics`, {userid: props.userId, newPic: tempPath}).then(
            (results) => {
                props.add();
                props.onHide();
            }
        );
    }
    const handleChange = (event) => {
        console.log(event.target.value,"sup");
        tempPath=event.target.value;
    };
    const handleReopen = () => {
        props.onHide();

    }
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
                Add Pictures
                </Modal.Title>
                <Button type="button" className="close btn-light btn-outline-dark" data-dismiss="modal" onClick={() => handleReopen()}>&times;</Button>
            </Modal.Header>
            <Modal.Body>
                <input type="text" placeholder="Image Link" onChange = {(event) => handleChange(event)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addPics()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default Picture;
