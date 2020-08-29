const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  title: { type: String, required: true },
  date_added: { type: Date, default: Date.now },
  description: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true }
});

const Links = mongoose.model("Links", linkSchema);

module.exports = Links;