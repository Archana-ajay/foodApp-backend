const { body } = require("express-validator");

const validateSignUp = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters long"),

    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-zA-Z]/)
        .withMessage("Password must contain at least one letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number"),

    body("phoneNumber")
        .notEmpty()
        .withMessage("phonenumber is required")
        .isMobilePhone()
        .withMessage("Invalid mobile number"),
];
const validateLogin = [
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-zA-Z]/)
        .withMessage("Password must contain at least one letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number"),
];

const validateCart = [
    body("restaurantID")
        .notEmpty()
        .withMessage("restaurant ID is required")
        .isUUID()
        .withMessage("id must be uuid"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt()
        .withMessage("Quantity must be a valid integer"),
];

const addressValidation = [
    body("address")
        .notEmpty()
        .withMessage("address is required")
        .isLength({ min: 3 })
        .withMessage("address must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("address must be at most 25 characters long"),

    body("city")
        .notEmpty()
        .withMessage("city is required")
        .isLength({ min: 3 })
        .withMessage("city must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("city must be at most 25 characters long"),

    body("state")
        .notEmpty()
        .withMessage("state is required")
        .isLength({ min: 3 })
        .withMessage("state must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("state must be at most 25 characters long"),

    body("postalCode")
        .notEmpty()
        .withMessage("postalCode is required")
        .withMessage("country is required")
        .isLength({ min: 3 })
        .withMessage("country must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("country must be at most 25 characters long"),
];

const addressUpdateValidation = [
    body("address")
        .optional()
        .isLength({ min: 3 })
        .withMessage("address must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("address must be at most 25 characters long"),

    body("city")
        .optional()
        .isLength({ min: 3 })
        .withMessage("city must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("city must be at most 25 characters long"),

    body("state")
        .optional()
        .isLength({ min: 3 })
        .withMessage("state must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("state must be at most 25 characters long"),

    body("postalCode").optional(),

    body("country")
        .optional()
        .isLength({ min: 3 })
        .withMessage("country must be at least 3 characters long")
        .isLength({ max: 25 })
        .withMessage("country must be at most 25 characters long"),
];

module.exports = {
    validateSignUp,
    validateLogin,
    validateCart,
    addressValidation,
    addressUpdateValidation,
};
