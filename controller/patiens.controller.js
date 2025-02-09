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
    
}



module.exports = PatiensController;