const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  // user info:
  name: String,
  googleid: String,
  pfp: String,
  bio: String,
  pictures: [
    {
    src: String,
    title: String,
    caption: String,
    },],
  allergies: [String],
  email: String,
  // party related:
  total_parties: Number,
  parties: [
    {
      party_id: Schema.Types.ObjectId,
      feedback: Number,
    },
  ],
  notifs: [
    {
      party_id: Schema.Types.ObjectId,
      from: Schema.Types.ObjectId,
    },
  ],
  achievements: [Number],
});

// compile model from schema
module.exports = mongoose.model("users", UserSchema);
