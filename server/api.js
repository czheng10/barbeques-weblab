/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const mongoose = require("mongoose");
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
const user = require("./models/user");

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

router.get("/search", auth.ensureLoggedIn, async (req, res) => {
  const phrase = req.query.phrase;
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

router.post("/newallergy", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.allergies = req.body.new_allergies;
    results.save().then((person) => res.send(person));
  });
});

router.get("/allergy", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.query.userid).then((results) => {
    res.send(results.allergies);
  });
});

router.post("/newparty", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    const newParty = new Party({
      name: req.body.name,
      host: results._id,
      members: [results._id],
    });
    newParty.save().then((party) => res.send(JSON.stringify(party._id)));
  });
});

router.post("/addparty", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    const newParty = { party_id: req.body.partyId, status: 1 };
    results.parties.push(newParty);
    results.total_parties = results.total_parties + 1;
    results.save().then((person) => res.send(person));
  });
});

router.get("/active-parties", auth.ensureLoggedIn, async (req, res) => {
  const user = await User.findById(req.query.userId);
  const partyIds = user.parties
    .filter((party) => party.status === 1)
    .map((party) => party.party_id);
  Party.find({ _id: { $in: partyIds } }).then((results) => {
    if (results) {
      res.send(results);
    } else {
      res.send([]);
    }
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
