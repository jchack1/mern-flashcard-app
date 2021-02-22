const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require("mongoose-simple-random");

const FunctionalGroupSchema = new Schema({
  name: String,
  use: String,
  example: String,
});

FunctionalGroupSchema.plugin(random);

const FunctionalGroup = mongoose.model(
  "FunctionalGroup",
  FunctionalGroupSchema
);

module.exports = FunctionalGroup;
