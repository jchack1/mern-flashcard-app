const express = require("express");
const router = express.Router();

//getting group model, needed to make queries
const Phys = require("../models/phys");

//get random definition
router.get("/random", (req, res) => {
  Phys.findOneRandom(function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//used for testing route
router.get("/", (req, res) => {
  Phys.find({ name: req.body.name }).then((phys) => res.json(phys));
});

//for posting amino acid data to db
router.post("/", (req, res) => {
  const newPhys = new Phys({
    name: req.body.name,
    definition: req.body.definition,
  });
  newPhys.save().then((item) => res.json(item));
});

module.exports = router;
