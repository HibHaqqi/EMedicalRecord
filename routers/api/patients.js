const express = require("express");
const patients = express.Router();
const PatientsController = require("../../controller/patients.controller")
const patientsController = new PatientsController();
const LoginService = require("../../service/login.service");

patients.post('/v1/new',patientsController.newPatient);
patients.post('/v1/edit/:id', LoginService.isAuthenticated,patientsController.editPatients);
patients.get('/v1/getedit/:id', LoginService.isAuthenticated,patientsController.getPatientById);
patients.delete('/v1/delete/:id', LoginService.isAuthenticated,patientsController.deletePatients);
patients.get('/v1/record/:nik', LoginService.isAuthenticated,patientsController.getRecordVisit);
patients.get('/v1/record',patientsController.getRecord);
module.exports = patients;