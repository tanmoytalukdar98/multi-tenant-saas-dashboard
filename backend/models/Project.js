const mongoose = require("mongoose");

module.exports = mongoose.model("Project", new mongoose.Schema({
  name: String,
  tenantId: mongoose.Schema.Types.ObjectId
}));