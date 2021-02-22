const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require("mongoose-simple-random");

const PhysSchema = new Schema({
  name: String,
  definition: String,
});

PhysSchema.plugin(random);

const Phys = mongoose.model("Phys", PhysSchema);

module.exports = Phys;
