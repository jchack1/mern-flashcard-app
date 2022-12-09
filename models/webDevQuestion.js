const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require("mongoose-simple-random");

const WebDevQuestionSchema = new Schema({
  question: String,
  answer: String,
});

WebDevQuestionSchema.plugin(random);

const WebDevQuestion = mongoose.model(
  "WebDev",
  WebDevQuestionSchema,
  "webdevquestions"
);

module.exports = WebDevQuestion;
