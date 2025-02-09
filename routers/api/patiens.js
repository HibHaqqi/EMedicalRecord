const express = require("express");
const patiens = express.Router();
const PatiensController = require("../../controller/patiens.controller")
const patiensController = new PatiensController();

patiens.post('/v1/new',patiensController.newPatiens);
patiens.put('/v1/edit/:id',patiensController.editPatiens);
patiens.post('/v1/delete',patiensController.deletePatiens);
module.exports = patiens;