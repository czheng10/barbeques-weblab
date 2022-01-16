const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  allergies: [String],
  email: String,
  total_parties: Number,
  parties: [
    {
      party_id: Schema.Types.ObjectId,
      status: Number,
    },
  ],
  achievements: [Number],
  bio: String,
  pictures: [String],
});

// compile model from schema
module.exports = mongoose.model("users", UserSchema);
