const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//needed this line to properly parse json objects in req
app.use(bodyParser.json());

//cors
//front end and back end deployed to different urls
//needed to avoid cors error
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//requiring the routes
const aminoAcids = require("./routes/aminoAcids");
const functionalGroups = require("./routes/functionalGroups");
const physics = require("./routes/physics");
const biology = require("./routes/biology");
const webDev = require("./routes/webDev");

//setup of db
mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoose"));
db.once("open", function () {
  console.log("Connected to the database");
});

//routes
app.use("/aminoacids", aminoAcids);
app.use("/functionalgroups", functionalGroups);
app.use("/physics", physics);
app.use("/biology", biology);
app.use("/webdev", webDev);

//for heroku deployment
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("App started on post 5000");
});
