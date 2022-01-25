import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Picture = (props) => {
  let tempPath = "";
  let title = "";
  let cap = "";
  const addPics = () => {
    const id = tempPath;
    if (tempPath.includes("/d/")) {
      const temp = tempPath.split("/d/");
      const id ="https://drive.google.com/uc?id=" + temp[1].split("/")[0];
      tempPath = id;
    }
    post(`/api/addPics`, {
      userid: props.userId,
      newPic: tempPath,
      picTitle: title,
      picCap: cap,
    }).then((results) => {
      tempPath="";
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
          <Modal.Title id="contained-modal-title-vcenter">Add Pictures</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Image Link:
          <input
            className="form-control"
            type="text"
            placeholder="Image Link"
            onChange={(event) => tempPath = event.target.value}
          />
          <br />
          Image Title:
          <input
            className="form-control"
            type="text"
            placeholder="My Food"
            onChange={(event) => title = event.target.value}
          />
          <br />
          Image Caption
          <input
            className="form-control"
            type="text"
            placeholder="Food <3"
            onChange={(event) => cap = event.target.value}
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
