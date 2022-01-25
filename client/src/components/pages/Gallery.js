import React, { useState, useEffect, Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Picture from "../modules/Picture.js"
import { get, post } from "../../utilities";
import RemovePic from "../modules/RemovePic.js";

const Gallery = (props) => {
    const [modalShow, setShow] = useState(false);
    const [removeShow, setRemove] = useState(false);
    console.log(props.user);
    const [pictures, setState] = useState(props.user.pictures);
    const toggleModal = (toggle) => {
        setShow(toggle);
    }  
    const toggleRemove = (toggle) => {
        setRemove(toggle);
    }   
    const changedPictures = () => {
        get(`/api/pictures`, { userid: props.userId }).then((collection) => setState(collection));
    }
  return (
    <>
    <button onClick={() => toggleModal(true)}>Upload</button>
    <Picture show = {modalShow} userId = {props.userId} add = {() => changedPictures()} onHide = {() => toggleModal(false)}/> 
    <button onClick={() => toggleRemove(true)}>delete</button>
    <RemovePic show = {removeShow} allPics = {pictures} userId = {props.userId} remove = {() => changedPictures()} onHide = {() => toggleRemove(false)}/>
    {pictures.length === 0 ? 
    <h1>No Pictures in Gallery</h1> :
    <Carousel>
        {pictures.map((item, index) => 
        <Carousel.Item key = {index}>
        <img
            className="d-block" 
            src= {item.src}
            alt="First slide"
        />
        <Carousel.Caption>
        <h3>Picture {index+1}: {item.title}</h3>
        <p>{item.caption}</p>
        </Carousel.Caption>
        </Carousel.Item>
        )}
    </Carousel>}
    </>
  );
};

export default Gallery;
