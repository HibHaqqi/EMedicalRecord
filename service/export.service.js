const  {Patient} = require('../models')

class ExportService {
  async getAllPatients(userId) {
    return await Patient.findAll({
      where: { admin_id: userId }
    });
  }
}

module.exports = ExportService;
