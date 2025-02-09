const express = require("express");
const patients = express.Router();
const PatientsController = require("../../controller/patients.controller")
const patientsController = new PatientsController();

patients.post('/v1/new',patientsController.newPatient);
patients.put('/v1/edit/:id',patientsController.editPatients);
patients.delete('/v1/delete/:id',patientsController.deletePatients);
patients.get('/v1/record',patientsController.getRecord);
module.exports = patients;