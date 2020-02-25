const express = require('express');
const router = express.Router();
const controller = require('../controller/auth_controller');
const { registerValidation, loginValidation } = require('../validation/auth_validation');

router.route('/register').post(registerValidation(), controller.register);
router.route('/authorize').post(loginValidation(), controller.login);

module.exports = router;