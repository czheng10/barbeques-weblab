import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./Party.css";

const Party = ({ userId, partyId }) => {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((result) => {
        setUser(result);
      });
    }
  }, [userId]);

  useEffect(() => {
    get("/api/party", { partyId: partyId }).then((result) => {
      setParty(result);
      get("/api/partyMembers", { partyId: partyId }).then((partyMems) => {
        setMembers(partyMems);
      });
    });
  }, []);

  if (!userId) {
    return <div>Please login first</div>;
  }

  if (!user || !party || !members) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h1 className="u-textCenter">Party: {party.name}</h1>
      <p>
        <b>Host: </b>
        {members.host.name}
      </p>
      <p>
        <b>Members: </b>
        {members.members
          .filter((member) => member._id !== members.host._id)
          .map((member) => member.name)
          .join(", ")}
      </p>
    </>
  );
};

export default Party;
