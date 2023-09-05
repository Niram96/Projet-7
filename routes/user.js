const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const signUpAndLoginValidation = require('../middlewares/joi').signUpAndLoginValidation;

router.post('/signup', signUpAndLoginValidation, userCtrl.signup);
router.post('/login', signUpAndLoginValidation, userCtrl.login);

module.exports = router;