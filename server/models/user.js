const mongoose = require("mongoose");
const { Schema } = mongoose;

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
<<<<<<< HEAD
      party_id: Schema.Types.ObjectId,
=======
      party_id: mongoose.Schema.Types.ObjectId,
>>>>>>> 4f99b882dc93ca26ea768293453dda102073a615
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
