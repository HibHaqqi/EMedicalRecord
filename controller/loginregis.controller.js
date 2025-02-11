const LoginService = require("../service/login.service");
const RegisService = require("../service/register.service");
const passport = require('passport');

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
  async loginCheck(req,res,next) {
    passport.authenticate('local', (err, admin, info) => {
      if (err) {
          return next(err); // Handle error
      }
      if (!admin) {
          // If authentication fails, redirect to home with an error message
          return res.redirect('/'); // You can also pass an error message here
      }
      req.logIn(admin, (err) => {
          if (err) {
              return next(err); // Handle error
          }
          // Successful authentication, redirect to /patients
          return res.redirect('/patients');
      });
  })(req, res, next);
    }
  }


module.exports = LoginRegisController;
