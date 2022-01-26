import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Picture from "../modules/Picture.js";
import { get, post } from "../../utilities";
import RemovePic from "../modules/RemovePic.js";
import "./Gallery.css";

const Gallery = ({ location, targetUserId }) => {
  const [user, setUser] = useState(null);
  const [modalShow, setShow] = useState(false);
  const [removeShow, setRemove] = useState(false);
  const [pictures, setPictures] = useState(null);

  const changedPictures = () => {
    get(`/api/pictures`, { userid: targetUserId }).then((collection) => setPictures(collection));
  };

  useEffect(() => {
    if (targetUserId) {
      get("/api/user", { userid: targetUserId }).then((result) => {
        setUser(result);
        setPictures(result.pictures ? result.pictures : []);
      });
    }
  }, [targetUserId]);

  if (!targetUserId) {
    return <div>Please login</div>;
  }

  if (!user || !pictures) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="u-textCenter gallery-intro">
        <h2 className="galleryheader">{user.name}'s Gallery</h2>
        <button
          hidden={location.state.show}
          className="btn btn-primary gallery-button"
          onClick={() => setShow(true)}
        >
          Upload
        </button>
        <Picture
          show={modalShow}
          userId={targetUserId}
          add={changedPictures}
          onHide={() => setShow(false)}
        />
        <button
          hidden={location.state.show}
          className="btn btn-primary gallery-button"
          onClick={() => setRemove(true)}
        >
          Delete
        </button>
        <RemovePic
          show={removeShow}
          allPics={pictures}
          userId={targetUserId}
          remove={() => changedPictures()}
          onHide={() => setRemove(false)}
        />
      </div>
      {pictures.length === 0 ? (
        <h1 className="emptygallery">No Pictures in Gallery Yet!</h1>
      ) : (
        <Carousel>
          {pictures.map((item, index) => (
            <Carousel.Item className="singlepost" key={index}>
              <div className="gallery-card p-3 u-textCenter" key={index}>
                <img className="gallery-img" src={item.src} />
                <h3 className="gallery-titles">{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Gallery;
