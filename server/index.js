const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("../db");

const DIST_DIR = path.join(__dirname, "../dist");

const app = express();
const port = process.env.PORT || 2710;

//bodyparsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//logger
app.use(morgan("tiny"));

app.use(express.static(DIST_DIR));

//use modular routes
app.use("/api", require("../routes/api"));
app.use("/", require("../routes/index"));

//sync database then start server
db.sync()
  .then(() => {
    console.log("Connected to database...");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error); //error catcher