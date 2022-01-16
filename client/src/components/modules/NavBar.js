import React, { useState, useEffect } from "react";
import "./NavBar.css";
import "../../utilities.css";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";

const logo = require("../../images/BarbequeLogo.png");
const GOOGLE_CLIENT_ID = "246300047403-nuejgdlajaq1mpbkamh3orikdb3ievor.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout, user }) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchPhrase}`);
    setSearchPhrase("");
  };

  return (
    <Navbar className="Navbar navbar-fixed-top " variant="dark" expand="sm">
      <div>
        <img src={logo.default} className="d-inline-block Navbar-logo" alt="" />
        <Link to={user ? `/profile/${userId}` : "/"} className="navbar-brand mx-3 Navbar-link">
          Barbeque
        </Link>
      </div>
      <Nav>
        <Nav.Item>
          <Form className="d-flex">
            <input
              type="text"
              name="text"
              value={searchPhrase}
              onChange={(event) => {
                setSearchPhrase(event.target.value);
              }}
              placeholder="search users..."
              className="bg-white p-2 w-3/4 outline-none Navbar-search"
            />
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
              Search
            </button>
          </Form>
        </Nav.Item>
        <Nav.Item className="mx-3">
          <Link to="/" className="nav-link Navbar-link">
            Notifications
          </Link>
        </Nav.Item>
        {userId ? (
          <Nav.Item>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
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
  );
};

export default NavBar;
