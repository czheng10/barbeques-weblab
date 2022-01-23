import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./ViewOther.css";

const ViewProfile = (props) => {
  let user;

  get("/api/user", { userid: props.otherUserId }).then((userObj) => user = userObj);
  return (
    <>
      <div className="row profile-all u-flex u-flex-spaceAround">
        <div className="col-4 u-textCenter col-12-xs">
        <img crossOrigin = {null} className="profile-pfp" src = {user.pfp} alt="Profile picture"/>
          <div className="profile-username">{user.name}</div>
          <div className="profile-email">{user.email}</div>

          <div className="profile-intro u-flexColumn">
            <p className="profile-Text">{user.bio}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="profile-allergies row">
            <h3 className="profile-titles">Allergies</h3>
            <div className="profile-allergiesList u-flexColumn">
              <p className="profile-allergiesContainer profile-Text">
                {user.allergies.length ? user.allergies.join(", ") : "N/A"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="profile-achievements col justify-content-center">
              <h3 className="profile-titles">Achievements</h3>
              <p className="profile-achievementsContainer profile-Text">Coming Soon</p>
            </div>
            <div className="profile-parties col justify-content-center">
              <h3 className="profile-titles">Parties</h3>
              <div className="profile-partiesContainer profile-Text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
