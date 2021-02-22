const express = require("express");
const router = express.Router();

//getting group model, needed to make queries
const FunctionalGroup = require("../models/functionalGroup");

//get random functionalgroup
router.get("/random", (req, res) => {
  FunctionalGroup.findOneRandom(function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//used for testing route
router.get("/", (req, res) => {
  FunctionalGroup.find({ name: req.body.name }).then((functionalGroup) =>
    res.json(functionalGroup)
  );
});

//for posting functional group data to db
router.post("/", (req, res) => {
  const newFG = new FunctionalGroup({
    name: req.body.name,
    use: req.body.use,
    example: req.body.example,
    additionalInfo: req.body.additionalInfo,
  });
  newFG.save().then((item) => res.json(item));
});

module.exports = router;
