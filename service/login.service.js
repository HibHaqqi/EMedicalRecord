const bcrypt = require("bcrypt");
const { Admin } = require("../models");

class LoginService {
  async adminLogin(payload) {
    const { email, password } = payload;
    try {
      if (!email || !password) {
        throw new Error("data tidak lengkap");
      }
      const user = await Admin.findOne({ where: { email } });
      if (!user) {
        throw new Error("email tidak terdaftar");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("password tidak sesuai");
      } else if (isMatch) {
        return user;
      }
    } catch (error) {
        throw error;
    }
  }
}

module.exports = LoginService;
