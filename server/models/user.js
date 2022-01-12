const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  allergies: [String],
  email: String,
  total_parties: Number,
  parties: {
      party_id: Number,
      status: Number
  },
  achievements: [Number]
});

// compile model from schema
module.exports = mongoose.model("users", UserSchema);
