const express = require("express");
const pages = express.Router();

pages.get("/", (req, res) => {
    res.render("login");
  });
pages.get("/patien", (req, res) => {
    res.render("summpasiens");
  });

  module.exports = pages;