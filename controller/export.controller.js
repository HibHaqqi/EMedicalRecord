const json2xls = require('json2xls');
const ExportService = require("../service/export.service");
const exportService = new ExportService();

class ExportController {
  async exportToExcel(req, res) {
    try {
      const userId = req.session.passport.user;
      let patients = await exportService.getAllPatients(userId);

      // Convert Sequelize objects to plain JSON
      patients = patients.map(patient => patient.toJSON());

      // Convert JSON to Excel format
      const xls = json2xls(patients);

      // Send the file as a buffer
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=patients.xlsx');
      res.end(Buffer.from(xls, 'binary'));
      
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      res.status(500).send('Error exporting data');
    }
  }
}

module.exports = ExportController;
