const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartySchema = new mongoose.Schema({
  name: String,
  host: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});
module.exports = mongoose.model("parties", PartySchema);
