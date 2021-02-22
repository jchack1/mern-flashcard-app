const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require("mongoose-simple-random");

const BioSchema = new Schema({
  name: String,
  definition: String,
  additionalInfo1: String,
  additionalInfo2: String,
  additionalInfo3: String,
});

BioSchema.plugin(random);

const Bio = mongoose.model("Bio", BioSchema);

module.exports = Bio;
