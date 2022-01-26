import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import Home from "./pages/Home.js";
import SearchResult from "./pages/SearchResult.js";
import Notifications from "./pages/Notifications.js";
import Gallery from "./pages/Gallery.js";
import Party from "./pages/Party.js";
import Survey from "./pages/FeedBack.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";
//import Feedback from "react-bootstrap/esm/Feedback";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        get(`/api/user`, { userid: user._id }).then((userObj) => {
          setUser(userObj);
          setUserId(user._id);
        });
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      post("/api/initsocket", { socketid: socket.id });
      get(`/api/user`, { userid: user._id }).then((userObj) => {
        setUser(userObj);
        setUserId(user._id);
        navigate(`/profile/${user._id}`);
      });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
    navigate("/");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} user={user} />
      <Router>
        <Profile path="/profile/:targetUserId" userId={userId} />
        <Home path="/" />
        <SearchResult path="/search/:searchPhrase" userId={userId} />
        <SearchResult path="/search/" userId={userId} />
        <Notifications path="/notifications" userId={userId} />
        <Gallery path="/gallery/:targetUserId" userId={userId} />
        <Survey path= "/feedback/:partyId" userId = {userId} />
        <Party path="/party/:partyId" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
