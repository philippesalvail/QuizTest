"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 5678;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(require("./routes"));
app.listen(PORT, function () {
  console.log("listening on PORT: ", PORT);
});
