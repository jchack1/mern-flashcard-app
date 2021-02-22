const express = require("express");
const router = express.Router();

//getting group model, needed to make queries
const AminoAcid = require("../models/aminoAcid");

//get random amino acid
router.get("/random", (req, res) => {
  AminoAcid.findOneRandom(function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//used for testing route
router.get("/", (req, res) => {
  AminoAcid.find({ name: req.body.name }).then((aminoAcid) =>
    res.json(aminoAcid)
  );
});

//for posting amino acid data to db
router.post("/", (req, res) => {
  const newAA = new AminoAcid({
    name: req.body.name,
    code: req.body.code,
    symbol: req.body.symbol,
    group: req.body.group,
  });
  newAA.save().then((item) => res.json(item));
});

module.exports = router;
