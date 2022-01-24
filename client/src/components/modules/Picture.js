import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Picture = (props) => {
    let tempPath = "";
    let title = "";
    let cap = "";
    const addPics = () => {
        if (tempPath.includes("/d/")){
            const id = tempPath.split("/d/");
            tempPath = "https://drive.google.com/uc?id=" + id[1].split("/")[0];
        }
        post(`/api/addPics`, {userid: props.userId, newPic: tempPath, picTitle: title, picCap: cap}).then(
            (results) => {
                props.add();
                props.onHide();
            }
        );
    }
    const handleLinkChange = (event) => {
        console.log(event.target.value,"sup");
        tempPath=event.target.value;
    };
    const handleTitleChange = (event) => {
        title=event.target.value;
    };
    const handleCapChange = (event) => {
        cap=event.target.value;
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
                Image Link:
                <input type="text" placeholder="Image Link" onChange = {(event) => handleLinkChange(event)} />
                <br/>
                Image Title:
                <input type="text" placeholder="My Food" onChange = {(event) => handleTitleChange(event)} />
                <br/>
                Image Caption
                <input type="text" placeholder="Food <3" onChange = {(event) => handleCapChange(event)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addPics()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default Picture;
