const express = require("express");
const pages = express.Router();

pages.get("/", (req, res) => {
    res.render("home");
  });
  pages.get("/login", (req, res) => {
    res.render("login");
  });

  pages.get("/patients", (req, res) => {
    res.render("summpasiens");
  });

  module.exports = pages;