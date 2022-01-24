import React, { useState, useEffect, Component } from "react";
import { get, post } from "../../utilities";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Picture = (props) => {
  const [tempPath, setTempPath] = useState("");
  const [title, setTitle] = useState("");
  const [cap, setCap] = useState("");

  const addPics = (event) => {
    event.preventDefault();
    if (tempPath.includes("/d/")) {
      const id = tempPath.split("/d/");
      setTempPath("https://drive.google.com/uc?id=" + id[1].split("/")[0]);
    }
    post(`/api/addPics`, {
      userid: props.userId,
      newPic: tempPath,
      picTitle: title,
      picCap: cap,
    }).then((results) => {
      console.log(results);
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
            value={tempPath}
            onChange={(event) => setTempPath(event.target.value)}
          />
          <br />
          Image Title:
          <input
            className="form-control"
            type="text"
            placeholder="My Food"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          Image Caption
          <input
            className="form-control"
            type="text"
            placeholder="Food <3"
            value={cap}
            onChange={(event) => setCap(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addPics}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Picture;
