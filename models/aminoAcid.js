const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require("mongoose-simple-random");

const AminoAcidSchema = new Schema({
  name: String,
  code: String,
  symbol: String,
  group: String,
});

AminoAcidSchema.plugin(random);

const AminoAcid = mongoose.model("AminoAcid", AminoAcidSchema);

module.exports = AminoAcid;
