const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    name: String,
    host: mongoose.Schema.Types.ObjectId,
    members: [mongoose.Schema.Types.ObjectId],
  });
  module.exports = mongoose.model("parties", PartySchema);