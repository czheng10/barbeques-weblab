import React, { useState, useEffect, Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Picture from "../modules/Picture.js";
import { get, post } from "../../utilities";
import RemovePic from "../modules/RemovePic.js";

const Gallery = (props) => {
  const [user, setUser] = useState(null);
  const [modalShow, setShow] = useState(false);
  const [removeShow, setRemove] = useState(false);
  const [pictures, setPictures] = useState(null);

  const changedPictures = () => {
    get(`/api/pictures`, { userid: props.userId }).then((collection) => setPictures(collection));
  };

  useEffect(() => {
    if (props.userId) {
      get("/api/user", { userid: props.userId }).then((result) => {
        setUser(result);
        setPictures(result.pictures ? result.pictures : []);
      });
    }
  }, [props.userId]);

  if (!props.userId) {
    return <div>Please login</div>;
  }

  if (!user || !pictures) {
    return <div>Loading</div>;
  }

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        Upload
      </button>
      <Picture
        show={modalShow}
        userId={props.userId}
        add={changedPictures}
        onHide={() => setShow(false)}
      />
      <button className="btn btn-primary" onClick={() => setRemove(true)}>
        delete
      </button>
      <RemovePic
        show={removeShow}
        allPics={pictures}
        userId={props.userId}
        remove={() => changedPictures()}
        onHide={() => setRemove(false)}
      />
      {pictures.length === 0 ? (
        <h1>No Pictures in Gallery</h1>
      ) : (
        <Carousel>
          {pictures.map((item, index) => (
            <Carousel.Item key={index}>
              <img className="d-block" src={item.src} alt="First slide" />
              <Carousel.Caption>
                <h3>
                  Picture {index + 1}: {item.title}
                </h3>
                <p>{item.caption}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Gallery;
