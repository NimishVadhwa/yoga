const express = require('express');
const route = express.Router();
const auth = require('./controllers/AuthController');


//auth 
route.get('/auth/login',auth.login);
route.get('/auth/register', auth.register);


module.exports = route;
 