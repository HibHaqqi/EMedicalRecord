const PatientService = require("../service/patients.service")

const patiensService = new PatientService()

class PatiensController {
async newPatient(req,res) {
    try {
    const payload = req.body;
    const addPatient = await patiensService.addPatient(payload);
    res
    .status(201)
    .json({ message: "berhasil menambahkan Patiens", data: addPatient });
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
        res
          .status(201)
          .json({ message: "berhasil  edit patiens detail", data: editPatient });
      } catch (error) {
        if (error.message === "Patient Not found") {
          res.status(400).json({ message: "Patients Not found" });
        } else {
          res.status(409).json({ message: error.message, stack: error });
        }
      }

}
async deletePatients(req,res){

}
}



module.exports = PatiensController;