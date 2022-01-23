import React, { useState, useEffect, Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Picture from "../modules/Picture.js"
import { get, post } from "../../utilities";


const Gallery = (props) => {
    const [modalShow, setShow] = useState(false);
    const [pictures, setState] = useState(props.user.pictures);
    const toggleModal = (toggle) => {
        setShow(toggle);
    }   
    const addPictures = () => {
        get(`/api/pictures`, { userid: props.userId }).then((collection) => setState(collection));
    }
  return (
    <>
    <button onClick={() => toggleModal(true)}>Upload</button>
    <Picture show = {modalShow} userId = {props.userId} add = {() => addPictures()} onHide = {() => toggleModal(false)}/> 
    <Carousel>
        {pictures.map((item, index) => 
        <Carousel.Item key = {index}>
        <img
            className="d-block" 
            src= {item}
            alt="First slide"
        />
        </Carousel.Item>
        )}
    </Carousel>
    </>
  );
};

export default Gallery;
