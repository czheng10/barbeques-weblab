const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    name: String,
    host: Number,
    members: [Number],
    
  });
  module.exports = mongoose.model("parties", PartySchema);