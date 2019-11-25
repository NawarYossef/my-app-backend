const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");

const app = express();


app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World"}));
 });

 app.listen(process.env.PORT || 5000, function () {
  console.log(`Example app listening on port !${process.env.PORT || 5000}`);
 });