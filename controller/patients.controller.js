const { render } = require("ejs");
const PatientService = require("../service/patients.service")

const patiensService = new PatientService()

class PatiensController {
async newPatient(req,res) {
    try {
    const admin_id = req.session.passport.user;
    const payload = req.body;
    const addPatient = await patiensService.addPatient(admin_id,payload);
    res.redirect('/patients')
    //res.status(201).json({ message: "berhasil menambahkan Patiens", data: addPatient });
} catch (error) {
        res.status(400).json({
        status: "failed",
        message: error.message,
        }); 
    }
}
async editPatients(req,res){
    try {
      
        const payload = req.body
        const id = req.params.id
        const editPatient = await patiensService.editPatient(payload,id);
        //res.status(201).json({ message: "berhasil  edit patiens detail", data: editPatient });
        res.redirect('/patients');
      } catch (error) {
        if (error.message === "Patient Not found") {
          res.status(400).json({ message: "Patients Not found" });
        } else {
          res.status(409).json({ message: error.message, stack: error });
        }
      }

}
async getPatientById(req, res) {
  try {
      const id = req.params.id;
      console.log('Patient ID:', id); // Add this line to log the ID
      const patientById = await patiensService.getPatientById(id);
      res.render("editPatient", { patient: patientById });
  } catch (error) {
      if (error.message === "Patient not found") {
          res.status(404).send(error.message);
      } else {
          res.status(500).send(error.message);
      }
  }
}
async deletePatients(req,res){
  try {
    
    const payload = req.params.id
    const deletePatient = await patiensService.deletePatient(payload);
    //res.status(201).json({ message: "record berhasil dihapus", data: deletePatient });
    res.redirect('/patients')
  } catch (error) {
    if (error.message === "Record not found") {
      res.status(400).json({ message: "Record not found" });
    } else {
      res.status(409).json({ message: error.message, stack: error });
    }
  }
}
async getRecordSelect(req,res){
  try {
    const userId = req.session.passport.user;
    const payload = req.query
    
      // Use let instead of const to allow reassignment
      let day = parseInt(req.query.day, 10);
      let month = parseInt(req.query.month, 10);
      let year = parseInt(req.query.year, 10);
  
      // If no query parameters are provided, default to today's date
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
          const today = new Date();
          day = today.getDate();
          month = today.getMonth() + 1; // Months are zero-based in JavaScript
          year = today.getFullYear();
      }
  
      // Create a Date object to validate the date
      const selectedDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
      if (selectedDate.getDate() !== day || selectedDate.getMonth() + 1 !== month || selectedDate.getFullYear() !== year) {
          console.error("Invalid date provided:", { day, month, year });
          return 0; // Return 0 for invalid date
      }
    const GetRecord = await patiensService.getRecordSelect(payload,userId,selectedDate)
    
        // Check if the request is for JSON or EJS rendering
        if (req.xhr || req.accepts('json')) {
          // If it's an AJAX request or expects JSON, send JSON response
          return res.status(200).json({ status: "success", data: GetRecord });
      } else {
          // Otherwise, render the EJS view
          return GetRecord
      }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      stack: error,
    });
  }
  }
  async getRecord(req,res){
    try {
      const userId = req.session.passport.user;
      const payload = req.query
      const GetRecord = await patiensService.getRecord(payload,userId)
      //res.status(200).json({ status: "success", data: GetRecord })
      return GetRecord
      //res.render("summpasiens", { record: GetRecord });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
    }
  async getRecordVisit(req,res){
    try {
      const payload = req.params.nik;
      const userId = req.session.passport.user;
      const GetRecord = await patiensService.getRecordVisit(payload,userId)
      //res.status(200).json({ status: "success", visitRecords: GetRecord })
      res.render("visitdetail", { visitRecords: GetRecord });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
    }

    async countTotalVisitDay(req) {
      const userId = req.session.passport.user;
  
      // Use let instead of const to allow reassignment
      let day = parseInt(req.query.day, 10);
      let month = parseInt(req.query.month, 10);
      let year = parseInt(req.query.year, 10);
  
      // If no query parameters are provided, default to today's date
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
          const today = new Date();
          day = today.getDate();
          month = today.getMonth() + 1; // Months are zero-based in JavaScript
          year = today.getFullYear();
      }
  
      // Create a Date object to validate the date
      const selectedDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
      if (selectedDate.getDate() !== day || selectedDate.getMonth() + 1 !== month || selectedDate.getFullYear() !== year) {
          console.error("Invalid date provided:", { day, month, year });
          return 0; // Return 0 for invalid date
      }
  
      try {
          console.log("Counting visits for:", { day, month, year, userId });
          const visitCount = await patiensService.countTotalVisitDay(userId, selectedDate);
          console.log("visitCount from service:", visitCount); // ✅ Debug log
          return visitCount ?? 0; // ✅ Return 0 instead of undefined
      } catch (error) {
          console.error("Error counting visits:", error);
          return 0; // ✅ Return 0 in case of an error
      }
  }
  
async countTotalVisitMonthly(req){
  const userId = req.session.passport.user;
    // Use let instead of const to allow reassignment
  
  let month = parseInt(req.query.month, 10);
  let year = parseInt(req.query.year, 10);

  // If no query parameters are provided, default to today's date
  if (isNaN(month) || isNaN(year)) {
      const today = new Date();
      month = today.getMonth() + 1; // Months are zero-based in JavaScript
      year = today.getFullYear();
  }

  try {
    const visitCountMTD = await patiensService.countTotalVisitMonthly(userId, month, year);
    console.log("visitCount from service MTD:", visitCountMTD); // ✅ Debug log
    return visitCountMTD ?? 0; // ✅ Return 0 instead of undefined
} catch (error) {
    console.error("Error counting visits:", error);
    return 0; // ✅ Return 0 in case of an error
}
}
}



module.exports = PatiensController;