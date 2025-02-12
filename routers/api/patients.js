const express = require("express");
const patients = express.Router();
const PatientsController = require("../../controller/patients.controller")
const patientsController = new PatientsController();

patients.post('/v1/new',patientsController.newPatient);
patients.post('/v1/edit/:id',patientsController.editPatients);
patients.get('/v1/getedit/:id',patientsController.getPatientById);
patients.delete('/v1/delete/:id',patientsController.deletePatients);
patients.get('/v1/record/:nik',patientsController.getRecordVisit);
module.exports = patients;