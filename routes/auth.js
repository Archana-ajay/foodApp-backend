const express = require('express');
const router = express.Router();

const { validateSignUp,validateLogin } = require('../validators/authValidator');
const { signUp, login } = require('../controllers/auth');

router.post('/signup',validateSignUp, signUp);
router.post('/login',validateLogin,  login);

module.exports = router;