// create another router for getting 'users' resources 
var router = require('express').Router();
const validator = require("../middelware/validator")
const Auth = require("../middelware/auth")
const userService = require("../services/user.service")

// individual user routes
router.post('/register', validator.validateRequest(validator.UserRegisterSchema), userService.createUser);

router.post('/login', userService.login);

router.get('/patientHealthInfo', Auth.isAuth, userService.getPatientHealthInfo);

module.exports = router;