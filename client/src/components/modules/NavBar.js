import React from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';
const logo = require('../../images/logo2.jpg');
const NavBar = () => {
    return (<Navbar>
        <img src={logo.default} className="logo"/>
        <NavbarBrand>Barbeque</NavbarBrand>
        <Form className="d-flex search">
        <input
          type="text"
          name="text"
          placeholder="search users..."
          className="bg-white p-2 w-3/4 outline-none"
        />
        <Button>Search</Button>
      </Form>
        <NavItem className="notifs">Notifications</NavItem>
        <NavItem className="profile">Username </NavItem>
    </Navbar>);
};

export default NavBar;