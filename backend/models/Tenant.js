const mongoose = require("mongoose");

module.exports = mongoose.model("Tenant", new mongoose.Schema({
  name: String
}));