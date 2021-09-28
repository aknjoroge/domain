const express = require('express');
const route = express.Router();
const services=require('../services/render');

/**
 * @method <GET 
 * @description Home route
 */
route.get('/',services.homeRoute);


/**
 * @method <POST
 * @description Where the domain is verified for availabilty
 */
route.post('/verify',services.verifyDomain);


module.exports=route;