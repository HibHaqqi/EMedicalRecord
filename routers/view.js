const express = require("express");
const pages = express.Router();
const PatientsController = require("../controller/patients.controller");



pages.get("/", (req, res) => {
    res.render("home");
  });
  pages.get("/login", (req, res) => {
    res.render("login");
  });

  pages.get("/patients", async (req, res) => {
    const patientsController = new PatientsController();
    try {
        const record = await patientsController.getRecord(req, res); // Call the getRecord method
        res.render("summpasiens", { record }); // Pass the record to the EJS view
    } catch (error) {
        res.status(500).send("Error retrieving patient records");
    }
});

  module.exports = pages;