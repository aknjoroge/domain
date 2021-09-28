const express = require("express");
const route = express.Router();
const services = require("../services/render");

route.post("/verify", services.verifyDomain);

module.exports = route;


