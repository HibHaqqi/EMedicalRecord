const express = require("express");
const api = express.Router();
const users = require("./users");
const patiens = require("./patiens");

api.use('/users', users)
api.use('/patiens',patiens)

module.exports=api;