import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import Pfp from "../modules/pfp.js";
import PopupCard from "../modules/PopupCard.js";
import MakeParty from "../modules/MakeParty.js";
import BioPopupCard from "../modules/BioPopup.js";

const Profile = ({ userId, targetUserId }) => {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [partyShow, setPartyShow] = useState(false);
  const [bioModalShow, setBioModalShow] = useState(false);

  const pfp = require("../../images/logo2.jpg");

  const setUserBio = (bio) => {
    setUser((prevState) => ({ ...prevState, bio: bio }));
  };

  const setUserAllergy = (allergy) => {
    console.log(allergy);
    setUser((prevState) => ({ ...prevState, allergies: allergy }));
  };

  useEffect(() => {
    get("/api/user", { userid: targetUserId }).then((userObj) => setUser(userObj));
  }, []);

  if (!userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="row profile-all u-flex u-flex-spaceAround">
        <div className="col-4 u-textCenter col-12-xs">
          <Pfp userId = {props.userId} pfp = {user.pfp}/>
          <div className="profile-username">{user.name}</div>
          <div className="profile-email">{user.email}</div>

          <div className="profile-intro u-flexColumn">
            <p className="profile-Text">{user.bio}</p>
            <button className="btn profile-bioEditButton" onClick={() => setBioModalShow(true)}>
              {" "}
              Edit{" "}
            </button>
            <BioPopupCard
              show={bioModalShow}
              userId={userId}
              data={user.bio}
              updateBio={setUserBio}
              onHide={() => setBioModalShow(false)}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="profile-allergies row">
            <h3 className="profile-titles">Allergies</h3>
            <div className="profile-allergiesList u-flexColumn">
              <p className="profile-allergiesContainer profile-Text">
                {user.allergies.length ? user.allergies.join(", ") : "N/A"}
              </p>
              <button
                className="btn profile-allergiesEditButton"
                onClick={() => setModalShow(true)}
              >
                {" "}
                Edit{" "}
              </button>
              <PopupCard
                show={modalShow}
                userId={userId}
                data={user.allergies}
                updateAllergies={setUserAllergy}
                onHide={() => setModalShow(false)}
              />
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
                <Button
                  className="btn profile-addPartiesButton mb-3"
                  onClick={() => setPartyShow(true)}
                >
                  {" "}
                  Add Party{" "}
                </Button>
                <MakeParty
                  show={partyShow}
                  userId={targetUserId}
                  onHide={() => setPartyShow(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
