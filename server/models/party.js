const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartySchema = new mongoose.Schema({
  name: String,
  host: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
  status: Number,
});
module.exports = mongoose.model("parties", PartySchema);
