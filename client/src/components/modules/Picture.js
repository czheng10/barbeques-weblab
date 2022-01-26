import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Picture.css";

const Picture = (props) => {
  let tempPath = "";
  let title = "";
  let cap = "";
  const addPics = () => {
    const id = tempPath;
    if (tempPath.includes("/d/")) {
      const temp = tempPath.split("/d/");
      const id = "https://drive.google.com/uc?id=" + temp[1].split("/")[0];
      tempPath = id;
    }
    post(`/api/addPics`, {
      userid: props.userId,
      newPic: tempPath,
      picTitle: title,
      picCap: cap,
    }).then((results) => {
      tempPath = "";
      title = "";
      cap = "";
      props.add();
      props.onHide();
    });
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
          <Modal.Title id="contained-modal-title-vcenter">Add Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="instructions">1. Upload your picture to Google Drive</p>
          <p className="instructions">
            2. Copy the link next to "Anyone on the internet with this link can view"
          </p>
          <p className="instructions3">3. Paste!</p>
          Image Link:
          <input
            className="form-control"
            type="text"
            placeholder="Image Link"
            onChange={(event) => (tempPath = event.target.value)}
          />
          <br />
          Image Title:
          <input
            className="form-control"
            type="text"
            placeholder="My Food"
            onChange={(event) => (title = event.target.value)}
          />
          <br />
          Image Caption
          <input
            className="form-control"
            type="text"
            placeholder="Food <3"
            onChange={(event) => (cap = event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addPics()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Picture;
