const bcrypt = require("bcrypt");
const {Admin} =require("../models")

class RegisService {
    async regisAdmin(payload){
        const { email, password, alamat,phone } = payload;
        try {
            if (!email || !password ||!alamat ||!phone) {
                throw new Error("Data tidak lengkap");
              }
        
              const admin = await Admin.findOne({ where: { email } });
              if (admin) {
                throw new Error("Email sudah terdaftar");
              }
        
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
        
              const newAdmin = await Admin.create({
                email,
                password :hashedPassword, 
                phone,
                alamat,
                
              });
              return newAdmin;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = RegisService;