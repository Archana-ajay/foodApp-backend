const express = require("express");
const router = express.Router();

const {
    postAddress,
    getAddress,
    updateAddress,
} = require("../controllers/address");
const {
    addressValidation,
    addressUpdateValidation,
} = require("../validators/authValidator");

router.post("/address", addressValidation, postAddress);
router.get("/address", getAddress);
router.patch("/address/:id", addressUpdateValidation, updateAddress);

module.exports = router;
