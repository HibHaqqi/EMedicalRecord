const PatiensService = require("../service/patiens.service")

const patiensService = new PatiensService()

class PatiensController {
async newPatiens(req,res) {
    try {
    const payload = req.body;
    const addPatiens = await patiensService.addPatiens(payload);
    res
    .status(201)
    .json({ message: "berhasil menambahkan Patiens", data: addPatiens });
} catch (error) {
        res.status(400).json({
        status: "failed",
        message: error.message,
        }); 
    }
}
async editPatiens(req,res){
    try {
      
        const payload = req.body
        const id = req.params.id
        const editPatiens = await patiensService.editPatiens(payload,id);
        res
          .status(201)
          .json({ message: "berhasil  edit patiens detail", data: editPatiens });
      } catch (error) {
        if (error.message === "Patiens Not found") {
          res.status(400).json({ message: "Patiens Not found" });
        } else {
          res.status(409).json({ message: error.message, stack: error });
        }
      }

}
async deletePatiens(req,res){

}
}



module.exports = PatiensController;