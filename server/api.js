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

router.get("/party", (req, res) => {
  Party.findById(req.query.partyId).then((party) => {
    res.send(party);
  });
});

router.get("/parties", auth.ensureLoggedIn, (req, res) => {
  ids = [];
  allParty = [];
  User.findById(req.query.userid).then((user) => {
    ids = user.parties.map((party) => party.party_id);
    allParty = ids.map((id) => Party.findById(id));
    Promise.all(allParty).then((allResult) => res.send(allResult));
  });
});

router.get("/partyNames", auth.ensureLoggedIn, (req, res) => {
  Party.findById(req.query.partyid).then((party) => {
    res.send(party);
  });
});

router.post("/changeparty", auth.ensureLoggedIn, (req, res) => {
  Party.findById(req.body.oldId).then((party) => {
    party.name = req.body.newName;
    console.log(party.name);
    party.save().then((person) => res.send(person));
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

router.post(`/api/newPfp`, auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.pfp = req.body.newPfp;
    console.log(results.pfp);
    results.save().then((person) => res.send(person));
  });
});
router.post("/updatedbio", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.bio = req.body.newBio;
    results.save().then((b) => res.send(b));
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
  Party.findById(req.body.partyid).then((party) =>
    User.findById(req.body.userid).then((results) => {
      const newParty = { party_id: party._id, status: 1 };
      results.parties.push(newParty);
      results.total_parties = results.total_parties + 1;
      results.save().then((person) => res.send(person));
    })
  );
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

router.post("/invite", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.to).then((user) => {
    user.notifs.push({
      party_id: mongoose.Types.ObjectId(req.body.partyId),
      from: mongoose.Types.ObjectId(req.body.from),
    });
    user.save();
  });
});

router.get("/active-notifs", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user.notifs);
  });
});

router.post("/update-notif", auth.ensureLoggedIn, (req, res) => {
  if (req.body.action === "accept") {
    User.findById(req.body.toHost ? req.body.notifFrom : req.body.notifTo).then((user) => {
      user.total_parties += 1;
      user.parties.push({ party_id: req.body.notifParty, status: 1 });
      user.save();
    });
    Party.findById(req.body.notifParty).then((party) => {
      const members = new Set(party.members);
      members.add(req.body.toHost ? req.body.notifFrom : req.body.notifTo);
      party.members = Array.from(members);
      party.save();
    });
  }
  User.findById(req.body.notifTo).then((user) => {
    user.notifs = user.notifs.filter((notif) => notif._id.toString() !== req.body.notifId);
    user.save().then((updated) => {
      res.send(updated.notifs);
    });
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
