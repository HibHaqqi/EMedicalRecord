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
      const today = new Date(); // Get today's date
      const visitcount = await patientsController.countTotalVisitDay(req, res, today); // Pass today's date
      console.log("Count of visits today:", visitcount); // Debugging line
      res.render("summpasiens", { record, visitcount }); // Pass the record and visit count to the EJS view
  } catch (error) {
      console.error("Error in /patients route:", error);
      res.status(500).send("Internal Server Error");
  }
});

/*pages.get("/visit-records/",async(req,res)=>{
const nik = req.params.nik;
const patientsController = new PatientsController();
try {
  const visitRecords = await patientsController.getRecordVisit(nik); // Call the getRecord method
  res.render("visitdetail", { visitRecords }); // Pass the record to the EJS view        
} catch (error) {
  res.status(500).send("Error retrieving patient records");
}
});*/
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
  module.exports = pages;