import React from "react";
import "./Party.css";

const Party = ({ userId, partyId }) => {
  return (
    <div>
      {partyId} {userId}
    </div>
  );
};

export default Party;
