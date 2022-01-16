const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // user info:
  name: String,
  googleid: String,
  bio: String,
  pictures: [String],
  allergies: [String],
  email: String,
  // party related:
  total_parties: Number,
  parties: [
    {
      party_id: mongoose.Schema.Types.ObjectId,
      status: Number,
    },
  ],
  notifs: [
    {
      party_id: mongoose.Schema.Types.ObjectId,
    },
  ],
  achievements: [Number],
});

// compile model from schema
module.exports = mongoose.model("users", UserSchema);
