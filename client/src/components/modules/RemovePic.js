import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, Form } from "react-bootstrap";
const RemovePic = (props) => {
  let allPics = props.allPics;
  let pic = "";
  const removePics = () => {
    post(`/api/removePics`, { userid: props.userId, index: pic }).then((results) => {
      props.remove();
      props.onHide();
    });
  };
  const selectedPic = (event) => {
    pic = event.target.key;
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Remove Pictures</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select aria-label="Default select example" onChange={(event) => selectedPic(event)}>
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
