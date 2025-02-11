const express = require("express");
const pages = express.Router();
const PatientsController = require("../controller/patients.controller");
const LoginService = require("../service/login.service");



pages.get("/", (req, res) => {
    res.render("home");
  });
  pages.get("/login", (req, res) => {
    res.render("login");
  });
  pages.get("/register", (req, res) => {
    res.render("register");
  });

  pages.get("/patients", LoginService.isAuthenticated, async (req, res) => {
    
    const patientsController = new PatientsController();
    try {
        const record = await patientsController.getRecord(req, res); // Call the getRecord method
        res.render("summpasiens", { record }); // Pass the record to the EJS view
    } catch (error) {
        res.status(500).send("Error retrieving patient records");
    }
    pages.get("/logout", (req, res) => {
      req.logout((err) => {
        if (err) {
          // handle the error
          console.log(err);
          return res.status(500).json({ error: "Error logging out" });
        }
        
        res.redirect("/");
      });
    });
  
});

  module.exports = pages;