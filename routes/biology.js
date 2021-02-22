const express = require("express");
const router = express.Router();

//getting group model, needed to make queries
const Bio = require("../models/bio");

//get random bio definition/question
router.get("/random", (req, res) => {
  Bio.findOneRandom(function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//used for testing route
router.get("/", (req, res) => {
  Bio.find({ name: req.body.name }).then((bio) => res.json(bio));
});

//for posting amino acid data to db
router.post("/", (req, res) => {
  const newBio = new Bio({
    name: req.body.name,
    definition: req.body.definition,
    additionalInfo1: req.body.additionalInfo1,
    additionalInfo2: req.body.additionalInfo2,
    additionalInfo3: req.body.additionalInfo3,
  });
  newBio.save().then((item) => res.json(item));
});

module.exports = router;
