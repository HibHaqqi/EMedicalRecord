const express = require("express");
const patients = express.Router();
const PatientsController = require("../../controller/patients.controller")
const patientsController = new PatientsController();
const LoginService = require("../../service/login.service");
const ExportController = require("../../controller/export.controller");
const exportController = new ExportController;

patients.post('/v1/new',patientsController.newPatient);
patients.post('/v1/edit/:id', LoginService.isAuthenticated,patientsController.editPatients);
patients.get('/v1/getedit/:id', LoginService.isAuthenticated,patientsController.getPatientById);
patients.post('/v1/delete/:id', LoginService.isAuthenticated,patientsController.deletePatients);
patients.get('/v1/record/:nik', LoginService.isAuthenticated,patientsController.getRecordVisit);
patients.get('/v1/record',patientsController.getRecordSelect);
patients.get('/v1/export',LoginService.isAuthenticated,exportController.exportToExcel);
module.exports = patients;