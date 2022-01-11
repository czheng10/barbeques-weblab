import React, { useState, useEffect } from "react";

import { get } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, []);

  if (!props.userId) {
    return <div>Please log in first.</div>;
  }
  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div>{user.name}</div>
    </>
  );
};

export default Profile;
