const express = require("express");
const patiens = express.Router();
const PatiensController = require("../../controller/patiens.controller")
const patiensController = new PatiensController();

patiens.post('/v1/new',patiensController.newPatiens);


module.exports = patiens;