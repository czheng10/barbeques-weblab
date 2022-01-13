import React, { Component } from "react";

import "../../utilities.css";
import "./UserProfile.css";

const pfp = require("../../images/logo2.jpg");

const UserProfile = () => {
  return (
    <div>
      <img className="pfp u-flex" src={pfp.default} alt="Profile picture" />
    </div>
  );
};

export default UserProfile;
