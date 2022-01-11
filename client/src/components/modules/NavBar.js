import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  NavbarBrand,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const logo = require("../../images/logo2.jpg");
const GOOGLE_CLIENT_ID = "246300047403-nuejgdlajaq1mpbkamh3orikdb3ievor.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout, user }) => {
  return (
    <Navbar className="Navbar" expand="sm">
      <div>
        <img src={logo.default} className="d-inline-block Navbar-logo" alt="" />
        <Link to="/" className="navbar-brand mx-3 Navbar-link">
          Barbeque
        </Link>
      </div>
      <Nav>
        <Nav.Item>
          <Form className="d-flex">
            <input
              type="text"
              name="text"
              placeholder="search users..."
              className="bg-white p-2 w-3/4 outline-none Navbar-search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Nav.Item>
        <Nav.Item className="mx-3">
          <Link to="/" className="nav-link Navbar-link">
            Notifications
          </Link>
        </Nav.Item>
        {userId ? (
          <Nav.Item>
            <NavDropdown title={user ? user.name : ""} id="basic-nav-dropdown">
              <NavDropdown.Item href={`/profile/${userId}`}>My Profile</NavDropdown.Item>
              <NavDropdown.Item>
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={handleLogout}
                  onFailure={(err) => console.log(err)}
                  className="Navbar-link Navbar-login"
                />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={(err) => console.log(err)}
              className="Navbar-link Navbar-login"
            />
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
    // <Navbar>
    //     <img src={logo.default} className="logo"/>
    //     <NavbarBrand>Barbeque</NavbarBrand>
    //     <Form className="d-flex search">
    //     <input
    //       type="text"
    //       name="text"
    //       placeholder="search users..."
    //       className="bg-white p-2 w-3/4 outline-none"
    //     />
    //     <Button>Search</Button>
    //   </Form>
    //     <NavItem className="notifs">Notifications</NavItem>
    //     <NavItem className="profile">Username </NavItem>
    // </Navbar>
  );
};

export default NavBar;
