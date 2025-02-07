const LoginService = require("../service/login.service");
const RegisService = require("../service/register.service");

const regisService = new RegisService();
const loginService = new LoginService();
class LoginRegisController {
  async regisAdmin(req, res) {
    try {
      const payload = req.body;
      const newAdmin = await regisService.regisAdmin(payload);
      res
        .status(201)
        .json({ message: "User berhasil dibuat", data: newAdmin });
    } catch (error) {
      if (error.message === "Data tidak lengkap") {
        res.status(400).json({ message: "Data tidak lengkap" });
      } else if (error.message === "Email sudah terdaftar") {
        res.status(409).json({ message: "Email sudah terdaftar" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
  async loginCheck(req,res) {
    try {
        const payload = req.body;
        const response = await loginService.adminLogin(payload);
        res.redirect('/patien');

        
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
  }
}

module.exports = LoginRegisController;
