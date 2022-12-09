const express = require("express");
const router = express.Router();

//getting group model, needed to make queries
const WebDevQuestion = require("../models/webDevQuestion");

//get random bio definition/question
router.get("/random", (req, res) => {
  WebDevQuestion.findOneRandom(function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//used for testing route
router.get("/", (req, res) => {
  WebDevQuestion.find({name: req.body.name}).then((bio) => res.json(bio));
});

module.exports = router;
