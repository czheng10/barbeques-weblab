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

router.get("/partyinfo", (req, res) => {
  Party.findById(req.query.partyid).then((party) => {
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

router.get("/users", auth.ensureLoggedIn, (req, res) => {
  ids = [];
  allUsers = [];
  Party.findById(req.query.partyid).then((parties) => {
    ids = parties.members;
    allUsers = ids.filter((id) => JSON.stringify(id) !== JSON.stringify(req.query.userid)).map((id) => User.findById(id));
    Promise.all(allUsers).then((allResult) => res.send(allResult));
  });
});

router.post("/changeparty", auth.ensureLoggedIn, (req, res) => {
  Party.findById(req.body.oldId).then((party) => {
    party.name = req.body.newName;
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

router.post(`/newPfp`, auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.pfp = req.body.newPfp;
    results.save().then((person) => res.send(person));
  });
});

router.post("/updatedbio", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.bio = req.body.newBio;
    results.save().then((b) => res.send(JSON.stringify(b.bio)));
  });
});

router.post("/updateAllergies", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userId).then((user) => {
    user.allergies = Array.from(new Set(req.body.allergies.filter((allergy) => allergy !== "")));
    user.save().then((newUser) => res.send(newUser.allergies));
  });
});

router.get("/allergy", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.query.userid).then((results) => {
    res.send(results.allergies);
  });
});

router.get("/pictures", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.query.userid).then((results) => {
    res.send(results.pictures);
  });
});

router.post(`/addPics`, auth.ensureLoggedIn, (req, res) => {
  const picCard = {
    src: req.body.newPic,
    title: req.body.picTitle,
    caption: req.body.picCap,
  };
  User.findById(req.body.userid).then((results) => {
    results.pictures = results.pictures.concat(picCard);
    results.save().then((person) => res.send(person));
  });
});

router.post(`/removePics`, auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    results.pictures.splice(req.body.index, 1);
    results.save().then((person) => res.send(person));
  });
});

router.post("/newparty", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userid).then((results) => {
    const newParty = new Party({
      name: req.body.name,
      host: results._id,
      members: [],
      status: 1,
    });
    newParty.save().then((party) => res.send(JSON.stringify(party._id)));
  });
});

router.post("/addparty", auth.ensureLoggedIn, (req, res) => {
  Party.findById(req.body.partyid).then((party) =>
    User.findById(req.body.userid).then((results) => {
      const newParty = { party_id: party._id, feedback: 0 };
      results.parties.push(newParty);
      results.total_parties = results.total_parties + 1;
      results.save().then((person) => res.send(person));
    })
  );
});

//need to fix because database changed
router.get("/active-parties", auth.ensureLoggedIn, async (req, res) => {
  const user = await User.findById(req.query.userId);
  const partyIds = user.parties
    .filter((party) => party.feedback === 0)
    .map((party) => party.party_id);
  Party.find({ _id: { $in: partyIds } }).then((results) => {
    if (results) {
      res.send(results.filter((result) => result.host.toString() === req.query.userId));
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
    user.save().then((result) => {
      socketManager.getSocketFromUserID(req.body.to).emit("newNotif", result.notifs);
    });
  });
});

router.get("/active-notifs", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user.notifs);
  });
});

router.post("/update-notif", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.notifTo).then((user) => {
    user.notifs = user.notifs.filter((notif) => notif._id.toString() !== req.body.notifId);
    user.save().then((updated) => {
      if (req.body.action === "accept") {
        Party.findById(req.body.notifParty).then((party) => {
          const members = new Set(party.members);
          members.add(req.body.toHost ? req.body.notifFrom : req.body.notifTo);
          party.members = Array.from(members);
          party.save().then(() => {
            User.findById(req.body.toHost ? req.body.notifFrom : req.body.notifTo).then(
              (new_user) => {
                new_user.total_parties += 1;
                new_user.parties.push({ party_id: req.body.notifParty, status: 1 });
                new_user.save().then((result) => res.send(updated.notifs));
              }
            );
          });
        });
      } else {
        res.send(updated.notifs);
      }
    });
  });
});

router.get("/partyMembers", auth.ensureLoggedIn, (req, res) => {
  Party.findById(req.query.partyId).then((party) => {
    User.findById(party.host).then((host) => {
      User.find({ _id: { $in: party.members } }).then((members) => {
        res.send({ host: host, members: members });
      });
    });
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
