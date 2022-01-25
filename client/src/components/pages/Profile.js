import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { get } from "../../utilities.js";
import { Link } from "@reach/router";
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
  const [parties, setParties] = useState([]);
  const [partyStatus, setPartyStatus] = useState(null);
  const [showButtons, setShowButtons] = useState("hidden");
  const setUserBio = (bio) => {
    setUser((prevState) => ({ ...prevState, bio: bio }));
  };

  const setUserAllergy = (allergy) => {
    setUser((prevState) => ({ ...prevState, allergies: allergy }));
  };

  useEffect(() => {
    setShowButtons(userId === targetUserId ? "" : "hidden");
  }, [userId, targetUserId]);

  useEffect(() => {
    get("/api/user", { userid: targetUserId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const statuses = {};
      get("/api/parties", { userid: user._id }).then((party) => {
        for(let i = 0; i < party.length; i++){
          statuses[party[i]._id] = party[i].status;
        }
      });
      setPartyStatus(statuses);
    }
  }, [user]);

  useEffect(() => {
    if (partyStatus) {
      get("/api/parties", { userid: targetUserId }).then((party_list) => {
        const upcomingParties = party_list.filter((party) => partyStatus[party._id] === 1);
        const pastParties = party_list.filter((party) => partyStatus[party._id] === 0);
        setParties([
          { status: "Upcoming", parties: upcomingParties },
          { status: "Past", parties: pastParties },
        ]);
      });
    }
  }, [partyStatus]);

  if (!userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="row profile-all u-flex u-flex-spaceAround">
        <div className="col-4 u-textCenter">
          <Pfp className="profile-image" userId={userId} pfp={user.pfp} showButton={showButtons} />
          <div className="profile-username">{user.name}</div>
          <div className="profile-email">{user.email}</div>

          <div className="profile-intro u-flexColumn">
            <p className="profile-Text">{user.bio}</p>
            <button
              hidden={showButtons}
              className="btn profile-bioEditButton"
              onClick={() => setBioModalShow(true)}
            >
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
                hidden={showButtons}
                className="btn profile-allergiesEditButton mt-2"
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
                  hidden={showButtons}
                  className="btn profile-addPartiesButton mb-3"
                  onClick={() => setPartyShow(true)}
                >
                  {" "}
                  Add Party{" "}
                </Button>
                <MakeParty
                  show={partyShow}
                  showButton={showButtons}
                  userId={targetUserId}
                  onHide={() => setPartyShow(false)}
                  updateUser={setUser}
                />
                {parties.map((group, i) => (
                  <div key={i}>
                    <h6 className="text-start profile-partyHeaders">{group.status}</h6>
                    <div className="p-1 profile-partyGroup">
                      {group.parties.length ? (
                        group.parties.map((party, j) => ( group.status === "Past" ?
                          <Card body className="my-2 partyCard" key={j}>
                            <Link to={`/party/${party._id}`}>{party.name}</Link>
                          </Card> 
                          :
                          <Card body className="my-2 partyCard" key={j}>
                            <h5>{party.name}</h5>
                          </Card> 
                        ))
                      ) : (
                        <p>N/A</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
