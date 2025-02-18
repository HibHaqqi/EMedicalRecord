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


      // Get the date from query parameters
      const dateParam = req.query.date ? new Date(req.query.date) : new Date();
      // Get patient records
      const record = await patientsController.getRecord(req, res);
      //console.log("Record from getRecord():", record); // Debugging line
      const visitCount = await patientsController.countTotalVisitDay(req, dateParam);
      const visitCountMTD = await patientsController.countTotalVisitMonthly(req, dateParam);
      
      // Render the EJS template with the data
      res.render("summpasiens", {
          record,
          visitCount: visitCount || 0, // Default to 0 if undefined
          visitCountMTD: visitCountMTD || 0 // Default to 0 if undefined
      });
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