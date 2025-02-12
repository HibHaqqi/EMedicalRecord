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
        res.render("editPatient", { patient: editPatient });
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
    res
      .status(201)
      .json({ message: "record berhasil dihapus", data: deletePatient });
  } catch (error) {
    if (error.message === "Record not found") {
      res.status(400).json({ message: "Record not found" });
    } else {
      res.status(409).json({ message: error.message, stack: error });
    }
  }
}
async getRecord(req,res){
  try {
    const payload = req.query
    const GetRecord = await patiensService.getRecord(payload)
    //res.status(200).json({ status: "success", data: GetRecord })
    res.render("summpasiens", { record: GetRecord });
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
      const GetRecord = await patiensService.getRecordVisit(payload)
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
}



module.exports = PatiensController;