/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const Party = require("./models/party");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/search/:searchPhrase?", async (req, res) => {
  const phrase = req.params["searchPhrase"] ? req.params["searchPhrase"] : "";
  const findNamePromise = User.find({ name: { $regex: phrase, $options: "i" } });
  const findBioPromise = User.find({ bio: { $regex: phrase, $options: "i" } });
  const allPromises = [findNamePromise, findBioPromise];
  Promise.all(allPromises).then((allResults) => {
    const results = [];
    const seen = new Set();
    for (const user of allResults.flat()) {
      if (!seen.has(user.id)) {
        results.push(user);
        seen.add(user.id);
      }
    }
    res.send(results);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
