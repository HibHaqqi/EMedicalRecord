const LoginService = require("../service/login.service");
const RegisService = require("../service/register.service");

const regisService = new RegisService();
const loginService = new LoginService();
class LoginRegisController {
  async regisAdmin(req, res) {
    try {
      const payload = req.body;
      const newAdmin = await regisService.regisAdmin(payload);
      res.redirect('/patients');
      /*res
        .status(201)
        .json({ message: "User berhasil dibuat", data: newAdmin });*/
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
        res.redirect('/patients');

        
    } catch (error) {
      if (error.message === "email atau password tidak sesuai") {
        res.redirect('/');
        //res.status(400).json({ message: "email atau password tidak sesuai" });
      } else if (error.message === "email tidak terdaftar") {
        res.redirect('/');
        //res.status(409).json({ message: "email tidak terdaftar" });
      } else {
        res.redirect('/');
        //res.status(500).json({ message: error.message });
      }
    }
  }
}

module.exports = LoginRegisController;
