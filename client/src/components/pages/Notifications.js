import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { get, post } from "../../utilities.js";
import { Card } from "react-bootstrap";

const Notifications = ({ userId }) => {
  const [activeNotifs, setActiveNotifs] = useState([]);
  const [notifMetadata, setNotifMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      get("/api/active-notifs", { userId: userId }).then((results) => {
        setActiveNotifs(results);
        results.map((notif) => {
          get("/api/user", { userid: notif.from }).then((user) => {
            setNotifMetadata((prevState) => ({ ...prevState, [notif.from]: user }));
          });
          get("/api/party", { partyId: notif.party_id }).then((party) => {
            setNotifMetadata((prevState) => ({ ...prevState, [notif.party_id]: party }));
          });
        });
        setLoading(false);
      });
    }
  }, [userId]);

  const handleNotifAction = (notif, action) => {
    post("/api/update-notif", {
      notifId: notif._id,
      notifFrom: notif.from,
      notifTo: userId,
      notifParty: notif.party_id,
      toHost: userId === notifMetadata[notif.party_id].host,
      action: action,
    }).then((updatedNotifs) => {
      setActiveNotifs(updatedNotifs);
    });
  };

  if (!userId) {
    return <div>Please login to use the site</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="u-textCenter">
      <h1>Notifications</h1>
      {activeNotifs ? (
        activeNotifs.map((notif, i) => (
          <Card key={i} body>
            {notifMetadata[notif.from] && notifMetadata[notif.party_id] && (
              <>
                {notifMetadata[notif.from]["name"]}
                {notifMetadata[notif.party_id]["host"] === userId
                  ? " wants to join your party "
                  : " invites you to join their party "}
                {notifMetadata[notif.party_id]["name"]}
              </>
            )}
            <div className="mt-3">
              <button className="btn mx-3" onClick={() => handleNotifAction(notif, "accept")}>
                Accept
              </button>
              <button className="btn mx-3" onClick={() => handleNotifAction(notif, "decline")}>
                Decline
              </button>
            </div>
          </Card>
        ))
      ) : (
        <p>No notifications!</p>
      )}
    </div>
  );
};

export default Notifications;
