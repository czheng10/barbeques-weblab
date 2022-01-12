import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Home from "./pages/Home.js";
import SearchResult from "./pages/SearchResult.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

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
        setUserId(user._id);
        get(`/api/user`, { userid: user._id }).then((userObj) => setUser(userObj));
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      get(`/api/user`, { userid: user._id }).then((userObj) => setUser(userObj));
      navigate(`/profile/${user._id}`);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} user={user} />
      <Router>
        <Skeleton path="/" />
        <Profile path="/profile/:targetUserId" userId={userId} />
        <Home path="/home/" />
        <SearchResult path="/search/:searchPhrase?" userId={userId} />
        <SearchResult path="/search/" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
