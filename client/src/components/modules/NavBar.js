import React, { useState, useEffect } from "react";
import "./NavBar.css";
import "../../utilities.css";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";

const logo = require("../../images/BarbequeLogo.png");
const GOOGLE_CLIENT_ID = "142092394402-g9v7u0k9fd7dktllb4ij0303ihkbq7j3.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout, user }) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchPhrase}`);
    setSearchPhrase("");
  };

  return (
    <div>
      {userId ? (
        <Navbar className="Navbar navbar-fixed-top " variant="dark" expand="sm">
          <div>
            <img src={logo.default} className="d-inline-block Navbar-logo" alt="" />
            <Link
              to={userId ? `/profile/${userId}` : "/"}
              className="navbar-brand mx-3 Navbar-link"
            >
              Barbeques
            </Link>
          </div>
          <Nav>
            <Nav.Item>
              <Form className="d-flex">
                <Form.Control
                  type="text"
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
              <Link to="/gallery" className="nav-link Navbar-link">
                Gallery
              </Link>
            </Nav.Item>
            <Nav.Item className="mx-3">
              <Link to="/notifications" className="nav-link Navbar-link">
                Notifications
              </Link>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown
                className="navbar-user-dropdown"
                title={user.name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item><Link
              to={userId ? `/profile/${userId}` : "/"}
            >
              <p>My Profile</p>
            </Link></NavDropdown.Item>
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
          </Nav>
        </Navbar>
      ) : (
        <Navbar className="navbar-nl" variant="dark" expand="sm">
          <div className="navbar-nlcontainer">
            <img
              className="navbar-nlimage"
              src={logo.default}
              className="d-inline-block navbar-nllogo"
              alt=""
            />
            <h2 className="navbar-nlintroText">
              Welcome to <span className="navbar-nlbrand">Barbeques</span>
            </h2>
            <h4 className="navbar-nlloginstatement">Please log in to get started</h4>
            <Nav>
              <div className="navbar-nlgoogle">
                <Nav.Item>
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={handleLogin}
                    onFailure={(err) => console.log(err)}
                    className="Navbar-link Navbar-login"
                  />
                </Nav.Item>
              </div>
            </Nav>
          </div>
        </Navbar>
      )}
    </div>
  );
};

export default NavBar;
