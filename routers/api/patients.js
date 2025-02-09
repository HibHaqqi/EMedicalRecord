const express = require("express");
const patients = express.Router();
const PatientsController = require("../../controller/patients.controller")
const patientsController = new PatientsController();

patients.post('/v1/new',patientsController.newPatient);
patients.put('/v1/edit/:id',patientsController.editPatients);
patients.post('/v1/delete',patientsController.deletePatients);
module.exports = patients;