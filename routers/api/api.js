const express = require("express");
const api = express.Router();
const users = require("./users");
const patients = require("./patients");

api.use('/users', users)
api.use('/patients',patients)

module.exports=api;