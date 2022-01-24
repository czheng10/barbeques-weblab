import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, Form } from "react-bootstrap";
const RemovePic = (props) => {
  let allPics = props.allPics;
  let pic = "";
  const removePics = () => {
        post(`/api/removePics`, {userid: props.userId, index: pic}).then(
            (results) => {
                props.remove();
                props.onHide();
            }
        );
  }
  const selectedPic = (event) => {
    pic = event.target.key;
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
                Remove Pictures
                </Modal.Title>
                <Button type="button" className="close btn-light btn-outline-dark" data-dismiss="modal" onClick={() => handleReopen()}>&times;</Button>
            </Modal.Header>
            <Modal.Body>
            <Form.Select
            aria-label="Default select example"
            onChange={(event) => selectedPic(event)}
          >
            {allPics.map((item, index) => (
              <option key={index} value={index + " " + item.title}>
                Picture{index + ": " + item.title}
              </option>
            ))}
          </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => removePics()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default RemovePic;
