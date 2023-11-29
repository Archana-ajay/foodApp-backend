const { body } = require('express-validator');

const validateSignUp = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  

  body('email')
  .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Invalid email address'),

  body('password')
  .notEmpty().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),

  body('phoneNumber')
  .notEmpty().withMessage('phonenumber is required')
    .isMobilePhone().withMessage('Invalid mobile number'),
];
const validateLogin=[
    body('email')
    .notEmpty().withMessage('email is required')
      .isEmail().withMessage('Invalid email address'),
      body('password')
  .notEmpty().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),

]

module.exports = {
  validateSignUp,
  validateLogin
};
