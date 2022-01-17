import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import PopupCard from "../modules/PopupCard.js";
import MakeParty from "../modules/MakeParty.js";
import BioPopupCard from "../modules/BioPopup.js";

const Profile = (props) => {
  const pfp = require("../../images/logo2.jpg");
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [partyShow, setPartyShow] = useState(false);
  const [allergies, setAllergy] = useState([]);
  const [bio, setBio] = useState("Welcome to my page!");
  const [bioModalShow, setBioModalShow] = useState(false);

  const toggleModal = (toggle) => {
    setModalShow(toggle);
  };
  const bioToggleModal = (toggle) => {
    setBioModalShow(toggle);
  };
  const toggleParty = (toggle) => {
    setPartyShow(toggle);
  };
  useEffect(() => {
    get("/api/user", { userid: props.targetUserId }).then((userObj) => setUser(userObj));
  }, []);

  useEffect(() => {
    get(`/api/allergy`, { userid: props.targetUserId }).then((allergy) => setAllergy(allergy));
  }, [modalShow]);

  useEffect(() => {
    get(`/api/user`, { userid: props.targetUserId }).then((new_bio) => setBio(new_bio));
  }, [bioModalShow]);

  const renderAllergy = () => {
    if (allergies == []) {
      return "N/A";
    }
    return allergies.join(", ");
  };

  const renderBio = () => {
    return bio;
  };

  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="row profile-all u-flex u-flex-spaceAround">
        <div className="col-4 u-textCenter col-12-xs">
          <img className="profile-pfp" src={pfp.default} alt="Profile picture" />
          <div className="profile-username">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-intro u-flexColumn">
            <p className="profile-Text">{renderBio()}</p>
            <button className="btn profile-bioEditButton" onClick={() => bioToggleModal(true)}>
              {" "}
              Edit{" "}
            </button>
            <BioPopupCard
              show={bioModalShow}
              userId={props.userId}
              userBio={props.userBio}
              data={bio}
              onHide={() => bioToggleModal(false)}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="profile-allergies row">
            <h3 className="profile-titles">Allergies</h3>
            <div className="profile-allergiesList u-flexColumn">
              <p className="profile-allergiesContainer profile-Text">{renderAllergy()}</p>
              <button className="btn profile-allergiesEditButton" onClick={() => toggleModal(true)}>
                {" "}
                Edit{" "}
              </button>
              <PopupCard
                show={modalShow}
                userId={props.userId}
                data={allergies}
                onHide={() => toggleModal(false)}
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
              <p className="profile-partiesContainer profile-Text">Coming Soon</p>
            </div>
          </div>
          <Button onClick={() => toggleParty(true)}> Add Party </Button>
          <MakeParty show={partyShow} userId={props.userId} onHide={() => toggleParty(false)} />
        </div>
      </div>
    </>
  );
};

export default Profile;
