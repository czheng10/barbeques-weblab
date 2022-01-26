import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { get, post } from "../../utilities";
import bbq from "../../images/BarbequeLogo.png";
import bbq2 from "../../images/logob.png";
import "./Party.css";
import { Link } from "@reach/router";

const Party = ({ location, userId, partyId }) => {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result.name);
      });
    }
  }, [userId]);

  useEffect(() => {
    get("/api/partyinfo", { partyid: partyId }).then((result) => {
      setParty(result.name);
    });
  }, []);

  useEffect(() => {
    get("/api/users", { partyid: partyId, userid: userId }).then((result) => {
      setMembers(result.map((users) => users.name));
    });
  }, []);

  if (!userId) {
    return <div>Please login first</div>;
  }

  if (!user || !party || !members) {
    return <div>Loading</div>;
  }

  const closeParty = () => {
    post("/api/close", { partyid: partyId }).then((result) => {});
  };
  return (
    <div className="party-all">
      <div className="">
        <h1 className="u-textCenter party-header">
          <span className="partysummary"> Party: </span>
          <span className="partyname">{party}</span>
        </h1>
      </div>
      <div className="hostContainer">
        <p>
          <h2>
            <span className="partytitle"> Host: </span> {user}
          </h2>
          <img className="hostpic" src={bbq} alt="logo" />
          <div>
            <Link to={userId ? `/profile/${userId}` : "/"}>
              <button
                className="btn"
                hidden={location.state.show.showButtons}
                onClick={() => closeParty()}
              >
                End Party
              </button>
            </Link>
          </div>
        </p>
      </div>
      <div className="party-members">
        <h2 className="partymembersheader partytitle ">Members:</h2>
        {members.length === 0 ? (
          <h6>No Members So Far</h6>
        ) : (
          members.map((item, index) => (
            <div className="members">
              <h5 key={index}>{item}</h5>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Party;
